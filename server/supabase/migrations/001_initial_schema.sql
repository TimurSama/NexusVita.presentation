-- EthosLife Supabase Schema
-- Initial migration: Users, Profiles, Auth

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS AND AUTHENTICATION
-- ============================================

-- Main users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    username VARCHAR(50) UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    
    -- Roles: user, specialist, center_admin, admin
    role VARCHAR(50) DEFAULT 'user',
    
    -- Subscription tier: free, basic, premium
    subscription_tier VARCHAR(50) DEFAULT 'free',
    subscription_status VARCHAR(50) DEFAULT 'inactive',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Social
    is_profile_public BOOLEAN DEFAULT true,
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    -- Referral
    referral_code VARCHAR(20) UNIQUE,
    referred_by UUID REFERENCES public.profiles(id)
);

-- User settings
CREATE TABLE public.user_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Notifications
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    
    -- Privacy
    share_data_with_specialists BOOLEAN DEFAULT true,
    share_data_for_research BOOLEAN DEFAULT false,
    allow_friend_requests BOOLEAN DEFAULT true,
    
    -- App preferences
    language VARCHAR(10) DEFAULT 'ru',
    timezone VARCHAR(50) DEFAULT 'Europe/Moscow',
    theme VARCHAR(20) DEFAULT 'light',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User wallets (fiat + crypto + Unity token)
CREATE TABLE public.user_wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Fiat balance (in cents to avoid floating point)
    fiat_balance INTEGER DEFAULT 0,
    fiat_currency VARCHAR(3) DEFAULT 'USD',
    
    -- Unity token balance (with 2 decimal places)
    unity_balance DECIMAL(15, 2) DEFAULT 0,
    unity_staked DECIMAL(15, 2) DEFAULT 0,
    
    -- Crypto addresses
    usdt_trc20_address VARCHAR(100),
    usdc_erc20_address VARCHAR(100),
    btc_address VARCHAR(100),
    eth_address VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions for custom JWT
CREATE TABLE public.user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    device_info JSONB,
    ip_address INET,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SOCIAL FEATURES
-- ============================================

-- Follows
CREATE TABLE public.follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(follower_id, following_id)
);

-- Posts (social feed)
CREATE TABLE public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    content TEXT,
    media_urls TEXT[], -- Array of image/video URLs
    
    -- Post type: text, achievement, progress, metric, workout, meal
    post_type VARCHAR(50) DEFAULT 'text',
    
    -- Linked data (if post shows dashboard data)
    linked_data JSONB,
    
    -- Stats
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    
    -- Visibility: public, followers, private
    visibility VARCHAR(20) DEFAULT 'public',
    
    is_pinned BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post likes
CREATE TABLE public.post_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(post_id, user_id)
);

-- Post comments
CREATE TABLE public.post_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements
CREATE TABLE public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    achievement_type VARCHAR(100) NOT NULL, -- e.g., 'streak_7', 'steps_100k', 'weight_goal'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon_url TEXT,
    badge_color VARCHAR(20),
    
    -- Progress
    progress_current INTEGER DEFAULT 1,
    progress_target INTEGER DEFAULT 1,
    
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    reward_unity_tokens DECIMAL(15, 2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SUBSCRIPTIONS AND PAYMENTS
-- ============================================

-- Subscription plans
CREATE TABLE public.subscription_plans (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Pricing
    price_monthly INTEGER, -- in cents
    price_yearly INTEGER, -- in cents
    unity_price_monthly DECIMAL(15, 2),
    unity_price_yearly DECIMAL(15, 2),
    
    -- Plan type: user, specialist, center_basic, center_premium, center_corporate
    plan_type VARCHAR(50) NOT NULL,
    
    -- Features (JSON for flexibility)
    features JSONB,
    
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert subscription plans
INSERT INTO public.subscription_plans (id, name, description, price_monthly, price_yearly, unity_price_monthly, unity_price_yearly, plan_type, features, sort_order) VALUES
-- User plans
('user_free', 'Free', 'Базовый функционал', 0, 0, 0, 0, 'user', '{"modules": 3, "ai_messages": 5, "habits": 3, "wearables": 0, "ads": true, "export": false}', 1),
('user_basic', 'Basic', 'Все модули здоровья', 2000, 20000, 170, 1700, 'user', '{"modules": 7, "ai_messages": 50, "habits": 10, "wearables": 2, "ads": false, "export": true, "unity_cashback": 50}', 2),
('user_premium', 'Premium', 'Максимум возможностей', 5000, 50000, 425, 4250, 'user', '{"modules": 7, "ai_messages": -1, "habits": -1, "wearables": -1, "ads": false, "export": true, "unity_cashback": 150, "specialists": true, "priority_support": true}', 3),

-- Specialist plans
('specialist_starter', 'Starter', 'Начните принимать клиентов', 0, 0, 0, 0, 'specialist', '{"max_connections": 5, "commission_percent": 15, "analytics": "basic", "widget": false, "priority_search": false}', 1),
('specialist_pro', 'Professional', 'Максимум клиентов', 3000, 30000, 255, 2550, 'specialist', '{"max_connections": -1, "commission_percent": 5, "analytics": "advanced", "widget": true, "priority_search": true}', 2),

-- Center plans
('center_basic', 'Basic Center', 'Для небольших центров', 10000, 100000, 850, 8500, 'center_basic', '{"max_staff": 10, "commission_percent": 15, "crm": false, "api": false}', 1),
('center_premium', 'Premium Center', 'CRM и управление', 30000, 300000, 2550, 25500, 'center_premium', '{"max_staff": -1, "commission_percent": 10, "crm": true, "api": true, "white_label": false}', 2),
('center_corporate', 'Corporate', 'Для сетей', 100000, 1000000, 8500, 85000, 'center_corporate', '{"max_staff": -1, "max_branches": -1, "commission_percent": 5, "crm": true, "api": true, "white_label": true, "dedicated_manager": true}', 3);

-- User subscriptions
CREATE TABLE public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id VARCHAR(50) REFERENCES public.subscription_plans(id),
    
    -- Billing
    status VARCHAR(50) DEFAULT 'active', -- active, cancelled, expired, paused
    billing_interval VARCHAR(20) DEFAULT 'monthly', -- monthly, yearly
    
    -- Payment provider info
    payment_provider VARCHAR(50), -- nowpayments, crypto, stripe, etc.
    payment_provider_subscription_id VARCHAR(255),
    
    -- Amounts
    amount_paid INTEGER, -- in cents
    currency VARCHAR(10),
    unity_tokens_used DECIMAL(15, 2) DEFAULT 0,
    
    -- Dates
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    
    -- Auto-renewal
    cancel_at_period_end BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment history
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES public.user_subscriptions(id) ON DELETE SET NULL,
    
    -- Payment details
    amount INTEGER NOT NULL, -- in cents
    currency VARCHAR(10) NOT NULL,
    unity_tokens_used DECIMAL(15, 2) DEFAULT 0,
    
    -- Payment method
    payment_method VARCHAR(50), -- crypto, card, unity_token
    payment_provider VARCHAR(50),
    provider_payment_id VARCHAR(255),
    
    -- Status: pending, completed, failed, refunded
    status VARCHAR(50) DEFAULT 'pending',
    
    -- Crypto details
    crypto_address VARCHAR(255),
    crypto_tx_hash VARCHAR(255),
    
    metadata JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- UNITY TOKEN SYSTEM
-- ============================================

-- Token exchange rates
CREATE TABLE public.unity_exchange_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_currency VARCHAR(10) NOT NULL,
    to_currency VARCHAR(10) NOT NULL,
    rate DECIMAL(20, 10) NOT NULL, -- 1 USD = 8.5 UNITY
    is_active BOOLEAN DEFAULT true,
    effective_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial rate: 1 USD = 8.5 UNITY (15% bonus when paying with tokens)
INSERT INTO public.unity_exchange_rates (from_currency, to_currency, rate) VALUES
('USD', 'UNITY', 8.5),
('UNITY', 'USD', 0.1176);

-- Token transactions
CREATE TABLE public.token_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Transaction type: purchase, reward, referral, payout, subscription_payment, refund
    transaction_type VARCHAR(50) NOT NULL,
    
    amount DECIMAL(15, 2) NOT NULL, -- positive = credit, negative = debit
    balance_after DECIMAL(15, 2) NOT NULL,
    
    -- Reference
    reference_type VARCHAR(50), -- subscription, payment, referral, achievement
    reference_id UUID,
    
    -- Description
    description TEXT,
    
    metadata JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token rewards configuration
CREATE TABLE public.token_rewards (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    reward_amount DECIMAL(15, 2) NOT NULL,
    reward_type VARCHAR(50), -- signup, referral, achievement, streak, subscription_bonus
    is_active BOOLEAN DEFAULT true,
    conditions JSONB, -- e.g., {"min_referrals": 5}
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert reward configurations
INSERT INTO public.token_rewards (id, name, description, reward_amount, reward_type, conditions) VALUES
('signup_bonus', 'Приветственный бонус', 'За регистрацию', 100, 'signup', '{}'),
('referral_signup', 'Реферальная регистрация', 'За приглашенного друга', 500, 'referral', '{}'),
('referral_subscription', 'Реферальная подписка', 'За подписку друга', 1000, 'referral', '{}'),
('streak_7', 'Стрик 7 дней', '7 дней подряд активности', 50, 'streak', '{"days": 7}'),
('streak_30', 'Стрик 30 дней', '30 дней подряд активности', 300, 'streak', '{"days": 30}'),
('subscription_basic', 'Бонус за Basic', 'Ежемесячный бонус', 50, 'subscription_bonus', '{"plan": "user_basic"}'),
('subscription_premium', 'Бонус за Premium', 'Ежемесячный бонус', 150, 'subscription_bonus', '{"plan": "user_premium"}');

-- ============================================
-- AUTOMATED PAYOUTS SYSTEM
-- ============================================

-- Commission settings for specialists and centers
CREATE TABLE public.commission_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Entity type: specialist, center, shop
    entity_type VARCHAR(50) NOT NULL,
    
    -- Commission configuration
    commission_type VARCHAR(20) DEFAULT 'percentage', -- percentage, fixed
    commission_value DECIMAL(10, 2) DEFAULT 5.00, -- percent or fixed amount
    min_amount INTEGER, -- minimum for payout (in cents)
    max_amount INTEGER, -- maximum commission per transaction
    
    -- Payout preferences
    payout_currency VARCHAR(10) DEFAULT 'USDT',
    payout_schedule VARCHAR(20) DEFAULT 'weekly', -- daily, weekly, monthly
    auto_payout BOOLEAN DEFAULT true,
    
    -- Payout addresses
    usdt_trc20_address VARCHAR(100),
    bank_account_info JSONB,
    
    -- Individual rates for specific users
    individual_rates JSONB, -- [{"userId": "uuid", "rate": 3.0}]
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payouts history
CREATE TABLE public.payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Amount
    amount INTEGER NOT NULL, -- in cents
    currency VARCHAR(10) NOT NULL,
    unity_equivalent DECIMAL(15, 2),
    
    -- Payout method
    payout_method VARCHAR(50), -- crypto, bank_transfer
    payout_address VARCHAR(255),
    
    -- Status: pending, processing, completed, failed
    status VARCHAR(50) DEFAULT 'pending',
    
    -- Transaction details
    transaction_hash VARCHAR(255), -- for crypto
    provider_payout_id VARCHAR(255),
    
    -- Period covered
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    
    -- Breakdown
    earnings_breakdown JSONB, -- [{"source": "subscription", "amount": 500}]
    
    metadata JSONB,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Revenue tracking (for calculating payouts)
CREATE TABLE public.revenue_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Who generated the revenue
    source_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Who should receive the commission
    recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    recipient_type VARCHAR(50), -- specialist, center, referrer
    
    -- Revenue details
    amount INTEGER NOT NULL, -- in cents
    currency VARCHAR(10) NOT NULL,
    
    -- Source
    source_type VARCHAR(50), -- subscription, consultation, product_sale, referral
    source_id UUID,
    
    -- Commission
    commission_percent DECIMAL(5, 2),
    commission_amount INTEGER, -- in cents
    
    -- Status
    is_paid_out BOOLEAN DEFAULT false,
    payout_id UUID REFERENCES public.payouts(id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SPECIALISTS AND CENTERS
-- ============================================

-- Specialists profiles
CREATE TABLE public.specialists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Professional info
    specialization VARCHAR(200) NOT NULL, -- e.g., "Нутрициолог", "Психолог"
    title VARCHAR(200), -- e.g., "Доктор медицинских наук"
    license_number VARCHAR(100),
    years_experience INTEGER,
    
    -- Bio
    about TEXT,
    education TEXT[],
    certifications TEXT[],
    
    -- Pricing
    consultation_price INTEGER, -- in cents
    consultation_duration INTEGER, -- in minutes
    currency VARCHAR(10) DEFAULT 'USD',
    
    -- Stats
    rating DECIMAL(3, 2) DEFAULT 5.00,
    reviews_count INTEGER DEFAULT 0,
    clients_count INTEGER DEFAULT 0,
    
    -- Availability
    is_available BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Centers profiles
CREATE TABLE public.centers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Basic info
    name VARCHAR(200) NOT NULL,
    type VARCHAR(100), -- gym, spa, clinic, pool, etc.
    description TEXT,
    
    -- Location
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    coordinates POINT,
    
    -- Contact
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    
    -- Media
    logo_url TEXT,
    cover_image_url TEXT,
    gallery_urls TEXT[],
    
    -- Stats
    rating DECIMAL(3, 2) DEFAULT 5.00,
    reviews_count INTEGER DEFAULT 0,
    
    -- Subscription
    subscription_plan_id VARCHAR(50) REFERENCES public.subscription_plans(id),
    
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Center staff
CREATE TABLE public.center_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    center_id UUID REFERENCES public.centers(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    role VARCHAR(100), -- trainer, manager, admin, etc.
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specialist connections (subscriptions to specialists)
CREATE TABLE public.specialist_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    specialist_id UUID REFERENCES public.specialists(id) ON DELETE CASCADE,
    
    -- Access level: dashboard_view, recommendations, full_access
    access_level VARCHAR(50) DEFAULT 'dashboard_view',
    
    -- Status: active, paused, cancelled
    status VARCHAR(50) DEFAULT 'active',
    
    -- Pricing
    monthly_price INTEGER, -- in cents (set by specialist)
    currency VARCHAR(10) DEFAULT 'USD',
    
    -- Billing
    next_billing_date TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, specialist_id)
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialist_connections ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read public profiles, only edit own
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (is_profile_public = true OR auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Posts: Public posts visible, own posts manageable
CREATE POLICY "Public posts are viewable"
    ON public.posts FOR SELECT
    USING (visibility = 'public' OR user_id = auth.uid());

CREATE POLICY "Users can manage own posts"
    ON public.posts FOR ALL
    USING (user_id = auth.uid());

-- Add more policies as needed...

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON public.user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_wallets_updated_at BEFORE UPDATE ON public.user_wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_specialists_updated_at BEFORE UPDATE ON public.specialists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_centers_updated_at BEFORE UPDATE ON public.centers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update follower counts
CREATE OR REPLACE FUNCTION update_follower_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
        UPDATE public.profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.profiles SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
        UPDATE public.profiles SET following_count = following_count - 1 WHERE id = OLD.follower_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER follow_changes
    AFTER INSERT OR DELETE ON public.follows
    FOR EACH ROW EXECUTE FUNCTION update_follower_counts();

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_referral_code ON public.profiles(referral_code);

CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_visibility ON public.posts(visibility);

CREATE INDEX idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX idx_post_likes_user_id ON public.post_likes(user_id);

CREATE INDEX idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX idx_follows_following_id ON public.follows(following_id);

CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(status);

CREATE INDEX idx_token_transactions_user_id ON public.token_transactions(user_id);
CREATE INDEX idx_token_transactions_created_at ON public.token_transactions(created_at DESC);

CREATE INDEX idx_specialists_user_id ON public.specialists(user_id);
CREATE INDEX idx_specialists_specialization ON public.specialists(specialization);

CREATE INDEX idx_centers_admin_user_id ON public.centers(admin_user_id);
CREATE INDEX idx_centers_type ON public.centers(type);
