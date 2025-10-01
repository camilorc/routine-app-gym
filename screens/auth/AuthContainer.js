import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../auth/AuthContext';

// Pantallas
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ProfileScreen from './ProfileScreen';

export default function AuthContainer() {
  const { user, loading } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  // Pantalla de carga
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-100 text-lg">Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si el usuario está autenticado, mostrar perfil
  if (user) {
    return <ProfileScreen />;
  }

  // Si no está autenticado, mostrar login o registro
  return isRegistering ? (
    <RegisterScreen onToggleMode={handleToggleMode} />
  ) : (
    <LoginScreen onToggleMode={handleToggleMode} />
  );
}