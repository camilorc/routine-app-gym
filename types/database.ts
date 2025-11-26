/**
 * Tipos generados para la base de datos de Supabase
 * Estructura de tablas y relaciones
 */

// Tipos base de la base de datos
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
      exercises: {
        Row: {
          id: string
          name: string
          description: string | null
          muscle_group: string | null
          secondary_muscles: string[] | null
          equipment_text: string | null
          equipment_category: string | null
          difficulty: string | null
          video_url: string | null
          image_url: string | null
          instructions: string[] | null
          created_by: string | null
          is_global: boolean
          based_on_exercise_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          muscle_group?: string | null
          secondary_muscles?: string[] | null
          equipment_text?: string | null
          equipment_category?: string | null
          difficulty?: string | null
          video_url?: string | null
          image_url?: string | null
          instructions?: string[] | null
          created_by?: string | null
          is_global?: boolean
          based_on_exercise_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          muscle_group?: string | null
          secondary_muscles?: string[] | null
          equipment_text?: string | null
          equipment_category?: string | null
          difficulty?: string | null
          video_url?: string | null
          image_url?: string | null
          instructions?: string[] | null
          created_by?: string | null
          is_global?: boolean
          based_on_exercise_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      routines: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          is_template: boolean
          cloned_from_routine_id: string | null
          is_modified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_public?: boolean
          is_template?: boolean
          cloned_from_routine_id?: string | null
          is_modified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_public?: boolean
          is_template?: boolean
          cloned_from_routine_id?: string | null
          is_modified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      routine_exercises: {
        Row: {
          id: string
          routine_id: string
          exercise_id: string
          order_index: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          routine_id: string
          exercise_id: string
          order_index: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          routine_id?: string
          exercise_id?: string
          order_index?: number
          notes?: string | null
          created_at?: string
        }
      }
      exercise_sets: {
        Row: {
          id: string
          routine_exercise_id: string
          set_number: number
          reps: string | null
          weight_kg: string | null
          rir: string | null
          rest_minutes: number | null
          rest_seconds: number | null
          completed: boolean
          completed_at: string | null
          actual_reps: number | null
          actual_weight_kg: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          routine_exercise_id: string
          set_number: number
          reps?: string | null
          weight_kg?: string | null
          rir?: string | null
          rest_minutes?: number | null
          rest_seconds?: number | null
          completed?: boolean
          completed_at?: string | null
          actual_reps?: number | null
          actual_weight_kg?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          routine_exercise_id?: string
          set_number?: number
          reps?: string | null
          weight_kg?: string | null
          rir?: string | null
          rest_minutes?: number | null
          rest_seconds?: number | null
          completed?: boolean
          completed_at?: string | null
          actual_reps?: number | null
          actual_weight_kg?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      routine_assignments: {
        Row: {
          id: string
          routine_id: string
          trainer_id: string
          student_id: string
          assigned_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          routine_id: string
          trainer_id: string
          student_id: string
          assigned_at?: string
          notes?: string | null
        }
        Update: {
          id?: string
          routine_id?: string
          trainer_id?: string
          student_id?: string
          assigned_at?: string
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
