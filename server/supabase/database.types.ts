export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          phone: string | null
          first_name: string | null
          last_name: string | null
          username: string | null
          avatar_url: string | null
          bio: string | null
          date_of_birth: string | null
          gender: string | null
          role: string
          subscription_tier: string
          subscription_status: string
          subscription_expires_at: string | null
          is_profile_public: boolean
          followers_count: number
          following_count: number
          created_at: string
          updated_at: string
          last_login_at: string | null
          referral_code: string | null
          referred_by: string | null
        }
        Insert: {
          id: string
          email?: string | null
          phone?: string | null
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          gender?: string | null
          role?: string
          subscription_tier?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          is_profile_public?: boolean
          followers_count?: number
          following_count?: number
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          referral_code?: string | null
          referred_by?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          phone?: string | null
          first_name?: string | null
          last_name?: string | null
          username?: string | null
          avatar_url?: string | null
          bio?: string | null
          date_of_birth?: string | null
          gender?: string | null
          role?: string
          subscription_tier?: string
          subscription_status?: string
          subscription_expires_at?: string | null
          is_profile_public?: boolean
          followers_count?: number
          following_count?: number
          created_at?: string
          updated_at?: string
          last_login_at?: string | null
          referral_code?: string | null
          referred_by?: string | null
        }
      }
      user_wallets: {
        Row: {
          id: string
          user_id: string
          fiat_balance: number
          fiat_currency: string
          unity_balance: number
          unity_staked: number
          usdt_trc20_address: string | null
          usdc_erc20_address: string | null
          btc_address: string | null
          eth_address: string | null
          created_at: string
          updated_at: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string | null
          media_urls: string[] | null
          post_type: string
          linked_data: Json | null
          likes_count: number
          comments_count: number
          shares_count: number
          visibility: string
          is_pinned: boolean
          created_at: string
          updated_at: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          description: string | null
          price_monthly: number | null
          price_yearly: number | null
          unity_price_monthly: number | null
          unity_price_yearly: number | null
          plan_type: string
          features: Json | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
      }
      token_transactions: {
        Row: {
          id: string
          user_id: string
          transaction_type: string
          amount: number
          balance_after: number
          reference_type: string | null
          reference_id: string | null
          description: string | null
          metadata: Json | null
          created_at: string
        }
      }
      specialists: {
        Row: {
          id: string
          user_id: string
          specialization: string
          title: string | null
          license_number: string | null
          years_experience: number | null
          about: string | null
          education: string[] | null
          certifications: string[] | null
          consultation_price: number | null
          consultation_duration: number | null
          currency: string
          rating: number
          reviews_count: number
          clients_count: number
          is_available: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
        }
      }
      centers: {
        Row: {
          id: string
          admin_user_id: string
          name: string
          type: string | null
          description: string | null
          address: string | null
          city: string | null
          country: string | null
          coordinates: unknown | null
          phone: string | null
          email: string | null
          website: string | null
          logo_url: string | null
          cover_image_url: string | null
          gallery_urls: string[] | null
          rating: number
          reviews_count: number
          subscription_plan_id: string | null
          is_active: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
        }
      }
      // Health modules
      medicine_documents: {
        Row: {
          id: string
          user_id: string
          title: string
          document_type: string | null
          category: string | null
          file_url: string
          file_type: string | null
          ocr_text: string | null
          lab_results: Json | null
          document_date: string | null
          uploaded_at: string
          doctor_name: string | null
          clinic_name: string | null
          notes: string | null
          is_archived: boolean
        }
      }
      movement_workouts: {
        Row: {
          id: string
          user_id: string
          title: string
          workout_type: string | null
          duration_minutes: number | null
          calories_burned: number | null
          perceived_exertion: number | null
          distance_meters: number | null
          elevation_gain_meters: number | null
          avg_heart_rate: number | null
          max_heart_rate: number | null
          notes: string | null
          started_at: string | null
          ended_at: string | null
          created_at: string
        }
      }
      nutrition_meals: {
        Row: {
          id: string
          user_id: string
          meal_type: string | null
          meal_date: string
          logged_at: string
          total_calories: number
          total_protein_g: number
          total_carbs_g: number
          total_fat_g: number
          total_fiber_g: number
          photo_url: string | null
          notes: string | null
        }
      }
      psychology_mood: {
        Row: {
          id: string
          user_id: string
          mood_rating: number | null
          emotions: string[] | null
          sleep_quality: number | null
          stress_level: number | null
          energy_level: number | null
          notes: string | null
          logged_at: string
        }
      }
      sleep_sessions: {
        Row: {
          id: string
          user_id: string
          bed_time: string | null
          wake_time: string | null
          duration_minutes: number | null
          time_to_fall_asleep_minutes: number | null
          awakenings_count: number
          time_awake_during_night_minutes: number
          sleep_quality: number | null
          deep_sleep_minutes: number | null
          light_sleep_minutes: number | null
          rem_sleep_minutes: number | null
          awake_minutes: number | null
          caffeine_before_bed: boolean
          screen_time_before_bed: boolean
          alcohol_before_bed: boolean
          room_temperature: number | null
          room_darkness: number | null
          noise_level: number | null
          dreams: string | null
          notes: string | null
          data_source: string | null
          created_at: string
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          category: string | null
          frequency_type: string | null
          frequency_days: number[] | null
          target_per_period: number
          reminder_time: string | null
          reminder_enabled: boolean
          current_streak: number
          longest_streak: number
          total_completions: number
          is_active: boolean
          start_date: string | null
          end_date: string | null
          linked_goal_id: string | null
          created_at: string
          updated_at: string
        }
      }
      user_goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string | null
          target_value: number | null
          current_value: number
          unit: string | null
          start_date: string | null
          target_date: string | null
          status: string
          progress_percent: number
          reminder_enabled: boolean
          reminder_frequency: string | null
          is_active: boolean
          created_at: string
          updated_at: string
          completed_at: string | null
        }
      }
    }
  }
}
