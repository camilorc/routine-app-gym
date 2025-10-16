import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles';

export const AuthButton = ({ 
  onPress, 
  title, 
  icon, 
  isLoading = false, 
  loadingText = 'Cargando...', 
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      className="rounded-xl p-4 flex-row items-center justify-center"
      style={{ 
        backgroundColor: (disabled || isLoading) 
          ? colors.disabled 
          : (colors.accent.bright || colors.accent.primary)
      }}
    >
      {isLoading ? (
        <Text 
          className="font-medium text-base"
          style={{ color: colors.text.secondary }}
        >
          {loadingText}
        </Text>
      ) : (
        <>
          <Ionicons name={icon} size={20} color="white" />
          <Text className="text-white font-medium ml-2 text-base">
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};