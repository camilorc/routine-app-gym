import { Routine, DraftRoutine } from './routine';
import { RoutineExercise, Exercise } from './exercise';

/**
 * Tipos relacionados con el contexto de rutinas
 */

export interface RoutinesContextType {
  routines: Routine[];
  exercises: Exercise[];
  addRoutine: (draft: DraftRoutine) => Promise<void>;
  updateRoutine: (id: string, draft: DraftRoutine) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
  draftRoutine: DraftRoutine;
  updateDraftRoutine: (updates: Partial<DraftRoutine>) => void;
  addExerciseToDraft: (exercise: RoutineExercise) => void;
  updateDraftExercise: (index: number, exercise: RoutineExercise) => void;
  removeDraftExercise: (index: number) => void;
  clearDraftRoutine: () => Promise<void>;
  loadRoutineForEditing: (routine: Routine) => void;
  clearAllData: () => Promise<void>;
  draftToRoutine: (draft: DraftRoutine, userId: string) => Routine;
  isLoadingRoutines: boolean;
  isLoadingExercises: boolean;
  error: string | null;
  refreshRoutines: () => Promise<void>;
}
