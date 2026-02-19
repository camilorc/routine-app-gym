import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Animated, Pressable, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';
import { useRoutines } from '../contexts/RoutinesContext';
import { EQUIPMENT_CATEGORIES } from '../types/exercise';

// Función para generar IDs únicos
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Helper para formatear nombres de categorías de equipamiento
const formatEquipmentCategory = (category) => {
  const labels = {
    'barra': 'Barra',
    'mancuernas': 'Mancuernas',
    'maquina': 'Máquina',
    'peso_corporal': 'Peso Corporal',
    'cable': 'Cable',
    'bandas': 'Bandas',
    'kettlebell': 'Kettlebell',
    'otro': 'Otro'
  };
  return labels[category] || category;
};

// Validar si un ID es un UUID válido de Supabase
const isValidUUID = (id) => {
  if (!id || typeof id !== 'string') return false;
  // UUID format: 8-4-4-4-12 caracteres hexadecimales
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function AddExerciseScreen({ navigation, route }) {
  const { exercises, isLoadingExercises } = useRoutines();
  const isEditing = route.params?.isEditing || false;
  const exerciseToEdit = route.params?.exercise;

  // Log cuando se carguen los ejercicios
  useEffect(() => {
    if (!isLoadingExercises && exercises.length > 0) {
      console.log('📚 [EJERCICIOS] Maestro de ejercicios cargado:', exercises.length, 'ejercicios disponibles');
    }
  }, [isLoadingExercises, exercises]);

  const [searchQuery, setSearchQuery] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [series, setSeries] = useState([
    { id: generateId(), series: '', reps: '', weight: '', rir: '' },
  ]);
  const [restMinutes, setRestMinutes] = useState('');
  const [restSeconds, setRestSeconds] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState(null); // ID del ejercicio seleccionado de la lista
  const [isCustomExercise, setIsCustomExercise] = useState(false); // Si el ejercicio fue personalizado
  const [originalExerciseName, setOriginalExerciseName] = useState(null); // Nombre original del ejercicio para detectar cambios
  const [selectedExerciseData, setSelectedExerciseData] = useState(null); // Datos completos del ejercicio seleccionado
  
  // Estados para el modal de crear ejercicio
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingExercise, setIsEditingExercise] = useState(false);
  const [modalExerciseName, setModalExerciseName] = useState('');
  const [modalMuscleGroup, setModalMuscleGroup] = useState('');
  const [modalEquipmentText, setModalEquipmentText] = useState('');
  const [modalEquipmentCategory, setModalEquipmentCategory] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [overlayOpacity] = useState(new Animated.Value(0));
  
  // Estados para búsqueda de ejercicios
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Ref para el ScrollView del modal
  const modalScrollViewRef = useRef(null);

  // Cargar datos del ejercicio si está en modo edición
  useEffect(() => {
    if (isEditing && exerciseToEdit) {
      console.log('📝 [EDIT MODE] Cargando ejercicio:', exerciseToEdit);
      
      const exerciseName = exerciseToEdit.name || '';
      setExerciseName(exerciseName);
      setDescription(exerciseToEdit.description || '');
      
      // Guardar el nombre original para detectar cambios
      setOriginalExerciseName(exerciseName);
      console.log('📝 [EDIT MODE] Nombre original guardado:', exerciseName);
      
      // Cargar IDs del ejercicio - solo si son UUIDs válidos
      const exerciseId = exerciseToEdit.exerciseId || exerciseToEdit.basedOnExerciseId || null;
      const validId = isValidUUID(exerciseId) ? exerciseId : null;
      setSelectedExerciseId(validId);
      setIsCustomExercise(!!exerciseToEdit.basedOnExerciseId); // Es personalizado si tiene basedOnExerciseId
      
      // Guardar datos completos del ejercicio para el modal
      setSelectedExerciseData({
        ...exerciseToEdit,
        id: validId,
        name: exerciseName,
        equipment_category: exerciseToEdit.equipment_category || null,
        equipment_text: exerciseToEdit.equipment_text || null,
        muscle_group: exerciseToEdit.muscle_group || null,
      });
      
      // Cargar equipamiento en los estados del modal para edición
      if (exerciseToEdit.equipment_category) {
        setModalEquipmentCategory(exerciseToEdit.equipment_category);
      }
      if (exerciseToEdit.equipment_text) {
        setModalEquipmentText(exerciseToEdit.equipment_text);
      }
      if (exerciseToEdit.muscle_group) {
        setModalMuscleGroup(exerciseToEdit.muscle_group);
      }
      
      console.log('📝 [EDIT MODE] exerciseId:', exerciseToEdit.exerciseId);
      console.log('📝 [EDIT MODE] basedOnExerciseId:', exerciseToEdit.basedOnExerciseId);
      console.log('📝 [EDIT MODE] selectedExerciseId establecido:', validId);
      console.log('📝 [EDIT MODE] isCustomExercise:', !!exerciseToEdit.basedOnExerciseId);
      console.log('📝 [EDIT MODE] equipment_category:', exerciseToEdit.equipment_category);
      console.log('📝 [EDIT MODE] equipment_text:', exerciseToEdit.equipment_text);
      
      // Cargar series con IDs
      if (exerciseToEdit.series && exerciseToEdit.series.length > 0) {
        console.log('📝 [EDIT MODE] Cargando series:', JSON.stringify(exerciseToEdit.series));
        setSeries(exerciseToEdit.series.map(s => ({
          ...s,
          id: s.id || generateId()
        })));
      }
      
      // Parsear tiempo de descanso
      console.log('📝 [EDIT MODE] rest_minutes:', exerciseToEdit.rest_minutes);
      console.log('📝 [EDIT MODE] rest_seconds:', exerciseToEdit.rest_seconds);
      setRestMinutes(exerciseToEdit.rest_minutes ? exerciseToEdit.rest_minutes.toString() : '');
      setRestSeconds(exerciseToEdit.rest_seconds ? exerciseToEdit.rest_seconds.toString() : '');
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

  // Buscar ejercicios cuando cambia el query (filtrado local)
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      console.log('🔎 [SEARCH] Filtrando ejercicios locales:', searchQuery);
      const query = searchQuery.toLowerCase();
      const results = exercises.filter(exercise => 
        exercise.name.toLowerCase().includes(query) ||
        exercise.muscle_group?.toLowerCase().includes(query) ||
        exercise.equipment_text?.toLowerCase().includes(query) ||
        exercise.equipment_category?.toLowerCase().includes(query)
      ).slice(0, 10); // Limitar a 10 resultados
      
      console.log('🔎 [SEARCH] Resultados encontrados:', results.length);
      if (results.length > 0) {
        console.log('🔎 [SEARCH] Primer resultado:', results[0]);
      }
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery, exercises]);

  const handleSelectExercise = (exercise) => {
    console.log('🔍 [SELECT] Ejercicio seleccionado COMPLETO:', JSON.stringify(exercise, null, 2));
    
    // Limpiar el input de búsqueda
    setSearchQuery('');
    setExerciseName(exercise.name);
    
    // Guardar el ID solo si es un UUID válido de Supabase
    const validId = isValidUUID(exercise.id) ? exercise.id : null;
    setSelectedExerciseId(validId);
    setIsCustomExercise(false);
    
    // Guardar datos completos del ejercicio para cargarlos en el modal
    setSelectedExerciseData(exercise);
    
    console.log('🔍 [SELECT] ID del ejercicio:', exercise.id);
    console.log('🔍 [SELECT] Es UUID válido?', isValidUUID(exercise.id));
    console.log('🔍 [SELECT] selectedExerciseId establecido:', validId);
    console.log('🔍 [SELECT] equipment_category:', exercise.equipment_category);
    console.log('🔍 [SELECT] equipment_text:', exercise.equipment_text);
    console.log('🔍 [SELECT] Tiene equipment_category?', exercise.hasOwnProperty('equipment_category'));
    console.log('🔍 [SELECT] Tiene equipment_text?', exercise.hasOwnProperty('equipment_text'));
    
    // Agregar información del ejercicio a la descripción
    const details = [];
    if (exercise.muscle_group) details.push(`Grupo muscular: ${exercise.muscle_group}`);
    if (exercise.equipment_text) details.push(`Equipo: ${exercise.equipment_text}`);
    
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
    
    console.log('✏️ [MODAL EDIT] ========== ABRIENDO MODAL PARA EDITAR ==========');
    console.log('✏️ [MODAL EDIT] selectedExerciseData:', JSON.stringify(selectedExerciseData, null, 2));
    
    // Cargar datos del ejercicio seleccionado si existe
    if (selectedExerciseData) {
      console.log('✏️ [MODAL EDIT] Cargando datos del ejercicio:', selectedExerciseData);
      
      // Cargar grupo muscular
      if (selectedExerciseData.muscle_group) {
        setModalMuscleGroup(selectedExerciseData.muscle_group);
        console.log('✏️ [MODAL EDIT] Muscle group cargado:', selectedExerciseData.muscle_group);
      }
      
      // Cargar equipment_category
      if (selectedExerciseData.equipment_category) {
        setModalEquipmentCategory(selectedExerciseData.equipment_category);
        console.log('✏️ [MODAL EDIT] Equipment category cargado:', selectedExerciseData.equipment_category);
      } else {
        console.log('✏️ [MODAL EDIT] ⚠️ NO HAY equipment_category en selectedExerciseData');
      }
      
      // Cargar equipment_text
      if (selectedExerciseData.equipment_text) {
        setModalEquipmentText(selectedExerciseData.equipment_text);
        console.log('✏️ [MODAL EDIT] Equipment text cargado:', selectedExerciseData.equipment_text);
      } else {
        console.log('✏️ [MODAL EDIT] ⚠️ NO HAY equipment_text en selectedExerciseData');
      }
    } else {
      console.log('✏️ [MODAL EDIT] ⚠️ NO HAY selectedExerciseData - limpiando campos');
      // Si no hay datos del ejercicio seleccionado, limpiar campos
      setModalMuscleGroup('');
      setModalEquipmentText('');
      setModalEquipmentCategory('');
    }
    
    // Limpiar notas
    setModalNotes('');
    
    // Parsear la descripción para extraer notas adicionales
    if (description.trim()) {
      const descLines = description.split('\n');
      const notesLines = [];
      
      descLines.forEach(line => {
        const trimmedLine = line.trim();
        // Saltar las líneas de información del ejercicio
        if (!trimmedLine.startsWith('Grupo muscular:') && !trimmedLine.startsWith('Equipo:') && trimmedLine !== '') {
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
      setModalEquipmentText('');
      setModalEquipmentCategory('');
      setModalNotes('');
    });
  };

  const handleSaveNewExercise = () => {
    if (modalExerciseName.trim() === '') {
      return;
    }
    
    console.log('✏️ [MODAL] Guardando ejercicio personalizado:', modalExerciseName.trim());
    console.log('✏️ [MODAL] selectedExerciseId actual:', selectedExerciseId);
    
    // Guardar el ejercicio creado/editado
    setExerciseName(modalExerciseName.trim());
    
    // Marcar como ejercicio personalizado
    setIsCustomExercise(true);
    console.log('✏️ [MODAL] isCustomExercise establecido a true');
    
    // Actualizar selectedExerciseData con los nuevos valores
    const updatedExerciseData = {
      ...selectedExerciseData,
      name: modalExerciseName.trim(),
      muscle_group: modalMuscleGroup.trim() || null,
      equipment_text: modalEquipmentText.trim() || null,
      equipment_category: modalEquipmentCategory || null,
    };
    setSelectedExerciseData(updatedExerciseData);
    console.log('✏️ [MODAL] Datos del ejercicio actualizados:', updatedExerciseData);
    
    // Siempre actualizar la descripción con los detalles
    const detailsArray = [];
    if (modalMuscleGroup.trim()) detailsArray.push(`Grupo muscular: ${modalMuscleGroup.trim()}`);
    if (modalEquipmentText.trim()) detailsArray.push(`Equipo: ${modalEquipmentText.trim()}`);
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
  const hasExerciseName = exerciseName.trim() !== '';
  const hasAtLeastOneSeries = series.length > 0 && series.some(serie => 
    serie.series.trim() !== '' || 
    serie.reps.trim() !== '' || 
    serie.weight.trim() !== '' || 
    serie.rir.trim() !== ''
  );
  const isAddToRoutineEnabled = hasExerciseName && hasAtLeastOneSeries;

  const handleAddToRoutine = () => {
    if (!isAddToRoutineEnabled) return;
    
    console.log('\n💾 [SAVE] ========== GUARDANDO EJERCICIO ==========');
    console.log('💾 [SAVE] isEditing:', isEditing);
    console.log('💾 [SAVE] exerciseName actual:', exerciseName.trim());
    console.log('💾 [SAVE] originalExerciseName:', originalExerciseName);
    console.log('💾 [SAVE] selectedExerciseId:', selectedExerciseId);
    console.log('💾 [SAVE] isCustomExercise:', isCustomExercise);
    
    // Preparar el ejercicio con todos sus datos
    const finalExerciseName = searchQuery.trim() !== '' ? searchQuery : exerciseName.trim();
    const rest_minutes = restMinutes ? parseInt(restMinutes) : null;
    const rest_seconds = restSeconds ? parseInt(restSeconds) : null;
    
    // Determinar si el ejercicio fue modificado al editar
    let shouldUseAsBase = isCustomExercise;
    
    // Si estamos editando y el nombre cambió, debe convertirse en ejercicio personalizado
    if (isEditing && originalExerciseName && selectedExerciseId) {
      const nameChanged = finalExerciseName !== originalExerciseName;
      console.log('💾 [SAVE] Nombre cambió?', nameChanged, '("' + finalExerciseName + '" !== "' + originalExerciseName + '")');
      
      if (nameChanged && !isCustomExercise) {
        // Si tenía exerciseId directo y el nombre cambió, convertir a basedOnExerciseId
        shouldUseAsBase = true;
        console.log('💾 [SAVE] ⚡ Convirtiendo a ejercicio personalizado (nombre cambió)');
      }
    }
    
    console.log('💾 [SAVE] shouldUseAsBase:', shouldUseAsBase);
    console.log('💾 [SAVE] isValidUUID(selectedExerciseId):', isValidUUID(selectedExerciseId));
    
    // Determinar si debemos pasar exerciseId (ejercicio ya existe en BD) o basedOnExerciseId (nuevo personalizado)
    // Si el ejercicio YA es personalizado (exerciseToEdit.exerciseId existe), mantener su ID para actualizarlo
    const hasExistingCustomExerciseId = isEditing && exerciseToEdit && exerciseToEdit.exerciseId && !exerciseToEdit.basedOnExerciseId;
    
    const exercise = {
      name: finalExerciseName,
      description: description.trim(),
      series: series.filter(serie => 
        serie.series.trim() !== '' || 
        serie.reps.trim() !== '' || 
        serie.weight.trim() !== '' || 
        serie.rir.trim() !== ''
      ),
      rest_minutes: rest_minutes,
      rest_seconds: rest_seconds,
      // Si el ejercicio personalizado ya existe, pasar su ID para actualizarlo
      // Si no es personalizado, usar directamente el ID del ejercicio global
      // Si es nuevo personalizado, no pasar exerciseId
      exerciseId: (hasExistingCustomExerciseId || !shouldUseAsBase) && isValidUUID(selectedExerciseId) ? selectedExerciseId : undefined,
      // Si fue personalizado basado en otro, guardar referencia al ejercicio original
      basedOnExerciseId: shouldUseAsBase && !hasExistingCustomExerciseId && isValidUUID(selectedExerciseId) ? selectedExerciseId : undefined,
      // Incluir datos de equipamiento desde selectedExerciseData
      equipment_category: selectedExerciseData?.equipment_category || null,
      equipment_text: selectedExerciseData?.equipment_text || null,
      muscle_group: selectedExerciseData?.muscle_group || null,
    };
    
    console.log('💾 [SAVE] ✅ Ejercicio final:', exercise);
    console.log('💾 [SAVE] ========================================\n');
    
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
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
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

      <ScrollView 
        className="flex-1 px-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Buscador */}
        {!isEditing && (
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
                style={{ color: colors.text.primary, lineHeight: 20 }}
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
          {showSearchResults && (
            <View 
              className="mt-2 rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.light,
                borderWidth: 1
              }}
            >
              {searchResults.length > 0 ? (
                searchResults.map((exercise, index) => (
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
                        {exercise.muscle_group}{exercise.equipment_text ? ` • ${exercise.equipment_text}` : ''}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
                  </TouchableOpacity>
                ))
              ) : (
                <View className="px-4 py-3">
                  <Text 
                    className="text-base text-center"
                    style={{ color: colors.text.secondary }}
                  >
                    No se encontraron ejercicios
                  </Text>
                </View>
              )}
            </View>
          )}
          </View>
        )}

        {/* O crear un nuevo ejercicio */}
        {!isEditing && (
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
        )}

        {/* Nombre del ejercicio seleccionado */}
        {exerciseName ? (
          <TouchableOpacity 
            onPress={openModalForEdit}
            className={isEditing ? "mt-6 mb-4" : "mb-4"}
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
            className="rounded-xl px-4 text-base h-28"
            style={{ 
              backgroundColor: colors.background.secondary, 
              color: colors.text.primary,
              borderColor: colors.border.light,
              borderWidth: 1,
              lineHeight: 22,
              paddingTop: 12,
              paddingBottom: 12
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
                    className="text-center rounded-lg w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1, lineHeight: 20, paddingTop: 10, paddingBottom: 10 }}
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.reps}
                    onChangeText={(value) => updateSeriesField(serie.id, 'reps', value)}
                    keyboardType="numeric"
                    className="text-center rounded-lg w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1, lineHeight: 20, paddingTop: 10, paddingBottom: 10 }}
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.weight}
                    onChangeText={(value) => updateSeriesField(serie.id, 'weight', value)}
                    keyboardType="numeric"
                    className="text-center rounded-lg w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1, lineHeight: 20, paddingTop: 10, paddingBottom: 10 }}
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.rir}
                    onChangeText={(value) => updateSeriesField(serie.id, 'rir', value)}
                    keyboardType="numeric"
                    className="text-center rounded-lg w-full text-base"
                    style={{ backgroundColor: colors.background.secondary, color: colors.text.primary, borderColor: colors.border.light, borderWidth: 1, lineHeight: 20, paddingTop: 10, paddingBottom: 10 }}
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
                className="rounded-xl px-4 text-base text-center"
                style={{ 
                  backgroundColor: colors.background.secondary, 
                  color: colors.text.primary,
                  borderColor: colors.border.light,
                  borderWidth: 1,
                  lineHeight: 20,
                  paddingTop: 14,
                  paddingBottom: 14
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
                className="rounded-xl px-4 text-base text-center"
                style={{ 
                  backgroundColor: colors.background.secondary, 
                  color: colors.text.primary,
                  borderColor: colors.border.light,
                  borderWidth: 1,
                  lineHeight: 20,
                  paddingTop: 14,
                  paddingBottom: 14
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
            <KeyboardAvoidingView 
              className="flex-1"
              behavior="padding"
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
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

            <ScrollView 
              ref={modalScrollViewRef}
              className="px-6 flex-1" 
              showsVerticalScrollIndicator={false} 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 20 }}
            >
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
                  placeholder="Ej: Press Arnold"
                  placeholderTextColor={colors.text.secondary}
                  className="rounded-xl px-4 text-base"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1,
                    lineHeight: 20,
                    paddingTop: 14,
                    paddingBottom: 14
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
                  placeholder="Ej: Pecho"
                  placeholderTextColor={colors.text.secondary}
                  className="rounded-xl px-4 text-base"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1,
                    lineHeight: 20,
                    paddingTop: 14,
                    paddingBottom: 14
                  }}
                />
              </View>

              {/* Equipamiento (Grid de opciones) */}
              <View className="mb-4">
                <Text 
                  className="text-sm mb-2 font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  Equipamiento *
                </Text>
                <View className="flex-row flex-wrap -mx-1">
                  {EQUIPMENT_CATEGORIES.map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => setModalEquipmentCategory(category)}
                      className="px-3 py-2 rounded-lg m-1"
                      style={{
                        backgroundColor: modalEquipmentCategory === category 
                          ? (colors.accent.bright || colors.accent.primary)
                          : colors.background.secondary,
                        borderWidth: 2,
                        borderColor: modalEquipmentCategory === category 
                          ? (colors.accent.bright || colors.accent.primary)
                          : colors.border.light,
                        minWidth: '30%',
                      }}
                    >
                      <Text
                        className="text-sm font-semibold text-center"
                        style={{
                          color: modalEquipmentCategory === category 
                            ? colors.background.primary
                            : colors.text.primary,
                        }}
                      >
                        {formatEquipmentCategory(category)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Descripción del equipamiento */}
              <View className="mb-4">
                <Text 
                  className="text-sm mb-2 font-medium"
                  style={{ color: colors.text.secondary }}
                >
                  Descripción del equipamiento
                </Text>
                <TextInput
                  value={modalEquipmentText}
                  onChangeText={setModalEquipmentText}
                  placeholder="Ej: Barra olímpica 20kg, Mancuernas ajustables..."
                  placeholderTextColor={colors.text.secondary}
                  className="rounded-xl px-4 text-base"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1,
                    lineHeight: 20,
                    paddingTop: 14,
                    paddingBottom: 14
                  }}
                />
              </View>

              {/* Notas */}
              <View 
                className="mb-4"
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  // Guardar la posición del View de Notas
                  if (!modalScrollViewRef.current?.notesPosition) {
                    modalScrollViewRef.current = {
                      ...modalScrollViewRef.current,
                      notesPosition: layout.y
                    };
                  }
                }}
              >
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
                  onFocus={() => {
                    setTimeout(() => {
                      const yOffset = modalScrollViewRef.current?.notesPosition || 0;
                      modalScrollViewRef.current?.scrollTo({ 
                        y: yOffset - 50, 
                        animated: true 
                      });
                    }, 300);
                  }}
                  className="rounded-xl px-4 text-base h-24"
                  style={{ 
                    backgroundColor: colors.background.secondary, 
                    color: colors.text.primary,
                    borderColor: colors.border.light,
                    borderWidth: 1,
                    lineHeight: 22,
                    paddingTop: 12,
                    paddingBottom: 12
                  }}
                />
              </View>

              {/* Botón Guardar */}
              <TouchableOpacity
                onPress={handleSaveNewExercise}
                disabled={modalExerciseName.trim() === '' || modalEquipmentCategory === ''}
                className="rounded-xl p-4 mb-6"
                style={{ 
                  backgroundColor: modalExerciseName.trim() !== '' && modalEquipmentCategory !== ''
                    ? (colors.accent.bright || colors.accent.primary)
                    : colors.disabled || colors.background.tertiary,
                  opacity: modalExerciseName.trim() !== '' && modalEquipmentCategory !== '' ? 1 : 0.5
                }}
              >
                <Text className="font-semibold text-center text-base" style={{ color: colors.background.primary }}>
                  {isEditingExercise ? 'Actualizar Ejercicio' : 'Guardar Ejercicio'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
