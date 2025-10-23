import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { colors, textStyles, containerStyles } from '../styles';

export default function ExercisesScreen({ navigation }) {
  const { user } = useAuth();

  const handleAddExercise = () => {
    // TODO: Navegar a pantalla de crear ejercicio
    console.log('Agregar nuevo ejercicio');
  };

  return (
    <SafeAreaView className={containerStyles.screen} style={{ backgroundColor: colors.background.primary }}>
      {user ? (
        <>
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <Text className="text-2xl font-bold" style={{ color: colors.text.primary }}>
              Ejercicios
            </Text>
            <TouchableOpacity
              onPress={handleAddExercise}
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
            >
              <Ionicons name="add" size={24} color={colors.background.primary} />
            </TouchableOpacity>
          </View>

          {/* Mensaje vacío */}
          <View className="flex-1 justify-center items-center px-8">
            <View className="items-center mb-6">
              <View 
                className="w-24 h-24 rounded-full items-center justify-center mb-6"
                style={{ backgroundColor: colors.background.tertiary }}
              >
                <Ionicons name="barbell-outline" size={48} color={colors.text.tertiary} />
              </View>
              <Text className="text-2xl font-bold text-center mb-3" style={{ color: colors.text.primary }}>
                No tienes ejercicios aún
              </Text>
              <Text className="text-base text-center leading-6 mb-6" style={{ color: colors.text.secondary }}>
                Crea tu primer ejercicio personalizado para usar en tus rutinas
              </Text>
            </View>
            
            <TouchableOpacity
              onPress={handleAddExercise}
              className="rounded-xl px-8 py-4 flex-row items-center"
              style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
            >
              <Ionicons name="add-circle-outline" size={24} color={colors.background.primary} />
              <Text className="font-semibold text-base ml-2" style={{ color: colors.background.primary }}>
                Crear Mi Primer Ejercicio
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.background.tertiary }}>
              <Ionicons name="lock-closed" size={40} color={colors.text.tertiary} />
            </View>
            <Text className="text-2xl font-bold text-center mb-2" style={{ color: colors.text.primary }}>Funcionalidad Exclusiva</Text>
            <Text className="text-lg text-center leading-6 mb-6" style={{ color: colors.text.secondary }}>Para crear ejercicios necesitas una cuenta</Text>
          </View>

          <View className="rounded-xl p-6 w-full" style={{ backgroundColor: colors.accent.primary }}>
            <View className="items-center">
              <Ionicons name="person-add" size={24} color={colors.background.primary} className="mb-2" />
              <Text className="text-lg font-bold mb-1" style={{ color: colors.background.primary }}>¡Regístrate ahora!</Text>
              <Text className="text-center text-sm opacity-80" style={{ color: colors.background.primary }}>Crea tu cuenta gratuita y comienza a diseñar ejercicios personalizados</Text>
            </View>
          </View>

          <Text className="text-sm text-center mt-6 px-4" style={{ color: colors.text.secondary }}>Ve a la pestaña "Mi Cuenta" para registrarte o iniciar sesión</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
