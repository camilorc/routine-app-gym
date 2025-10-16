import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { colors, textStyles, inputStyles, buttonStyles, containerStyles } from '../styles';

export default function CreateRoutineScreen({ navigation }) {
  const { user } = useAuth();
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExercises = () => {
    navigation.navigate('AddExercise');
  };

  const handleCreateRoutine = () => {
    console.log('Crear rutina:', { routineName, description });
    // Aquí irá la lógica para crear la rutina
  };

  return (
    <SafeAreaView className={containerStyles.screen}>
      {user ? (
        // Usuario logueado - Formulario de crear rutina
        <ScrollView className="flex-1 px-6 pt-6">
          <View className="mb-6">
            <Text className={textStyles.h2}>
              Nueva Rutina
            </Text>
          </View>

          {/* Input Nombre de la rutina */}
          <View className={inputStyles.base.container}>
            <Text className={inputStyles.base.label}>
              Nombre de la rutina
            </Text>
            <TextInput
              value={routineName}
              onChangeText={setRoutineName}
              placeholder="Ej: Rutina de Fuerza"
              placeholderTextColor={colors.text.secondary}
              className={inputStyles.base.input}
              style={{ color: colors.text.primary, backgroundColor: colors.background.secondary, borderColor: colors.border.light }}
            />
          </View>

          {/* TextArea Descripción */}
          <View className={inputStyles.textarea.container}>
            <Text className={inputStyles.textarea.label}>
              Descripción
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe tu rutina..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className={inputStyles.textarea.input}
              style={{ color: colors.text.primary, backgroundColor: colors.background.secondary, borderColor: colors.border.light }}
            />
          </View>

          {/* Sección de Ejercicios */}
          <View className="mb-6">
            <Text className={textStyles.h4 + " mb-4"}>
              Ejercicios
            </Text>
            
            <TouchableOpacity
              onPress={handleAddExercises}
              className="border-2 border-dashed rounded-xl p-6 items-center"
              style={{ backgroundColor: colors.background.secondary, borderColor: colors.border.secondary }}
            >
              <View className="w-16 h-16 rounded-full items-center justify-center mb-3" style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}>
                <Ionicons name="add" size={32} color={colors.background.primary} />
              </View>
              <Text className="text-base font-semibold mb-1" style={{ color: colors.text.primary }}>
                Añadir Ejercicios
              </Text>
              <Text className={`text-sm text-center ${textStyles.bodySecondary}`}>
                Comienza a construir tu rutina añadiendo ejercicios.
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botón Crear Rutina */}
          <TouchableOpacity
            onPress={handleCreateRoutine}
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
          >
            <Text className="text-white font-semibold text-center text-base">
              Crear Rutina
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        // Usuario no logueado
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.background.tertiary }}>
              <Ionicons name="lock-closed" size={40} color={colors.text.tertiary} />
            </View>
            <Text className={`text-2xl font-bold text-center mb-2 ${textStyles.h2}`}>
              Funcionalidad Exclusiva
            </Text>
            <Text className="text-lg text-center leading-6 mb-6" style={{ color: colors.text.secondary }}>
              Para crear rutinas necesitas una cuenta
            </Text>
          </View>
          
          <View className="rounded-xl p-6 w-full" style={{ backgroundColor: colors.accent.primary }}>
            <View className="items-center">
              <Ionicons name="person-add" size={24} color={colors.background.primary} className="mb-2" />
              <Text className="text-lg font-bold mb-1" style={{ color: colors.background.primary }}>
                ¡Regístrate ahora!
              </Text>
              <Text className="text-center text-sm opacity-80" style={{ color: colors.background.primary }}>
                Crea tu cuenta gratuita y comienza a diseñar rutinas personalizadas
              </Text>
            </View>
          </View>
          
          <Text className={`text-sm text-center mt-6 px-4 ${textStyles.bodySecondary}`}>
            Ve a la pestaña "Mi Cuenta" para registrarte o iniciar sesión
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}