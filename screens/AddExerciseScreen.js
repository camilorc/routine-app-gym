import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

// Función para generar IDs únicos
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function AddExerciseScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [description, setDescription] = useState('');
  const [series, setSeries] = useState([
    { id: generateId(), series: '', reps: '', weight: '', rir: '' },
  ]);
  const [restMinutes, setRestMinutes] = useState('');
  const [restSeconds, setRestSeconds] = useState('');

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

  const handleAddToRoutine = () => {
    console.log('Añadir ejercicio a la rutina');
    navigation.goBack();
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
          Añadir Ejercicio
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
          </View>
        </View>

        {/* O crear un nuevo ejercicio */}
        <TouchableOpacity className="mb-6">
          <Text 
            className="text-center text-sm"
            style={{ color: colors.text.secondary }}
          >
            O crea un nuevo ejercicio.
          </Text>
        </TouchableOpacity>

        {/* Nombre del ejercicio */}
        <View className="mb-4">
          <TextInput
            value={exerciseName}
            onChangeText={setExerciseName}
            placeholder="Nombre del ejercicio"
            placeholderTextColor={colors.text.secondary}
            className="text-xl font-bold rounded-xl px-4 py-3"
            style={{ 
              backgroundColor: colors.background.secondary, 
              color: colors.text.primary,
              borderColor: colors.border.light,
              borderWidth: 1
            }}
          />
        </View>

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

        {/* Botón Añadir a la Rutina */}
        <TouchableOpacity
          onPress={handleAddToRoutine}
          className="rounded-xl p-4 mb-6"
          style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
        >
          <Text className="text-white font-semibold text-center text-base">
            Añadir a la Rutina
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
