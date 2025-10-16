import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../auth/AuthContext';
import { colors, textStyles, containerStyles } from '../styles';

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
      <SafeAreaView className={containerStyles.screen}>
        <View className="flex-1 justify-center items-center">
          <Text className={textStyles.body}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={containerStyles.screen}>
      <View className="flex-1 justify-center items-center px-6">
        <View className="max-w-sm w-full">
          {user ? (
            <View className="text-center">
              <Text className="text-3xl font-light text-center mb-4" style={{ color: colors.text.primary }}>
                Bienvenido
              </Text>
              <Text className="text-xl text-center mb-6 font-medium" style={{ color: colors.accent.primary }}>
                {getUserDisplayName()}
              </Text>
              <Text className={`text-base text-center leading-6 ${textStyles.bodySecondary}`}>
                Nos alegra tenerte de vuelta. Explora todas las funcionalidades disponibles en tu cuenta.
              </Text>
            </View>
          ) : (
            <View className="text-center">
              <Text className="text-3xl font-light text-center mb-4" style={{ color: colors.text.primary }}>
                ¡Bienvenido!
              </Text>
              <Text className={`text-base text-center leading-6 mb-6 ${textStyles.bodySecondary}`}>
                Descubre una experiencia única y personalizada.
              </Text>
              <Text className={`text-sm text-center ${textStyles.bodySecondary}`}>
                Inicia sesión en la pestaña "Mi Cuenta" para acceder a todas las funcionalidades.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}