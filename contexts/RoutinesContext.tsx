import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine, DraftRoutine, RoutinesContextType, RoutineExercise, Exercise } from '../types';
import { RoutineService, ExerciseService } from '../services';
import { useAuth } from '../auth/AuthContext';

const RoutinesContext = createContext<RoutinesContextType | undefined>(undefined);

const DRAFT_STORAGE_KEY = '@strongo_draft_routine';

interface RoutinesProviderProps {
  children: ReactNode;
}

export function RoutinesProvider({ children }: RoutinesProviderProps) {
  const { user } = useAuth();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoadingDraft, setIsLoadingDraft] = useState<boolean>(true);
  const [isLoadingRoutines, setIsLoadingRoutines] = useState<boolean>(false);
  const [isLoadingExercises, setIsLoadingExercises] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estado temporal para la rutina que se está creando
  const [draftRoutine, setDraftRoutine] = useState<DraftRoutine>({
    name: '',
    description: '',
    exercises: [],
  });

  // Cargar ejercicios globales una sola vez al iniciar
  useEffect(() => {
    loadGlobalExercises();
  }, []);

  // Cargar rutinas del usuario desde Supabase
  useEffect(() => {
    if (user?.id) {
      loadUserRoutines();
    } else {
      setRoutines([]);
    }
  }, [user?.id]);

  // Cargar borrador guardado al iniciar
  useEffect(() => {
    loadDraftFromStorage();
  }, []);

  // Guardar borrador automáticamente cuando cambie
  useEffect(() => {
    if (!isLoadingDraft) {
      saveDraftToStorage();
    }
  }, [draftRoutine, isLoadingDraft]);

  // Cargar ejercicios globales (solo una vez)
  const loadGlobalExercises = async () => {
    setIsLoadingExercises(true);
    try {
      console.log('📚 [CONTEXT] Cargando ejercicios globales desde Supabase...');
      const globalExercises = await ExerciseService.getGlobalExercises();
      console.log('📚 [CONTEXT] Ejercicios cargados:', globalExercises.length);
      setExercises(globalExercises);
    } catch (error) {
      console.error('Error al cargar ejercicios:', error);
      setExercises([]);
    } finally {
      setIsLoadingExercises(false);
    }
  };

  // Cargar rutinas del usuario
  const loadUserRoutines = async () => {
    if (!user?.id) return;
    
    setIsLoadingRoutines(true);
    setError(null);
    try {
      const userRoutines = await RoutineService.getUserRoutines(user.id);
      setRoutines(userRoutines);
    } catch (error) {
      console.error('Error al cargar rutinas:', error);
      setError('Error al cargar rutinas. Por favor intenta de nuevo.');
    } finally {
      setIsLoadingRoutines(false);
    }
  };

  const loadDraftFromStorage = async () => {
    try {
      const savedDraft = await AsyncStorage.getItem(DRAFT_STORAGE_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        // Solo cargar si tiene contenido
        if (parsed.name || parsed.description || parsed.exercises?.length > 0) {
          setDraftRoutine(parsed);
        }
      }
    } catch (error) {
      console.error('Error al cargar borrador:', error);
    } finally {
      setIsLoadingDraft(false);
    }
  };

  const saveDraftToStorage = async () => {
    try {
      await AsyncStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftRoutine));
    } catch (error) {
      console.error('Error al guardar borrador:', error);
    }
  };

  // Helper para convertir DraftRoutine a Routine completo
  const draftToRoutine = (draft: DraftRoutine, userId: string): Routine => {
    const now = new Date().toISOString();
    return {
      id: draft.id || Date.now().toString(),
      user_id: draft.user_id || userId,
      name: draft.name,
      description: draft.description || null,
      exercises: draft.exercises,
      is_public: draft.is_public || false,
      is_template: draft.is_template || false,
      cloned_from_routine_id: null,
      is_modified: false,
      created_at: now,
      updated_at: now,
    };
  };

  const addRoutine = async (draft: DraftRoutine): Promise<void> => {
    if (!user?.id) {
      throw new Error('Usuario no autenticado');
    }

    setError(null);
    try {
      const newRoutine = await RoutineService.createRoutine(draft, user.id);
      setRoutines(prev => [...prev, newRoutine]);
      await clearDraftRoutine();
    } catch (error) {
      console.error('Error al crear rutina:', error);
      setError('Error al crear rutina. Por favor intenta de nuevo.');
      throw error;
    }
  };

  const updateRoutine = async (id: string, draft: DraftRoutine): Promise<void> => {
    if (!user?.id) {
      throw new Error('Usuario no autenticado');
    }

    setError(null);
    try {
      const updatedRoutine = await RoutineService.updateRoutine(id, draft);
      setRoutines(prev => prev.map(r => r.id === id ? updatedRoutine : r));
      await clearDraftRoutine();
    } catch (error) {
      console.error('Error al actualizar rutina:', error);
      setError('Error al actualizar rutina. Por favor intenta de nuevo.');
      throw error;
    }
  };

  const deleteRoutine = async (id: string): Promise<void> => {
    setError(null);
    try {
      await RoutineService.deleteRoutine(id);
      setRoutines(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error al eliminar rutina:', error);
      setError('Error al eliminar rutina. Por favor intenta de nuevo.');
      throw error;
    }
  };

  // Funciones para manejar el borrador de rutina
  const updateDraftRoutine = (updates: Partial<DraftRoutine>): void => {
    setDraftRoutine(prev => ({ ...prev, ...updates }));
  };

  const addExerciseToDraft = (exercise: RoutineExercise): void => {
    setDraftRoutine(prev => ({
      ...prev,
      exercises: [...prev.exercises, exercise],
    }));
  };

  const updateDraftExercise = (index: number, exercise: RoutineExercise): void => {
    setDraftRoutine(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => i === index ? exercise : ex),
    }));
  };

  const removeDraftExercise = (index: number): void => {
    setDraftRoutine(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const clearDraftRoutine = async (): Promise<void> => {
    setDraftRoutine({
      name: '',
      description: '',
      exercises: [],
    });
    // Limpiar también del almacenamiento
    try {
      await AsyncStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (error) {
      console.error('Error al limpiar borrador:', error);
    }
  };

  const loadRoutineForEditing = (routine: Routine): void => {
    setDraftRoutine({
      id: routine.id,
      user_id: routine.user_id,
      name: routine.name,
      description: routine.description || '',
      exercises: [...routine.exercises],
      is_public: routine.is_public,
      is_template: routine.is_template,
    });
  };

  const clearAllData = async () => {
    setRoutines([]);
    setDraftRoutine({
      name: '',
      description: '',
      exercises: [],
    });
    // Limpiar también del almacenamiento
    try {
      await AsyncStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (error) {
      console.error('Error al limpiar datos:', error);
    }
  };

  return (
    <RoutinesContext.Provider value={{ 
      routines,
      exercises,
      addRoutine, 
      updateRoutine, 
      deleteRoutine,
      draftRoutine,
      updateDraftRoutine,
      addExerciseToDraft,
      updateDraftExercise,
      removeDraftExercise,
      clearDraftRoutine,
      loadRoutineForEditing,
      clearAllData,
      draftToRoutine,
      isLoadingRoutines,
      isLoadingExercises,
      error,
      refreshRoutines: loadUserRoutines,
    }}>
      {children}
    </RoutinesContext.Provider>
  );
}

export function useRoutines(): RoutinesContextType {
  const context = useContext(RoutinesContext);
  if (!context) {
    throw new Error('useRoutines must be used within a RoutinesProvider');
  }
  return context;
}
