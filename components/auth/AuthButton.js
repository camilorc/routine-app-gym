import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

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
      className={`${disabled || isLoading ? 'bg-gray-600' : 'bg-emerald-600'} rounded-xl p-4 flex-row items-center justify-center`}
    >
      {isLoading ? (
        <Text className="text-gray-300 font-medium text-base">
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