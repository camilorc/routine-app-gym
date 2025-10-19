import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, textStyles, containerStyles } from '../styles';
import { useRoutines } from '../contexts/RoutinesContext';

export default function RoutinesListScreen({ navigation, route }) {
  // Obtener rutinas del contexto
  const { routines } = useRoutines();

  const handleCreateRoutine = () => {
    navigation.navigate('CreateRoutine');
  };

  const handleRoutinePress = (routine) => {
    console.log('Rutina seleccionada:', routine);
    // Aquí navegarías a la pantalla de detalle/ejecución de rutina
  };

  return (
    <SafeAreaView className={containerStyles.screen} style={{ backgroundColor: colors.background.primary }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-2xl font-bold" style={{ color: colors.text.primary }}>
          Mis Rutinas
        </Text>
        <TouchableOpacity
          onPress={handleCreateRoutine}
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
        >
          <Ionicons name="add" size={24} color={colors.background.primary} />
        </TouchableOpacity>
      </View>

      {/* Lista de rutinas o mensaje vacío */}
      {routines.length === 0 ? (
        <View className="flex-1 justify-center items-center px-8">
          <View className="items-center mb-6">
            <View 
              className="w-24 h-24 rounded-full items-center justify-center mb-6"
              style={{ backgroundColor: colors.background.tertiary }}
            >
              <Ionicons name="barbell-outline" size={48} color={colors.text.tertiary} />
            </View>
            <Text className="text-2xl font-bold text-center mb-3" style={{ color: colors.text.primary }}>
              No tienes rutinas aún
            </Text>
            <Text className="text-base text-center leading-6 mb-6" style={{ color: colors.text.secondary }}>
              Crea tu primera rutina personalizada para comenzar tu entrenamiento
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={handleCreateRoutine}
            className="rounded-xl px-8 py-4 flex-row items-center"
            style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.background.primary} />
            <Text className="text-white font-semibold text-base ml-2">
              Crear Mi Primera Rutina
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-6">
          {routines.map((routine) => {
            // Calcular total de series
            const totalSeries = routine.exercises.reduce((total, exercise) => {
              return total + exercise.series.reduce((sum, serie) => sum + (parseInt(serie.series) || 0), 0);
            }, 0);

            return (
              <TouchableOpacity
                key={routine.id}
                onPress={() => handleRoutinePress(routine)}
                activeOpacity={0.7}
                className="rounded-2xl p-4 mb-4 flex-row items-center"
                style={{ backgroundColor: colors.background.secondary }}
              >
                {/* Icono/Imagen de la rutina */}
                <View 
                  className="w-16 h-16 rounded-xl items-center justify-center mr-4"
                  style={{ backgroundColor: colors.background.tertiary }}
                >
                  <Ionicons name="barbell" size={28} color={colors.accent.primary} />
                </View>

                {/* Información de la rutina */}
                <View className="flex-1">
                  <Text className="text-lg font-bold mb-1" style={{ color: colors.text.primary }}>
                    {routine.name}
                  </Text>
                  <Text 
                    className="text-sm mb-1" 
                    numberOfLines={2}
                    style={{ color: colors.text.secondary }}
                  >
                    {routine.description || 'Sin descripción'}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <View className="flex-row items-center mr-4">
                      <Ionicons name="fitness-outline" size={14} color={colors.text.tertiary} />
                      <Text className="text-xs ml-1" style={{ color: colors.text.tertiary }}>
                        {routine.exercises.length} ejercicio{routine.exercises.length !== 1 ? 's' : ''}
                      </Text>
                    </View>
                    {totalSeries > 0 && (
                      <View className="flex-row items-center">
                        <Ionicons name="barbell-outline" size={14} color={colors.text.tertiary} />
                        <Text className="text-xs ml-1" style={{ color: colors.text.tertiary }}>
                          {totalSeries} series
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Botón de play y menú */}
                <View className="flex-row items-center ml-2">
                  <TouchableOpacity
                    onPress={() => handleRoutinePress(routine)}
                    className="w-10 h-10 rounded-full items-center justify-center mr-2"
                    style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
                  >
                    <Ionicons name="play" size={20} color={colors.background.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => console.log('Menú de rutina:', routine.id)}
                    className="w-10 h-10 items-center justify-center"
                  >
                    <Ionicons name="ellipsis-vertical" size={20} color={colors.text.secondary} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
