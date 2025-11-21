import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine, DraftRoutine, RoutinesContextType, RoutineExercise } from '../types';

const RoutinesContext = createContext<RoutinesContextType | undefined>(undefined);

const DRAFT_STORAGE_KEY = '@strongo_draft_routine';

interface RoutinesProviderProps {
  children: ReactNode;
}

export function RoutinesProvider({ children }: RoutinesProviderProps) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoadingDraft, setIsLoadingDraft] = useState<boolean>(true);
  
  // Estado temporal para la rutina que se está creando
  const [draftRoutine, setDraftRoutine] = useState<DraftRoutine>({
    name: '',
    description: '',
    exercises: [],
  });

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

  const addRoutine = (routine: Routine): void => {
    setRoutines(prev => [...prev, routine]);
  };

  const updateRoutine = (id: string, updatedRoutine: Routine): void => {
    setRoutines(prev => prev.map(r => r.id === id ? updatedRoutine : r));
  };

  const deleteRoutine = (id: string): void => {
    setRoutines(prev => prev.filter(r => r.id !== id));
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
      name: routine.name,
      description: routine.description,
      exercises: [...routine.exercises],
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
