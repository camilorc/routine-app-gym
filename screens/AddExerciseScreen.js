import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Animated, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';
import { searchExercises } from '../constants/exercises';

// Función para generar IDs únicos
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function AddExerciseScreen({ navigation, route }) {
  const isEditing = route.params?.isEditing || false;
  const exerciseToEdit = route.params?.exercise;

  const [searchQuery, setSearchQuery] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [series, setSeries] = useState([
    { id: generateId(), series: '', reps: '', weight: '', rir: '' },
  ]);
  const [restMinutes, setRestMinutes] = useState('');
  const [restSeconds, setRestSeconds] = useState('');
  
  // Estados para el modal de crear ejercicio
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingExercise, setIsEditingExercise] = useState(false);
  const [modalExerciseName, setModalExerciseName] = useState('');
  const [modalMuscleGroup, setModalMuscleGroup] = useState('');
  const [modalEquipment, setModalEquipment] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [overlayOpacity] = useState(new Animated.Value(0));
  
  // Estados para búsqueda de ejercicios
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Cargar datos del ejercicio si está en modo edición
  useEffect(() => {
    if (isEditing && exerciseToEdit) {
      setExerciseName(exerciseToEdit.name || '');
      setDescription(exerciseToEdit.description || '');
      
      // Cargar series con IDs
      if (exerciseToEdit.series && exerciseToEdit.series.length > 0) {
        setSeries(exerciseToEdit.series.map(s => ({
          ...s,
          id: s.id || generateId()
        })));
      }
      
      // Parsear tiempo de descanso
      if (exerciseToEdit.restTime) {
        const timeMatch = exerciseToEdit.restTime.match(/(\d+)m\s*(\d+)s/);
        if (timeMatch) {
          setRestMinutes(timeMatch[1]);
          setRestSeconds(timeMatch[2]);
        }
      }
    }
  }, [isEditing, exerciseToEdit]);

  // Animar overlay cuando se abre/cierra el modal
  useEffect(() => {
    if (isModalVisible) {
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);

  // Buscar ejercicios cuando cambia el query
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const results = searchExercises(searchQuery);
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSelectExercise = (exercise) => {
    // Limpiar el input de búsqueda
    setSearchQuery('');
    setExerciseName(exercise.name);
    
    // Agregar información del ejercicio a la descripción
    const details = [];
    if (exercise.muscleGroup) details.push(`Grupo muscular: ${exercise.muscleGroup}`);
    if (exercise.equipment) details.push(`Equipo: ${exercise.equipment}`);
    
    if (details.length > 0) {
      setDescription(details.join('\n'));
    }
    
    // Ocultar resultados y limpiar
    setShowSearchResults(false);
    setSearchResults([]);
  };

  const openModal = () => {
    setIsEditingExercise(false);
    setIsModalVisible(true);
  };

  const openModalForEdit = () => {
    setIsEditingExercise(true);
    
    // Cargar los datos del ejercicio actual en el modal
    setModalExerciseName(exerciseName);
    
    // Limpiar campos antes de parsear
    setModalMuscleGroup('');
    setModalEquipment('');
    setModalNotes('');
    
    // Parsear la descripción para extraer grupo muscular, equipo y notas
    if (description.trim()) {
      const descLines = description.split('\n');
      const notesLines = [];
      
      descLines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('Grupo muscular:')) {
          setModalMuscleGroup(trimmedLine.replace('Grupo muscular:', '').trim());
        } else if (trimmedLine.startsWith('Equipo:')) {
          setModalEquipment(trimmedLine.replace('Equipo:', '').trim());
        } else if (trimmedLine !== '') {
          notesLines.push(trimmedLine);
        }
      });
      
      if (notesLines.length > 0) {
        setModalNotes(notesLines.join('\n'));
      }
    }
    
    setIsModalVisible(true);
  };

  const closeModal = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      setIsEditingExercise(false);
      // Limpiar campos del modal
      setModalExerciseName('');
      setModalMuscleGroup('');
      setModalEquipment('');
      setModalNotes('');
    });
  };

  const handleSaveNewExercise = () => {
    if (modalExerciseName.trim() === '') {
      return;
    }
    
    // Guardar el ejercicio creado/editado
    setExerciseName(modalExerciseName.trim());
    
    // Siempre actualizar la descripción con los detalles
    const detailsArray = [];
    if (modalMuscleGroup.trim()) detailsArray.push(`Grupo muscular: ${modalMuscleGroup.trim()}`);
    if (modalEquipment.trim()) detailsArray.push(`Equipo: ${modalEquipment.trim()}`);
    if (modalNotes.trim()) detailsArray.push(modalNotes.trim());
    
    // Actualizar descripción (incluso si está vacía)
    setDescription(detailsArray.join('\n'));
    
    closeModal();
  };

  const addSeries = () => {
    const newSeries = {
      id: generateId(),
      series: '',
      reps: '',
      weight: '',
      rir: '',
    };
    setSeries([...series, newSeries]);
  };

  const deleteSeries = (id) => {
    if (series.length > 1) {
      setSeries(series.filter(serie => serie.id !== id));
    }
  };

  const updateSeriesField = (id, field, value) => {
    setSeries(series.map(serie => 
      serie.id === id ? { ...serie, [field]: value } : serie
    ));
  };

  // Verificar si la última serie tiene el campo serie completado
  const canAddSeries = series.length > 0 && series[series.length - 1].series.trim() !== '';

  // Validaciones para el botón "Añadir a la Rutina"
  const hasExerciseName = searchQuery.trim() !== '' || exerciseName.trim() !== '';
  const hasAtLeastOneSeries = series.length > 0 && series.some(serie => 
    serie.series.trim() !== '' || 
    serie.reps.trim() !== '' || 
    serie.weight.trim() !== '' || 
    serie.rir.trim() !== ''
  );
  const isAddToRoutineEnabled = hasExerciseName && hasAtLeastOneSeries;

  const handleAddToRoutine = () => {
    if (!isAddToRoutineEnabled) return;
    
    // Preparar el ejercicio con todos sus datos
    const finalExerciseName = searchQuery.trim() !== '' ? searchQuery : exerciseName.trim();
    const restTime = restMinutes || restSeconds 
      ? `${restMinutes || '0'}m ${restSeconds || '0'}s` 
      : null;
    
    const exercise = {
      name: finalExerciseName,
      description: description.trim(),
      series: series.filter(serie => 
        serie.series.trim() !== '' || 
        serie.reps.trim() !== '' || 
        serie.weight.trim() !== '' || 
        serie.rir.trim() !== ''
      ),
      restTime: restTime,
    };
    
    console.log('Ejercicio añadido a la rutina:', exercise);
    
    // Return the created/updated exercise via navigation params (serializable)
    // Set params and go back to CreateRoutine
    navigation.navigate({
      name: 'CreateRoutine',
      params: {
        newExercise: exercise,
        editIndex: route.params?.isEditing ? route.params?.exerciseIndex : undefined,
      },
      merge: true, // Merge params with existing screen
    });
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background.primary }}>
      {/* Header */}
      <View 
        className="flex-row items-center px-6 py-4 border-b"
        style={{ borderColor: colors.border.primary }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text 
          className="text-xl font-bold flex-1"
          style={{ color: colors.text.primary }}
        >
          {isEditing ? 'Editar Ejercicio' : 'Añadir Ejercicio'}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Buscador */}
        <View className="mt-6 mb-4">
          <View 
            className="rounded-xl px-4 py-3 flex-row items-center" 
            style={{ backgroundColor: colors.background.secondary, borderColor: colors.border.light, borderWidth: 1 }}
          >
            <Ionicons name="search-outline" size={20} color={colors.text.secondary} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar ejercicio"
              placeholderTextColor={colors.text.secondary}
              className="flex-1 ml-3 text-base"
              style={{ color: colors.text.primary }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => {
                setSearchQuery('');
                setSearchResults([]);
                setShowSearchResults(false);
              }}>
                <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Resultados de búsqueda */}
          {showSearchResults && searchResults.length > 0 && (
            <View 
              className="mt-2 rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.light,
                borderWidth: 1
              }}
            >
              {searchResults.map((exercise, index) => (
                <TouchableOpacity
                  key={exercise.id}
                  onPress={() => handleSelectExercise(exercise)}
                  className="px-4 py-3 flex-row items-center"
                  style={{
                    borderBottomWidth: index < searchResults.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border.light
                  }}
                >
                  <View className="flex-1">
                    <Text 
                      className="text-base font-medium mb-1"
                      style={{ color: colors.text.primary }}
                    >
                      {exercise.name}
                    </Text>
                    <Text 
                      className="text-xs"
                      style={{ color: colors.text.secondary }}
                    >
                      {exercise.muscleGroup} • {exercise.equipment}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* O crear un nuevo ejercicio */}
        <TouchableOpacity 
          onPress={openModal}
          className="mb-6 rounded-xl p-4 border-2 border-dashed flex-row items-center justify-center"
          style={{ borderColor: colors.border.light }}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.accent.primary} />
          <Text 
            className="text-base font-semibold ml-2"
            style={{ color: colors.accent.primary }}
          >
            Crear nuevo ejercicio
          </Text>
        </TouchableOpacity>

        {/* Nombre del ejercicio seleccionado */}
        {exerciseName ? (
          <TouchableOpacity 
            onPress={openModalForEdit}
            className="mb-4"
          >
            <View 
              className="text-xl font-bold rounded-xl px-4 py-3 flex-row items-center justify-between"
              style={{ 
                backgroundColor: colors.background.secondary, 
                borderColor: colors.border.light,
                borderWidth: 1
              }}
            >
              <Text 
                className="text-xl font-bold flex-1"
                style={{ color: colors.text.primary }}
              >
                {exerciseName}
              </Text>
              <Ionicons name="create-outline" size={20} color={colors.accent.primary} />
            </View>
          </TouchableOpacity>
        ) : null}

        {/* Descripción del ejercicio */}
        <View className="mb-6">
          <Text 
            className="text-sm mb-2 font-medium"
            style={{ color: colors.text.secondary }}
          >
            Descripción (opcional)
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Agrega notas o instrucciones sobre el ejercicio..."
            placeholderTextColor={colors.text.secondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="rounded-xl px-4 py-3 text-base h-28"
            style={{ 
              backgroundColor: colors.background.secondary, 
              color: colors.text.primary,
              borderColor: colors.border.light,
              borderWidth: 1
            }}
          />
        </View>

        {/* Tabla de series */}
        <View className="mb-6">
          <View 
            className="rounded-xl p-4"
            style={{ backgroundColor: colors.background.secondary }}
          >
            {/* Header de la tabla */}
            <View className="flex-row mb-3 items-center">
              <Text 
                className="text-xs font-semibold flex-1 text-center mx-1"
                style={{ color: colors.text.secondary }}
              >
                SERIES
              </Text>
              <Text 
                className="text-xs font-semibold flex-1 text-center mx-1"
                style={{ color: colors.text.secondary }}
              >
                REPS
              </Text>
              <Text 
                className="text-xs font-semibold flex-1 text-center mx-1"
                style={{ color: colors.text.secondary }}
              >
                PESO (KG)
              </Text>
              <Text 
                className="text-xs font-semibold flex-1 text-center mx-1"
                style={{ color: colors.text.secondary }}
              >
                RIR
              </Text>
              <View className="w-8" />
            </View>

            {/* Filas de series */}
            {series.map((serie, index) => (
              <View key={serie.id} className="flex-row mb-2 items-center">
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.series}
                    onChangeText={(value) => updateSeriesField(serie.id, 'series', value)}
                    keyboardType="numeric"
                    className="text-center rounded-lg py-2 w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1 }}
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.reps}
                    onChangeText={(value) => updateSeriesField(serie.id, 'reps', value)}
                    keyboardType="numeric"
                    className="text-center rounded-lg py-2 w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1 }}
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.weight}
                    onChangeText={(value) => updateSeriesField(serie.id, 'weight', value)}
                    keyboardType="numeric"
                    className="text-center rounded-lg py-2 w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1 }}
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.rir}
                    onChangeText={(value) => updateSeriesField(serie.id, 'rir', value)}
                    keyboardType="numeric"
                    className="text-center rounded-lg py-2 w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1 }}
                  />
                </View>
                {series.length > 1 ? (
                  <TouchableOpacity 
                    onPress={() => deleteSeries(serie.id)}
                    className="w-8 items-center"
                  >
                    <Ionicons name="trash-outline" size={20} color={colors.text.secondary} />
                  </TouchableOpacity>
                ) : (
                  <View className="w-8" />
                )}
              </View>
            ))}

            {/* Botón Añadir serie */}
            <TouchableOpacity
              onPress={addSeries}
              disabled={!canAddSeries}
              className="border-2 border-dashed rounded-xl py-3 mt-3"
              style={{
                borderColor: canAddSeries ? colors.border.secondary : colors.border.light,
                opacity: canAddSeries ? 1 : 0.5
              }}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons 
                  name="add" 
                  size={20} 
                  color={canAddSeries ? colors.accent.primary : colors.text.secondary} 
                />
                <Text 
                  className="ml-2 font-semibold"
                  style={{ color: canAddSeries ? colors.accent.primary : colors.text.secondary }}
                >
                  Añadir serie
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tiempo de Descanso */}
        <View className="mb-6">
          <Text 
            className="text-sm mb-3 font-medium"
            style={{ color: colors.text.secondary }}
          >
            Tiempo de Descanso
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <TextInput
                value={restMinutes}
                onChangeText={setRestMinutes}
                placeholder="Minutos"
                placeholderTextColor={colors.text.secondary}
                keyboardType="numeric"
                className="rounded-xl px-4 py-4 text-base text-center"
                style={{ 
                  backgroundColor: colors.background.secondary, 
                  color: colors.text.primary,
                  borderColor: colors.border.light,
                  borderWidth: 1
                }}
              />
            </View>
            <View className="flex-1">
              <TextInput
                value={restSeconds}
                onChangeText={setRestSeconds}
                placeholder="Segundos"
                placeholderTextColor={colors.text.secondary}
                keyboardType="numeric"
                className="rounded-xl px-4 py-4 text-base text-center"
                style={{ 
                  backgroundColor: colors.background.secondary, 
                  color: colors.text.primary,
                  borderColor: colors.border.light,
                  borderWidth: 1
                }}
              />
            </View>
          </View>
        </View>

        {/* Botón Añadir/Actualizar */}
        <TouchableOpacity
          onPress={handleAddToRoutine}
          disabled={!isAddToRoutineEnabled}
          className="rounded-xl p-4 mb-6"
          style={{ 
            backgroundColor: isAddToRoutineEnabled 
              ? (colors.accent.bright || colors.accent.primary)
              : colors.disabled || colors.background.tertiary,
            opacity: isAddToRoutineEnabled ? 1 : 0.5
          }}
        >
          <Text className="font-semibold text-center text-base" style={{ color: colors.background.primary }}>
            {isEditing ? 'Actualizar Ejercicio' : 'Añadir a la Rutina'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal para crear nuevo ejercicio */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View className="flex-1">
          <Animated.View 
            className="absolute inset-0"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              opacity: overlayOpacity 
            }}
          >
            <Pressable 
              className="flex-1"
              onPress={closeModal}
            />
          </Animated.View>
          
          <View
            className="rounded-b-3xl flex-1"
            style={{ 
              backgroundColor: colors.background.primary,
              marginTop: 50
            }}
          >
            {/* Header del modal con X */}
            <View className="flex-row items-center justify-between px-6 pt-6 pb-4 border-b" style={{ borderColor: colors.border.light }}>
              <Text className="text-xl font-bold flex-1" style={{ color: colors.text.primary }}>
                {isEditingExercise ? 'Editar Ejercicio' : 'Nuevo Ejercicio'}
              </Text>
              <TouchableOpacity
                onPress={closeModal}
                className="w-10 h-10 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.background.secondary }}
              >
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView className="px-6 flex-1" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
              {/* Nombre del ejercicio */}
              <View className="mb-4 mt-6">
                <Text 
                  className="text-sm mb-2 font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  Nombre del ejercicio *
                </Text>
                <TextInput
                  value={modalExerciseName}
                  onChangeText={setModalExerciseName}
                  placeholder="Ej: Press de banca"
                  placeholderTextColor={colors.text.secondary}
                  className="rounded-xl px-4 py-3 text-base"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1
                  }}
                />
              </View>

              {/* Grupo muscular */}
              <View className="mb-4">
                <Text 
                  className="text-sm mb-2 font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  Grupo muscular
                </Text>
                <TextInput
                  value={modalMuscleGroup}
                  onChangeText={setModalMuscleGroup}
                  placeholder="Ej: Pecho, Espalda, Piernas..."
                  placeholderTextColor={colors.text.secondary}
                  className="rounded-xl px-4 py-3 text-base"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1
                  }}
                />
              </View>

              {/* Equipo */}
              <View className="mb-4">
                <Text 
                  className="text-sm mb-2 font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  Equipo
                </Text>
                <TextInput
                  value={modalEquipment}
                  onChangeText={setModalEquipment}
                  placeholder="Ej: Barra, Mancuernas, Máquina..."
                  placeholderTextColor={colors.text.secondary}
                  className="rounded-xl px-4 py-3 text-base"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1
                  }}
                />
              </View>

              {/* Notas */}
              <View className="mb-4">
                <Text 
                  className="text-sm mb-2 font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  Notas (opcional)
                </Text>
                <TextInput
                  value={modalNotes}
                  onChangeText={setModalNotes}
                  placeholder="Agrega notas sobre técnica, consejos..."
                  placeholderTextColor={colors.text.secondary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="rounded-xl px-4 py-3 text-base h-24"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1
                  }}
                />
              </View>

              {/* Botón Guardar */}
              <TouchableOpacity
                onPress={handleSaveNewExercise}
                disabled={modalExerciseName.trim() === ''}
                className="rounded-xl p-4 mb-6"
                style={{ 
                  backgroundColor: modalExerciseName.trim() !== ''
                    ? (colors.accent.bright || colors.accent.primary)
                    : colors.disabled || colors.background.tertiary,
                  opacity: modalExerciseName.trim() !== '' ? 1 : 0.5
                }}
              >
                <Text className="font-semibold text-center text-base" style={{ color: colors.background.primary }}>
                  {isEditingExercise ? 'Actualizar Ejercicio' : 'Guardar Ejercicio'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
