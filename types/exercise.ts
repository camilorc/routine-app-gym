export type MuscleGroup = 
  | 'pecho' 
  | 'espalda' 
  | 'piernas' 
  | 'hombros' 
  | 'brazos' 
  | 'core'
  | 'gluteos'
  | 'pantorrillas'

export const EQUIPMENT_CATEGORIES = [
  'barra',
  'mancuernas', 
  'maquina',
  'peso_corporal',
  'cable',
  'bandas',
  'kettlebell',
  'otro'
] as const

export type EquipmentCategory = typeof EQUIPMENT_CATEGORIES[number]

export type Difficulty = 'principiante' | 'intermedio' | 'avanzado'

export interface ExerciseSerie {
  id?: string  // ID temporal para React keys
  series: string  // Número de serie (en el formulario)
  reps: string  // Número de repeticiones
  weight: string  // Peso en kg
  rir: string  // RIR (Reps In Reserve) - repeticiones en reserva
}

export interface RoutineExercise {
  name: string
  description?: string
  series: ExerciseSerie[]
  rest_minutes?: number | null  // Minutos de descanso
  rest_seconds?: number | null  // Segundos de descanso
  exerciseId?: string
  basedOnExerciseId?: string  // ID del ejercicio original si fue personalizado
  equipment_category?: string | null
  equipment_text?: string | null
  muscle_group?: string | null
}

export interface Exercise {
  id: string
  name: string
  description: string | null
  muscle_group: MuscleGroup | null
  secondary_muscles: MuscleGroup[] | null
  equipment_text: string | null  // Texto libre descriptivo (ej: "Barra olímpica 20kg")
  equipment_category: EquipmentCategory | null  // Categoría general (ej: "barra")
  difficulty: Difficulty | null
  video_url: string | null
  image_url: string | null
  instructions: string[] | null
  created_by: string | null
  is_global: boolean
  based_on_exercise_id: string | null
  usage_count: number
  created_at: string
  updated_at: string
}

export interface ExerciseInsert {
  id?: string
  name: string
  description?: string | null
  muscle_group?: MuscleGroup | null
  secondary_muscles?: MuscleGroup[] | null
  equipment_text?: string | null
  equipment_category?: EquipmentCategory | null
  difficulty?: Difficulty | null
  video_url?: string | null
  image_url?: string | null
  instructions?: string[] | null
  created_by?: string | null
  is_global?: boolean
  based_on_exercise_id?: string | null
  usage_count?: number
  created_at?: string
  updated_at?: string
}

export interface ExerciseUpdate {
  name?: string
  description?: string | null
  muscle_group?: MuscleGroup | null
  secondary_muscles?: MuscleGroup[] | null
  equipment_text?: string | null
  equipment_category?: EquipmentCategory | null
  difficulty?: Difficulty | null
  video_url?: string | null
  image_url?: string | null
  instructions?: string[] | null
  based_on_exercise_id?: string | null
  updated_at?: string
}

// Ejercicio con datos adicionales para UI
export interface ExerciseWithStats extends Exercise {
  is_favorite?: boolean
  last_used?: string | null
  times_used?: number
  personal_record_kg?: number | null
  stats?: {
    avg_weight_kg: number | null
    total_volume_kg: number | null
    progress_percentage: number | null
  }
}

// Para formularios de creación
export interface CreateExerciseFormData {
  name: string
  description?: string
  muscleGroup?: MuscleGroup
  secondaryMuscles?: MuscleGroup[]
  equipmentText?: string
  equipmentCategory?: EquipmentCategory
  difficulty?: Difficulty
  basedOnExerciseId?: string
  videoUrl?: string
  instructions?: string[]
}

// Para estadísticas de ejercicios
export interface ExerciseHistory {
  id: string
  user_id: string
  exercise_id: string
  routine_id: string | null
  date: string
  sets_completed: number | null
  total_reps: number | null
  max_weight_kg: number | null
  average_weight_kg: number | null
  total_volume_kg: number | null
  average_rir: number | null
  duration_seconds: number | null
  notes: string | null
  created_at: string
}

export interface ExerciseHistoryInsert {
  id?: string
  user_id: string
  exercise_id: string
  routine_id?: string | null
  date?: string
  sets_completed?: number | null
  total_reps?: number | null
  max_weight_kg?: number | null
  average_weight_kg?: number | null
  total_volume_kg?: number | null
  average_rir?: number | null
  duration_seconds?: number | null
  notes?: string | null
  created_at?: string
}

export interface ExerciseStats {
  user_id: string
  exercise_id: string
  exercise_name: string
  personal_record_kg: number | null
  max_volume_kg: number | null
  avg_weight_kg: number | null
  avg_sets: number | null
  avg_reps: number | null
  times_performed: number | null
  last_performed: string | null
  first_performed: string | null
  recent_avg_weight: number | null
  initial_avg_weight: number | null
}
