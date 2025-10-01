import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export const AuthToggle = ({ isRegistering, onToggle }) => {
  return (
    <View className="items-center mt-4">
      <TouchableOpacity onPress={onToggle} className="py-2">
        <Text className="text-sm text-gray-400 text-center leading-4">
          {isRegistering 
            ? '¿Ya tienes una cuenta? ' 
            : '¿No tienes una cuenta? '
          }
          <Text className="text-emerald-400 font-medium">
            {isRegistering ? 'Iniciar Sesión' : 'Regístrate'}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};