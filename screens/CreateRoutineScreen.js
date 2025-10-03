import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';

export default function CreateRoutineScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#0B0F0E]">
      <View className="flex-1 justify-center items-center px-6">
        {user ? (
          // Usuario logueado
          <>
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-[#06D6A0] rounded-full items-center justify-center mb-4">
                <Ionicons name="fitness" size={40} color="#0B0F0E" />
              </View>
              <Text className="text-white text-2xl font-bold text-center mb-2">
                ¡Próximamente!
              </Text>
              <Text className="text-gray-300 text-lg text-center leading-6">
                Acá podrás crear tus rutinas
              </Text>
            </View>
            
            <View className="bg-gray-800 rounded-xl p-6 w-full">
              <Text className="text-[#06D6A0] text-base font-semibold mb-2">
                Funcionalidades que vendrán:
              </Text>
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color="#06D6A0" />
                  <Text className="text-gray-300 ml-2">Crear rutinas personalizadas</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color="#06D6A0" />
                  <Text className="text-gray-300 ml-2">Biblioteca de ejercicios</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color="#06D6A0" />
                  <Text className="text-gray-300 ml-2">Registro de entrenamientos</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color="#06D6A0" />
                  <Text className="text-gray-300 ml-2">Progreso y estadísticas</Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          // Usuario no logueado
          <>
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
          </>
        )}
      </View>
    </SafeAreaView>
  );
}