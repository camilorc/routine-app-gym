import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { colors } from '../theme/colors';

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
    <SafeAreaView className="flex-1 bg-[#0B0F0E]">
      {user ? (
        // Usuario logueado - Formulario de crear rutina
        <ScrollView className="flex-1 px-6 pt-6">
          <View className="mb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              Nueva Rutina
            </Text>
          </View>

          {/* Input Nombre de la rutina */}
          <View className="mb-4">
            <Text className="text-sm text-gray-400 mb-2 font-medium">
              Nombre de la rutina
            </Text>
            <TextInput
              value={routineName}
              onChangeText={setRoutineName}
              placeholder="Ej: Rutina de Fuerza"
              placeholderTextColor={colors.textSecondary}
              className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base border border-transparent focus:border-[#06D6A0]"
            />
          </View>

          {/* TextArea Descripción */}
          <View className="mb-6">
            <Text className="text-sm text-gray-400 mb-2 font-medium">
              Descripción
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe tu rutina..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base border border-transparent focus:border-[#06D6A0] h-32"
            />
          </View>

          {/* Sección de Ejercicios */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-4">
              Ejercicios
            </Text>
            
            <TouchableOpacity
              onPress={handleAddExercises}
              className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl p-6 items-center"
            >
              <View className="w-16 h-16 bg-[#06D6A0] rounded-full items-center justify-center mb-3">
                <Ionicons name="add" size={32} color="#0B0F0E" />
              </View>
              <Text className="text-white text-base font-semibold mb-1">
                Añadir Ejercicios
              </Text>
              <Text className="text-gray-400 text-sm text-center">
                Comienza a construir tu rutina añadiendo ejercicios.
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botón Crear Rutina */}
          <TouchableOpacity
            onPress={handleCreateRoutine}
            className="bg-[#06D6A0] rounded-xl p-4 mb-6"
          >
            <Text className="text-[#0B0F0E] font-semibold text-center text-base">
              Crear Rutina
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        // Usuario no logueado
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-gray-700 rounded-full items-center justify-center mb-4">
              <Ionicons name="lock-closed" size={40} color="#6B7280" />
            </View>
            <Text className="text-white text-2xl font-bold text-center mb-2">
              Funcionalidad Exclusiva
            </Text>
            <Text className="text-gray-300 text-lg text-center leading-6 mb-6">
              Para crear rutinas necesitas una cuenta
            </Text>
          </View>
          
          <View className="bg-[#06D6A0] rounded-xl p-6 w-full">
            <View className="items-center">
              <Ionicons name="person-add" size={24} color="#0B0F0E" className="mb-2" />
              <Text className="text-[#0B0F0E] text-lg font-bold mb-1">
                ¡Regístrate ahora!
              </Text>
              <Text className="text-[#0B0F0E] text-center text-sm opacity-80">
                Crea tu cuenta gratuita y comienza a diseñar rutinas personalizadas
              </Text>
            </View>
          </View>
          
          <Text className="text-gray-400 text-sm text-center mt-6 px-4">
            Ve a la pestaña "Mi Cuenta" para registrarte o iniciar sesión
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}