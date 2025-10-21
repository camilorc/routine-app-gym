import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { useRoutines } from '../contexts/RoutinesContext';
import { colors, textStyles, inputStyles, buttonStyles, containerStyles } from '../styles';

export default function CreateRoutineScreen({ navigation, route }) {
  const { user } = useAuth();
  const { 
    addRoutine, 
    updateRoutine,
    draftRoutine, 
    updateDraftRoutine,
    addExerciseToDraft,
    updateDraftExercise,
    removeDraftExercise,
    clearDraftRoutine,
    loadRoutineForEditing,
  } = useRoutines();
  
  const processedExerciseRef = useRef(null); // Referencia para evitar procesar dos veces
  const [isEditMode, setIsEditMode] = useState(false);

  // Cargar rutina para editar si viene en los parámetros
  useEffect(() => {
    const routineToEdit = route.params?.routineToEdit;
    if (routineToEdit) {
      console.log('Cargando rutina para editar:', routineToEdit);
      loadRoutineForEditing(routineToEdit);
      setIsEditMode(true);
      // Limpiar el parámetro
      navigation.setParams({ routineToEdit: undefined });
    }
  }, [route.params?.routineToEdit]);

  useEffect(() => {
    const newExercise = route.params?.newExercise;
    const editIndex = route.params?.editIndex;
    
    console.log('CreateRoutine - useEffect triggered');
    console.log('newExercise:', newExercise);
    console.log('editIndex:', editIndex);
    console.log('Current exercises from Context:', draftRoutine.exercises);
    
    // Solo procesar si hay un ejercicio nuevo y no lo hemos procesado ya
    if (newExercise) {
      const exerciseKey = JSON.stringify(newExercise);
      
      // Evitar procesar el mismo ejercicio dos veces
      if (processedExerciseRef.current === exerciseKey) {
        console.log('Ejercicio ya procesado, saltando...');
        return;
      }
      
      processedExerciseRef.current = exerciseKey;
      
      if (typeof editIndex === 'number') {
        console.log('Editando ejercicio en índice:', editIndex);
        updateDraftExercise(editIndex, newExercise);
      } else {
        console.log('Agregando nuevo ejercicio');
        addExerciseToDraft(newExercise);
      }
      
      // Limpiar params después de un breve delay para evitar re-ejecución
      setTimeout(() => {
        navigation.setParams({ newExercise: undefined, editIndex: undefined });
      }, 100);
    }
  }, [route.params?.newExercise, route.params?.editIndex]);

  const handleAddExercises = () => navigation.navigate('AddExercise');
  const handleEditExercise = (index) => navigation.navigate('AddExercise', { exercise: draftRoutine.exercises[index], exerciseIndex: index, isEditing: true });
  const handleRemoveExercise = (index) => removeDraftExercise(index);

  const hasRoutineName = draftRoutine.name.trim() !== '';
  const hasExercises = draftRoutine.exercises.length > 0;
  const isCreateRoutineEnabled = hasRoutineName && hasExercises;

  const handleCreateRoutine = () => {
    if (!isCreateRoutineEnabled) return;
    
    if (isEditMode && draftRoutine.id) {
      // Actualizar rutina existente
      const updatedRoutine = {
        ...draftRoutine,
        name: draftRoutine.name.trim(),
        description: draftRoutine.description.trim(),
        updatedAt: new Date().toISOString(),
      };
      
      updateRoutine(draftRoutine.id, updatedRoutine);
      console.log('Rutina actualizada:', updatedRoutine);
    } else {
      // Crear nueva rutina
      const newRoutine = {
        id: Date.now().toString(),
        name: draftRoutine.name.trim(),
        description: draftRoutine.description.trim(),
        exercises: draftRoutine.exercises,
        createdAt: new Date().toISOString(),
      };
      
      addRoutine(newRoutine);
      console.log('Rutina creada:', newRoutine);
    }
    
    // Limpiar borrador y referencia
    clearDraftRoutine();
    processedExerciseRef.current = null;
    setIsEditMode(false);
    
    // Navegar de vuelta a RoutinesList
    navigation.navigate('RoutinesList');
  };

  return (
    <SafeAreaView className={containerStyles.screen} style={{ backgroundColor: colors.background.primary }}>
      {user ? (
        <ScrollView className="flex-1 px-6 pt-6">
          {/* Header con botón atrás */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => {
                clearDraftRoutine();
                setIsEditMode(false);
                navigation.navigate('RoutinesList');
              }}
              className="mr-4 -ml-2"
            >
              <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
            </TouchableOpacity>
            <Text className={textStyles.h2}>{isEditMode ? 'Editar Rutina' : 'Nueva Rutina'}</Text>
          </View>

          <View className={inputStyles.base.container}>
            <Text className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>Nombre de la rutina</Text>
            <TextInput
              value={draftRoutine.name}
              onChangeText={(text) => updateDraftRoutine({ name: text })}
              placeholder="Ej: Rutina de Fuerza"
              placeholderTextColor={colors.text.secondary}
              className={inputStyles.base.input}
              style={{ color: colors.text.primary, backgroundColor: colors.background.secondary, borderColor: colors.border.light }}
            />
          </View>

          <View className={inputStyles.textarea.container}>
            <Text className="text-sm font-medium mb-2" style={{ color: colors.text.secondary }}>Descripción</Text>
            <TextInput
              value={draftRoutine.description}
              onChangeText={(text) => updateDraftRoutine({ description: text })}
              placeholder="Describe tu rutina..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className={inputStyles.textarea.input}
              style={{ color: colors.text.primary, backgroundColor: colors.background.secondary, borderColor: colors.border.light }}
            />
          </View>

          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className={textStyles.h4}>Ejercicios</Text>
              {draftRoutine.exercises.length > 0 && (
                <View className="px-3 py-1 rounded-full" style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}>
                  <Text className="text-white text-sm font-semibold">{draftRoutine.exercises.length}</Text>
                </View>
              )}
            </View>

            {draftRoutine.exercises.length > 0 && (
              <View className="mb-4">
                {draftRoutine.exercises.map((exercise, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleEditExercise(index)}
                    activeOpacity={0.7}
                    className="rounded-xl p-4 mb-3 flex-row items-center justify-between"
                    style={{ backgroundColor: colors.background.secondary, borderColor: colors.border.light, borderWidth: 1 }}
                  >
                    <View className="flex-1">
                      <Text className="text-base font-semibold mb-1" style={{ color: colors.text.primary }}>{exercise.name}</Text>
                      <View className="flex-row items-center gap-3">
                        <View className="flex-row items-center">
                          <Ionicons name="barbell-outline" size={14} color={colors.text.secondary} />
                          <Text className="text-sm ml-1" style={{ color: colors.text.secondary }}>
                            {exercise.series.reduce((total, serie) => total + (parseInt(serie.series) || 0), 0)} series
                          </Text>
                        </View>
                        {exercise.restTime && (
                          <View className="flex-row items-center">
                            <Ionicons name="time-outline" size={14} color={colors.text.secondary} />
                            <Text className="text-sm ml-1" style={{ color: colors.text.secondary }}>{exercise.restTime}</Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity onPress={(e) => { e.stopPropagation(); handleRemoveExercise(index); }} className="ml-3 p-2">
                      <Ionicons name="trash-outline" size={20} color={colors.text.secondary} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <TouchableOpacity
              onPress={handleAddExercises}
              className="border-2 border-dashed rounded-xl p-6 items-center"
              style={{ backgroundColor: colors.background.secondary, borderColor: colors.border.secondary }}
            >
              <View className="w-16 h-16 rounded-full items-center justify-center mb-3" style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}>
                <Ionicons name="add" size={32} color={colors.background.primary} />
              </View>
              <Text className="text-base font-semibold mb-1" style={{ color: colors.text.primary }}>Añadir Ejercicios</Text>
              <Text className="text-sm text-center" style={{ color: colors.text.secondary }}>
                {draftRoutine.exercises.length === 0 ? 'Comienza a construir tu rutina añadiendo ejercicios.' : `Tienes ${draftRoutine.exercises.length} ejercicio${draftRoutine.exercises.length > 1 ? 's' : ''} añadido${draftRoutine.exercises.length > 1 ? 's' : ''}. Añade más.`}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleCreateRoutine}
            disabled={!isCreateRoutineEnabled}
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: isCreateRoutineEnabled ? (colors.accent.bright || colors.accent.primary) : colors.disabled || colors.background.tertiary, opacity: isCreateRoutineEnabled ? 1 : 0.5 }}
          >
            <Text className="text-white font-semibold text-center text-base">
              {isEditMode ? 'Guardar Cambios' : 'Crear Rutina'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.background.tertiary }}>
              <Ionicons name="lock-closed" size={40} color={colors.text.tertiary} />
            </View>
            <Text className={`text-2xl font-bold text-center mb-2 ${textStyles.h2}`}>Funcionalidad Exclusiva</Text>
            <Text className="text-lg text-center leading-6 mb-6" style={{ color: colors.text.secondary }}>Para crear rutinas necesitas una cuenta</Text>
          </View>

          <View className="rounded-xl p-6 w-full" style={{ backgroundColor: colors.accent.primary }}>
            <View className="items-center">
              <Ionicons name="person-add" size={24} color={colors.background.primary} className="mb-2" />
              <Text className="text-lg font-bold mb-1" style={{ color: colors.background.primary }}>¡Regístrate ahora!</Text>
              <Text className="text-center text-sm opacity-80" style={{ color: colors.background.primary }}>Crea tu cuenta gratuita y comienza a diseñar rutinas personalizadas</Text>
            </View>
          </View>

          <Text className="text-sm text-center mt-6 px-4" style={{ color: colors.text.secondary }}>Ve a la pestaña "Mi Cuenta" para registrarte o iniciar sesión</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
