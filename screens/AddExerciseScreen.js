import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Función para generar IDs únicos
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export default function AddExerciseScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [exerciseName, setExerciseName] = useState('');
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
    <SafeAreaView className="flex-1 bg-[#0B0F0E]">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-gray-800">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">
          Añadir Ejercicio
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Buscador */}
        <View className="mt-6 mb-4">
          <View className="bg-gray-800 rounded-xl px-4 py-3 flex-row items-center">
            <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar ejercicio"
              placeholderTextColor={colors.textSecondary}
              className="flex-1 text-gray-100 ml-3 text-base"
            />
          </View>
        </View>

        {/* O crear un nuevo ejercicio */}
        <TouchableOpacity className="mb-6">
          <Text className="text-gray-400 text-center text-sm">
            O crea un nuevo ejercicio.
          </Text>
        </TouchableOpacity>

        {/* Nombre del ejercicio */}
        <View className="mb-4">
          <TextInput
            value={exerciseName}
            onChangeText={setExerciseName}
            placeholder="Nombre del ejercicio"
            placeholderTextColor={colors.textSecondary}
            className="bg-gray-800 text-white text-xl font-bold rounded-xl px-4 py-3"
          />
        </View>

        {/* Tabla de series */}
        <View className="mb-6">
          <View className="bg-gray-800 rounded-xl p-4">
            {/* Header de la tabla */}
            <View className="flex-row mb-3 items-center">
              <Text className="text-gray-400 text-xs font-semibold flex-1 text-center mx-1">
                SERIES
              </Text>
              <Text className="text-gray-400 text-xs font-semibold flex-1 text-center mx-1">
                REPS
              </Text>
              <Text className="text-gray-400 text-xs font-semibold flex-1 text-center mx-1">
                PESO (KG)
              </Text>
              <Text className="text-gray-400 text-xs font-semibold flex-1 text-center mx-1">
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
                    className="bg-gray-700 text-white text-center rounded-lg py-2 w-full text-base"
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.reps}
                    onChangeText={(value) => updateSeriesField(serie.id, 'reps', value)}
                    keyboardType="numeric"
                    className="bg-gray-700 text-white text-center rounded-lg py-2 w-full text-base"
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.weight}
                    onChangeText={(value) => updateSeriesField(serie.id, 'weight', value)}
                    keyboardType="numeric"
                    className="bg-gray-700 text-white text-center rounded-lg py-2 w-full text-base"
                  />
                </View>
                <View className="flex-1 items-center mx-1">
                  <TextInput
                    value={serie.rir}
                    onChangeText={(value) => updateSeriesField(serie.id, 'rir', value)}
                    keyboardType="numeric"
                    className="bg-gray-700 text-white text-center rounded-lg py-2 w-full text-base"
                  />
                </View>
                {series.length > 1 ? (
                  <TouchableOpacity 
                    onPress={() => deleteSeries(serie.id)}
                    className="w-8 items-center"
                  >
                    <Ionicons name="trash-outline" size={20} color="#9CA3AF" />
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
              className={`border-2 border-dashed rounded-xl py-3 mt-3 ${
                canAddSeries ? 'border-gray-600' : 'border-gray-700 opacity-50'
              }`}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons 
                  name="add" 
                  size={20} 
                  color={canAddSeries ? "#06D6A0" : "#6B7280"} 
                />
                <Text className={`ml-2 font-semibold ${
                  canAddSeries ? 'text-[#06D6A0]' : 'text-gray-500'
                }`}>
                  Añadir serie
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tiempo de Descanso */}
        <View className="mb-6">
          <Text className="text-gray-400 text-sm mb-3 font-medium">
            Tiempo de Descanso
          </Text>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <TextInput
                value={restMinutes}
                onChangeText={setRestMinutes}
                placeholder="Minutos"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base text-center"
              />
            </View>
            <View className="flex-1">
              <TextInput
                value={restSeconds}
                onChangeText={setRestSeconds}
                placeholder="Segundos"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
                className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base text-center"
              />
            </View>
          </View>
        </View>

        {/* Botón Añadir a la Rutina */}
        <TouchableOpacity
          onPress={handleAddToRoutine}
          className="bg-[#06D6A0] rounded-xl p-4 mb-6"
        >
          <Text className="text-[#0B0F0E] font-semibold text-center text-base">
            Añadir a la Rutina
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
