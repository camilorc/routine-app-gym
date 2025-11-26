import { Exercise, RoutineExercise } from './exercise';

/**
 * Tipos relacionados con rutinas de entrenamiento
 */

// ==========================================
// TIPOS PRINCIPALES DE RUTINA
// ==========================================

// Tipo de rutina en BD (sin ejercicios embebidos)
export interface RoutineDB {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  is_template: boolean;
  cloned_from_routine_id: string | null;
  is_modified: boolean;
  created_at: string;
  updated_at: string;
}

// Tipo de rutina completo para la app (con ejercicios)
export interface Routine extends RoutineDB {
  exercises: RoutineExercise[];
}

export interface RoutineInsert {
  id?: string;
  user_id: string;
  name: string;
  description?: string | null;
  is_public?: boolean;
  is_template?: boolean;
  cloned_from_routine_id?: string | null;
  is_modified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface RoutineUpdate {
  name?: string;
  description?: string | null;
  is_public?: boolean;
  is_template?: boolean;
  is_modified?: boolean;
  updated_at?: string;
}

// ==========================================
// BORRADOR DE RUTINA (estado local antes de guardar)
// ==========================================

export interface DraftRoutine {
  id?: string;
  user_id?: string;
  name: string;
  description: string;
  exercises: RoutineExercise[];
  is_public?: boolean;
  is_template?: boolean;
}

// ==========================================
// EJERCICIO DENTRO DE UNA RUTINA (DB)
// ==========================================

export interface RoutineExerciseDB {
  id: string;
  routine_id: string;
  exercise_id: string;
  order_index: number;
  notes: string | null;
  created_at: string;
}

export interface RoutineExerciseInsert {
  id?: string;
  routine_id: string;
  exercise_id: string;
  order_index: number;
  notes?: string | null;
  created_at?: string;
}

export interface RoutineExerciseUpdate {
  order_index?: number;
  notes?: string | null;
}

// ==========================================
// SERIES DE EJERCICIO
// ==========================================

export interface ExerciseSet {
  id: string;
  routine_exercise_id: string;
  set_number: number;
  reps: number | null;
  weight_kg: number | null;
  rir: number | null;
  rest_seconds: number | null;
  completed: boolean;
  completed_at: string | null;
  actual_reps: number | null;
  actual_weight_kg: number | null;
  created_at: string;
}

export interface ExerciseSetInsert {
  id?: string;
  routine_exercise_id: string;
  set_number: number;
  reps?: number | null;
  weight_kg?: number | null;
  rir?: number | null;
  rest_seconds?: number | null;
  completed?: boolean;
  completed_at?: string | null;
  actual_reps?: number | null;
  actual_weight_kg?: number | null;
  created_at?: string;
}

export interface ExerciseSetUpdate {
  set_number?: number;
  reps?: number | null;
  weight_kg?: number | null;
  rir?: number | null;
  rest_seconds?: number | null;
  completed?: boolean;
  completed_at?: string | null;
  actual_reps?: number | null;
  actual_weight_kg?: number | null;
}

// ==========================================
// ASIGNACIÓN DE RUTINA (TRAINER -> ALUMNO)
// ==========================================

export interface RoutineAssignment {
  id: string;
  routine_id: string;
  trainer_id: string;
  student_id: string;
  assigned_at: string;
  notes: string | null;
}

export interface RoutineAssignmentInsert {
  id?: string;
  routine_id: string;
  trainer_id: string;
  student_id: string;
  assigned_at?: string;
  notes?: string | null;
}

export interface RoutineAssignmentUpdate {
  notes?: string | null;
}

// ==========================================
// TIPOS EXTENDIDOS PARA UI
// ==========================================

export interface RoutineWithExercises extends Routine {
  exercises: RoutineExerciseWithDetails[];
  total_exercises?: number;
  estimated_duration_minutes?: number;
}

export interface RoutineExerciseWithDetails extends RoutineExerciseDB {
  exercise: Exercise;
  sets: ExerciseSet[];
}

// ==========================================
// TIPOS PARA FORMULARIOS
// ==========================================

export interface CreateRoutineFormData {
  name: string;
  description?: string;
  exercises: {
    exerciseId: string;
    order: number;
    notes?: string;
    sets: {
      reps: number;
      weight?: number;
      rir?: number;
      rest?: number;
    }[];
  }[];
}

export interface EditRoutineFormData extends CreateRoutineFormData {
  isPublic?: boolean;
  isTemplate?: boolean;
}
