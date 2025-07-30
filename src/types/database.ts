export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      weeks: {
        Row: {
          id: number
          week_number: number
          season: number
          start_date: string
          end_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: number
          week_number: number
          season: number
          start_date: string
          end_date: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          week_number?: number
          season?: number
          start_date?: string
          end_date?: string
          is_active?: boolean
          created_at?: string
        }
      }
      games: {
        Row: {
          id: number
          week_id: number
          home_team: string
          away_team: string
          game_date: string
          home_score: number | null
          away_score: number | null
          status: 'scheduled' | 'in_progress' | 'completed'
          created_at: string
        }
        Insert: {
          id?: number
          week_id: number
          home_team: string
          away_team: string
          game_date: string
          home_score?: number | null
          away_score?: number | null
          status?: 'scheduled' | 'in_progress' | 'completed'
          created_at?: string
        }
        Update: {
          id?: number
          week_id?: number
          home_team?: string
          away_team?: string
          game_date?: string
          home_score?: number | null
          away_score?: number | null
          status?: 'scheduled' | 'in_progress' | 'completed'
          created_at?: string
        }
      }
      predictions: {
        Row: {
          id: number
          user_id: string
          game_id: number
          predicted_winner: string
          points_earned: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          game_id: number
          predicted_winner: string
          points_earned?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          game_id?: number
          predicted_winner?: string
          points_earned?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      leaderboard: {
        Row: {
          id: number
          user_id: string
          total_points: number
          correct_predictions: number
          total_predictions: number
          week_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          total_points?: number
          correct_predictions?: number
          total_predictions?: number
          week_id?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          total_points?: number
          correct_predictions?: number
          total_predictions?: number
          week_id?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}