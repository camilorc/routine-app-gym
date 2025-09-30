import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Componente de icono minimalista para los tabs
export const TabIcon = ({ name, focused, size = 24 }) => {
  return (
    <Ionicons
      name={name}
      size={size}
      color={focused ? colors.accent : colors.textSecondary}
      style={{
        marginBottom: -3, // Ajuste para centrar mejor el icono
      }}
    />
  );
};