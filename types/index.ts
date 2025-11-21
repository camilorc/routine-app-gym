// Tipos para ejercicios
export interface Exercise {
  id: number | string;
  name: string;
  muscleGroup: string;
  equipment: string;
}

export interface ExerciseSerie {
  series: string;
  reps: string;
  weight: string;
}

export interface RoutineExercise {
  name: string;
  description: string;
  series: ExerciseSerie[];
  restTime?: string;
}

// Tipos para rutinas
export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: RoutineExercise[];
  createdAt: string;
  updatedAt?: string;
}

export interface DraftRoutine {
  id?: string;
  name: string;
  description: string;
  exercises: RoutineExercise[];
}

// Tipos para autenticación
export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    display_name?: string;
  };
}

export interface Session {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
}

// Tipos para contexto de rutinas
export interface RoutinesContextType {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  updateRoutine: (id: string, routine: Routine) => void;
  deleteRoutine: (id: string) => void;
  draftRoutine: DraftRoutine;
  updateDraftRoutine: (updates: Partial<DraftRoutine>) => void;
  addExerciseToDraft: (exercise: RoutineExercise) => void;
  updateDraftExercise: (index: number, exercise: RoutineExercise) => void;
  removeDraftExercise: (index: number) => void;
  clearDraftRoutine: () => Promise<void>;
  loadRoutineForEditing: (routine: Routine) => void;
  clearAllData: () => Promise<void>;
}

// Tipos para navegación
export type RootStackParamList = {
  MainTabs: undefined;
  Auth: undefined;
};

export type TabParamList = {
  Home: undefined;
  RoutinesList: undefined;
  Account: undefined;
};

export type RoutinesStackParamList = {
  RoutinesList: undefined;
  CreateRoutine: { routineToEdit?: Routine };
  AddExercise: { 
    exercise?: RoutineExercise;
    exerciseIndex?: number;
    isEditing?: boolean;
  };
};

export type AuthStackParamList = {
  AuthContainer: undefined;
  Login: undefined;
  Register: undefined;
};
