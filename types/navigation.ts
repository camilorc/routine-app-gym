import { Routine } from './routine';
import { RoutineExercise } from './exercise';

/**
 * Tipos relacionados con la navegación de React Navigation
 */

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
