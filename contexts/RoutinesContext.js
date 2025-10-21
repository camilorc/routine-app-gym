import React, { createContext, useContext, useState } from 'react';

const RoutinesContext = createContext();

export function RoutinesProvider({ children }) {
  const [routines, setRoutines] = useState([]);
  
  // Estado temporal para la rutina que se está creando
  const [draftRoutine, setDraftRoutine] = useState({
    name: '',
    description: '',
    exercises: [],
  });

  const addRoutine = (routine) => {
    setRoutines(prev => [...prev, routine]);
  };

  const updateRoutine = (id, updatedRoutine) => {
    setRoutines(prev => prev.map(r => r.id === id ? updatedRoutine : r));
  };

  const deleteRoutine = (id) => {
    setRoutines(prev => prev.filter(r => r.id !== id));
  };

  // Funciones para manejar el borrador de rutina
  const updateDraftRoutine = (updates) => {
    setDraftRoutine(prev => ({ ...prev, ...updates }));
  };

  const addExerciseToDraft = (exercise) => {
    setDraftRoutine(prev => ({
      ...prev,
      exercises: [...prev.exercises, exercise],
    }));
  };

  const updateDraftExercise = (index, exercise) => {
    setDraftRoutine(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => i === index ? exercise : ex),
    }));
  };

  const removeDraftExercise = (index) => {
    setDraftRoutine(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index),
    }));
  };

  const clearDraftRoutine = () => {
    setDraftRoutine({
      name: '',
      description: '',
      exercises: [],
    });
  };

  const loadRoutineForEditing = (routine) => {
    setDraftRoutine({
      id: routine.id,
      name: routine.name,
      description: routine.description,
      exercises: [...routine.exercises],
    });
  };

  const clearAllData = () => {
    setRoutines([]);
    setDraftRoutine({
      name: '',
      description: '',
      exercises: [],
    });
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

export function useRoutines() {
  const context = useContext(RoutinesContext);
  if (!context) {
    throw new Error('useRoutines must be used within a RoutinesProvider');
  }
  return context;
}
