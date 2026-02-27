-- EthosLife Health Modules Schema
-- All 7 health modules: Medicine, Movement, Nutrition, Psychology, Sleep, Relationships, Habits

-- ============================================
-- 1. MEDICINE MODULE
-- ============================================

-- Medical documents and analyses
CREATE TABLE public.medicine_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Document info
    title VARCHAR(255) NOT NULL,
    document_type VARCHAR(100), -- lab_result, prescription, diagnosis, imaging
    category VARCHAR(100), -- blood_test, urine_test, xray, mri, etc.
    
    -- Files
    file_url TEXT NOT NULL,
    file_type VARCHAR(50), -- pdf, image
    ocr_text TEXT, -- extracted text from OCR
    
    -- Analysis results (structured data)
    lab_results JSONB, -- [{"marker": "glucose", "value": 5.2, "unit": "mmol/L", "reference": "3.9-6.1"}]
    
    -- Dates
    document_date DATE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Metadata
    doctor_name VARCHAR(200),
    clinic_name VARCHAR(200),
    notes TEXT,
    
    is_archived BOOLEAN DEFAULT false
);

-- Medical metrics tracking
CREATE TABLE public.medicine_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    metric_name VARCHAR(100) NOT NULL, -- glucose, cholesterol, blood_pressure, etc.
    metric_value DECIMAL(10, 3),
    unit VARCHAR(50),
    
    -- Reference ranges
    reference_min DECIMAL(10, 3),
    reference_max DECIMAL(10, 3),
    is_normal BOOLEAN,
    
    -- Context
    measured_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medications
CREATE TABLE public.medicine_medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(100), -- "twice daily", "every 8 hours"
    
    -- Schedule
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    
    -- Reminders
    reminder_times TIME[], -- array of times
    
    -- Notes
    prescribed_by VARCHAR(200),
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. MOVEMENT MODULE
-- ============================================

-- Workouts / Training sessions
CREATE TABLE public.movement_workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Workout details
    title VARCHAR(255) NOT NULL,
    workout_type VARCHAR(100), -- cardio, strength, yoga, swimming, etc.
    
    -- Duration and intensity
    duration_minutes INTEGER,
    calories_burned INTEGER,
    perceived_exertion INTEGER CHECK (perceived_exertion BETWEEN 1 AND 10),
    
    -- Stats
    distance_meters INTEGER,
    elevation_gain_meters INTEGER,
    
    -- Heart rate
    avg_heart_rate INTEGER,
    max_heart_rate INTEGER,
    
    -- Notes
    notes TEXT,
    
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exercises within workouts
CREATE TABLE public.movement_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID REFERENCES public.movement_workouts(id) ON DELETE CASCADE,
    
    exercise_name VARCHAR(255) NOT NULL,
    exercise_category VARCHAR(100), -- cardio, strength, flexibility
    
    -- Sets and reps
    sets INTEGER,
    reps INTEGER,
    weight_kg DECIMAL(6, 2),
    duration_seconds INTEGER,
    
    -- Order in workout
    sort_order INTEGER DEFAULT 0,
    
    notes TEXT
);

-- Daily activity summary (from wearables or manual)
CREATE TABLE public.movement_daily_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    date DATE NOT NULL,
    
    -- Steps and distance
    steps INTEGER DEFAULT 0,
    distance_meters INTEGER DEFAULT 0,
    floors_climbed INTEGER DEFAULT 0,
    
    -- Calories
    calories_burned INTEGER DEFAULT 0,
    active_calories INTEGER DEFAULT 0,
    
    -- Activity time
    active_minutes INTEGER DEFAULT 0,
    very_active_minutes INTEGER DEFAULT 0,
    
    -- Heart rate
    resting_heart_rate INTEGER,
    avg_heart_rate INTEGER,
    
    -- Source
    data_source VARCHAR(50), -- apple_health, google_fit, fitbit, garmin, manual
    
    UNIQUE(user_id, date)
);

-- ============================================
-- 3. NUTRITION MODULE
-- ============================================

-- Food diary / Meals
CREATE TABLE public.nutrition_meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Meal info
    meal_type VARCHAR(50), -- breakfast, lunch, dinner, snack
    meal_date DATE NOT NULL,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Totals
    total_calories INTEGER DEFAULT 0,
    total_protein_g DECIMAL(6, 2) DEFAULT 0,
    total_carbs_g DECIMAL(6, 2) DEFAULT 0,
    total_fat_g DECIMAL(6, 2) DEFAULT 0,
    total_fiber_g DECIMAL(6, 2) DEFAULT 0,
    
    -- Photo
    photo_url TEXT,
    
    notes TEXT
);

-- Individual food items in meals
CREATE TABLE public.nutrition_food_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_id UUID REFERENCES public.nutrition_meals(id) ON DELETE CASCADE,
    
    food_name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    barcode VARCHAR(50),
    
    -- Portion
    serving_size DECIMAL(8, 2),
    serving_unit VARCHAR(50), -- g, ml, oz, cup, etc.
    servings_count DECIMAL(6, 2) DEFAULT 1,
    
    -- Nutrition per serving
    calories INTEGER,
    protein_g DECIMAL(6, 2),
    carbs_g DECIMAL(6, 2),
    fat_g DECIMAL(6, 2),
    fiber_g DECIMAL(6, 2),
    sugar_g DECIMAL(6, 2),
    sodium_mg DECIMAL(8, 2),
    
    -- Sort order
    sort_order INTEGER DEFAULT 0
);

-- Water intake
CREATE TABLE public.nutrition_water (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    date DATE NOT NULL,
    amount_ml INTEGER DEFAULT 0,
    
    UNIQUE(user_id, date)
);

-- Nutrition goals
CREATE TABLE public.nutrition_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    daily_calories INTEGER,
    daily_protein_g INTEGER,
    daily_carbs_g INTEGER,
    daily_fat_g INTEGER,
    daily_fiber_g INTEGER,
    daily_water_ml INTEGER DEFAULT 2000,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. PSYCHOLOGY MODULE
-- ============================================

-- Mood tracking
CREATE TABLE public.psychology_mood (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Mood rating 1-10
    mood_rating INTEGER CHECK (mood_rating BETWEEN 1 AND 10),
    
    -- Emotions (multiple)
    emotions VARCHAR(50)[], -- happy, sad, anxious, excited, etc.
    
    -- Factors
    sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
    stress_level INTEGER CHECK (stress_level BETWEEN 1 AND 10),
    energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 10),
    
    -- Notes
    notes TEXT,
    
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Journal entries (CBT)
CREATE TABLE public.psychology_journal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Entry type: freeform, gratitude, thought_record, worry_time
    entry_type VARCHAR(50) DEFAULT 'freeform',
    
    title VARCHAR(255),
    content TEXT NOT NULL,
    
    -- For thought records (CBT)
    triggering_event TEXT,
    automatic_thoughts TEXT,
    cognitive_distortions VARCHAR(100)[],
    rational_response TEXT,
    
    -- Mood at time of writing
    mood_before INTEGER CHECK (mood_before BETWEEN 1 AND 10),
    mood_after INTEGER CHECK (mood_after BETWEEN 1 AND 10),
    
    -- Tags
    tags VARCHAR(50)[],
    
    is_favorite BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Meditation / Mindfulness sessions
CREATE TABLE public.psychology_meditation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    meditation_type VARCHAR(100), -- breathing, body_scan, mindfulness, etc.
    duration_minutes INTEGER,
    
    -- Experience
    focus_rating INTEGER CHECK (focus_rating BETWEEN 1 AND 5),
    relaxation_rating INTEGER CHECK (relaxation_rating BETWEEN 1 AND 5),
    
    notes TEXT,
    
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PHQ-9 / GAD-7 assessments
CREATE TABLE public.psychology_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    assessment_type VARCHAR(50), -- PHQ-9, GAD-7, WHO-5
    total_score INTEGER,
    severity VARCHAR(50), -- none, mild, moderate, moderately_severe, severe
    
    -- Individual answers
    answers INTEGER[],
    
    taken_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. SLEEP MODULE
-- ============================================

-- Sleep sessions
CREATE TABLE public.sleep_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Times
    bed_time TIMESTAMP WITH TIME ZONE,
    wake_time TIMESTAMP WITH TIME ZONE,
    
    -- Duration
    duration_minutes INTEGER,
    time_to_fall_asleep_minutes INTEGER,
    awakenings_count INTEGER DEFAULT 0,
    time_awake_during_night_minutes INTEGER DEFAULT 0,
    
    -- Quality
    sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 10),
    
    -- Stages (from wearables)
    deep_sleep_minutes INTEGER,
    light_sleep_minutes INTEGER,
    rem_sleep_minutes INTEGER,
    awake_minutes INTEGER,
    
    -- Factors
    caffeine_before_bed BOOLEAN DEFAULT false,
    screen_time_before_bed BOOLEAN DEFAULT false,
    alcohol_before_bed BOOLEAN DEFAULT false,
    
    -- Environment
    room_temperature DECIMAL(4, 1),
    room_darkness INTEGER CHECK (room_darkness BETWEEN 1 AND 5),
    noise_level INTEGER CHECK (noise_level BETWEEN 1 AND 5),
    
    -- Notes
    dreams TEXT,
    notes TEXT,
    
    -- Source
    data_source VARCHAR(50), -- oura, apple_watch, fitbit, manual
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sleep goals
CREATE TABLE public.sleep_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    target_bed_time TIME,
    target_wake_time TIME,
    target_duration_hours DECIMAL(3, 1) DEFAULT 8.0,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. RELATIONSHIPS MODULE
-- ============================================

-- Social connections quality
CREATE TABLE public.relationships_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Person info
    person_name VARCHAR(200),
    relationship_type VARCHAR(100), -- family, friend, colleague, romantic
    
    -- Quality assessment
    closeness_rating INTEGER CHECK (closeness_rating BETWEEN 1 AND 10),
    support_rating INTEGER CHECK (support_rating BETWEEN 1 AND 10),
    communication_frequency VARCHAR(50), -- daily, weekly, monthly, rarely
    
    -- Time spent together
    last_contact_date DATE,
    minutes_spent_together_weekly INTEGER,
    
    notes TEXT,
    
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social activities
CREATE TABLE public.relationships_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    activity_type VARCHAR(100), -- meetup, call, message, event
    activity_date DATE NOT NULL,
    
    -- People involved
    connection_ids UUID[], -- references relationships_connections
    
    -- Experience
    enjoyment_rating INTEGER CHECK (enjoyment_rating BETWEEN 1 AND 10),
    energy_rating INTEGER CHECK (energy_rating BETWEEN -5 AND 5), -- negative = draining
    
    duration_minutes INTEGER,
    
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social wellbeing assessment
CREATE TABLE public.relationships_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- UCLA Loneliness Scale or similar
    loneliness_score INTEGER,
    social_satisfaction INTEGER CHECK (social_satisfaction BETWEEN 1 AND 10),
    
    -- Social network size
    close_connections_count INTEGER,
    total_connections_count INTEGER,
    
    taken_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 7. HABITS / SPIRITUALITY MODULE
-- ============================================

-- Habits
CREATE TABLE public.habits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Basic info
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    
    -- Category
    category VARCHAR(100), -- health, fitness, mindfulness, productivity, etc.
    
    -- Frequency
    frequency_type VARCHAR(50), -- daily, weekly, specific_days
    frequency_days INTEGER[], -- [1, 3, 5] for Mon, Wed, Fri
    target_per_period INTEGER DEFAULT 1, -- e.g., 3 times per week
    
    -- Reminder
    reminder_time TIME,
    reminder_enabled BOOLEAN DEFAULT false,
    
    -- Streak tracking
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_completions INTEGER DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    start_date DATE,
    end_date DATE,
    
    -- Linked to goals
    linked_goal_id UUID,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habit completions
CREATE TABLE public.habit_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_id UUID REFERENCES public.habits(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    completed_date DATE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Optional: value for measurable habits (e.g., "read 30 pages")
    value DECIMAL(8, 2),
    unit VARCHAR(50),
    
    notes TEXT,
    
    UNIQUE(habit_id, completed_date)
);

-- Spirituality / Meaning practices
CREATE TABLE public.spirituality_practices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    practice_type VARCHAR(100), -- gratitude, reflection, prayer, values_review
    
    -- Content
    prompt TEXT,
    response TEXT,
    
    -- For gratitude
    grateful_for TEXT[],
    
    -- For values
    core_values VARCHAR(100)[],
    value_alignment_rating INTEGER CHECK (value_alignment_rating BETWEEN 1 AND 10),
    
    duration_minutes INTEGER,
    
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Goals (cross-module)
CREATE TABLE public.user_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    
    -- Goal details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Category (links to module)
    category VARCHAR(100), -- weight, fitness, nutrition, sleep, mental, habit
    
    -- Target
    target_value DECIMAL(10, 2),
    current_value DECIMAL(10, 2) DEFAULT 0,
    unit VARCHAR(50),
    
    -- Timeline
    start_date DATE,
    target_date DATE,
    
    -- Status
    status VARCHAR(50) DEFAULT 'active', -- active, completed, paused, abandoned
    progress_percent INTEGER DEFAULT 0,
    
    -- Reminder
    reminder_enabled BOOLEAN DEFAULT false,
    reminder_frequency VARCHAR(50), -- daily, weekly
    
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.medicine_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicine_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movement_workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movement_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movement_daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_water ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychology_mood ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychology_journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychology_meditation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychology_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own health data
CREATE POLICY "Users can manage own medicine documents"
    ON public.medicine_documents FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own workouts"
    ON public.movement_workouts FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own meals"
    ON public.nutrition_meals FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own mood entries"
    ON public.psychology_mood FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own sleep data"
    ON public.sleep_sessions FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own habits"
    ON public.habits FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own goals"
    ON public.user_goals FOR ALL
    USING (user_id = auth.uid());

-- ============================================
-- INDEXES
-- ============================================

-- Medicine indexes
CREATE INDEX idx_medicine_docs_user_id ON public.medicine_documents(user_id);
CREATE INDEX idx_medicine_docs_date ON public.medicine_documents(document_date);
CREATE INDEX idx_medicine_metrics_user_id ON public.medicine_metrics(user_id);
CREATE INDEX idx_medicine_metrics_name ON public.medicine_metrics(metric_name);

-- Movement indexes
CREATE INDEX idx_movement_workouts_user_id ON public.movement_workouts(user_id);
CREATE INDEX idx_movement_workouts_started ON public.movement_workouts(started_at);
CREATE INDEX idx_movement_activity_user_date ON public.movement_daily_activity(user_id, date);

-- Nutrition indexes
CREATE INDEX idx_nutrition_meals_user_date ON public.nutrition_meals(user_id, meal_date);

-- Psychology indexes
CREATE INDEX idx_psychology_mood_user_id ON public.psychology_mood(user_id);
CREATE INDEX idx_psychology_mood_logged ON public.psychology_mood(logged_at);

-- Sleep indexes
CREATE INDEX idx_sleep_sessions_user_id ON public.sleep_sessions(user_id);
CREATE INDEX idx_sleep_sessions_bedtime ON public.sleep_sessions(bed_time);

-- Habits indexes
CREATE INDEX idx_habits_user_id ON public.habits(user_id);
CREATE INDEX idx_habit_completions_habit_date ON public.habit_completions(habit_id, completed_date);

-- Goals indexes
CREATE INDEX idx_goals_user_id ON public.user_goals(user_id);
CREATE INDEX idx_goals_status ON public.user_goals(status);
