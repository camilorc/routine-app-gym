import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { colorClasses } from '../theme/colors';

export default function HomeScreen() {
  const { user, loading } = useAuth();

  // Función para obtener el nombre a mostrar
  const getUserDisplayName = () => {
    if (!user) return null;
    
    // Prioridad: display_name -> full_name -> email
    return user.user_metadata?.display_name || 
           user.user_metadata?.full_name || 
           user.email;
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-100 text-lg">Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 justify-center items-center px-6">
        <View className="max-w-sm w-full">
          {user ? (
            <View className="text-center">
              <Text className="text-3xl font-light text-gray-100 text-center mb-4">
                Bienvenido
              </Text>
              <Text className="text-xl text-emerald-400 text-center mb-6 font-medium">
                {getUserDisplayName()}
              </Text>
              <Text className="text-base text-gray-400 text-center leading-6">
                Nos alegra tenerte de vuelta. Explora todas las funcionalidades disponibles en tu cuenta.
              </Text>
            </View>
          ) : (
            <View className="text-center">
              <Text className="text-3xl font-light text-gray-100 text-center mb-4">
                ¡Bienvenido!
              </Text>
              <Text className="text-base text-gray-400 text-center leading-6 mb-6">
                Descubre una experiencia única y personalizada.
              </Text>
              <Text className="text-sm text-gray-400 text-center">
                Inicia sesión en la pestaña "Mi Cuenta" para acceder a todas las funcionalidades.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}