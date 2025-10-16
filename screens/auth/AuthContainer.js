import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../auth/AuthContext';
import { colors } from '../../styles';

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
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background.primary }}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg" style={{ color: colors.text.primary }}>Cargando...</Text>
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