import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../styles';

export const AuthToggle = ({ isRegistering, onToggle }) => {
  return (
    <View className="items-center mt-4">
      <TouchableOpacity onPress={onToggle} className="py-2">
        <Text 
          className="text-sm text-center leading-4"
          style={{ color: colors.text.secondary }}
        >
          {isRegistering 
            ? '¿Ya tienes una cuenta? ' 
            : '¿No tienes una cuenta? '
          }
          <Text 
            className="font-medium"
            style={{ color: colors.accent.bright || colors.accent.primary }}
          >
            {isRegistering ? 'Iniciar Sesión' : 'Regístrate'}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};