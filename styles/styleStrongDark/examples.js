/**
 * Ejemplos de uso de los estilos Strongo Dark
 * Este archivo muestra cómo usar correctamente los estilos en componentes reales
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  colors,
  textStyles,
  buttonStyles,
  inputStyles,
  containerStyles,
  borderStyles,
  iconStyles,
  combineStyles,
} from './index';

// Ejemplo 1: Pantalla con formulario
export const FormExample = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView 
      className={containerStyles.screen} 
      style={{ backgroundColor: colors.background.primary }}
    >
      <View className={containerStyles.content}>
        {/* Título */}
        <Text 
          className={textStyles.h1}
          style={{ color: colors.text.primary }}
        >
          Registro
        </Text>
        <Text 
          className={combineStyles(textStyles.bodySecondary, 'mb-6')}
          style={{ color: colors.text.secondary }}
        >
          Completa tus datos para continuar
        </Text>

        {/* Input de nombre */}
        <View className={inputStyles.base.container}>
          <Text 
            className={inputStyles.base.label}
            style={{ color: colors.text.secondary }}
          >
            Nombre completo
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej: Juan Pérez"
            placeholderTextColor={colors.placeholder}
            className={inputStyles.base.input}
            style={{ 
              backgroundColor: colors.background.secondary,
              color: colors.text.primary,
              borderColor: colors.border.light,
              borderWidth: 1
            }}
          />
        </View>

        {/* Input de email */}
        <View className={inputStyles.base.container}>
          <Text 
            className={inputStyles.base.label}
            style={{ color: colors.text.secondary }}
          >
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
            className={inputStyles.base.input}
            style={{ 
              backgroundColor: colors.background.secondary,
              color: colors.text.primary,
              borderColor: colors.border.light,
              borderWidth: 1
            }}
          />
        </View>

        {/* Botón primario */}
        <TouchableOpacity
          className={buttonStyles.primary.container}
          style={{ backgroundColor: colors.accent.orange }}
        >
          <Text 
            className={buttonStyles.primary.text}
            style={{ color: colors.background.primary }}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Ejemplo 2: Card con información
export const CardExample = () => {
  return (
    <View 
      className={containerStyles.card}
      style={{ backgroundColor: colors.background.secondary }}
    >
      {/* Header del card */}
      <View className="flex-row items-center mb-4">
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: colors.background.tertiary }}
        >
          <Ionicons 
            name="fitness" 
            size={iconStyles.sizes.md} 
            color={colors.accent.orange} 
          />
        </View>
        <View className="flex-1">
          <Text 
            className={textStyles.h4}
            style={{ color: colors.text.primary }}
          >
            Rutina de Pecho
          </Text>
          <Text 
            className={textStyles.caption}
            style={{ color: colors.text.tertiary }}
          >
            6 ejercicios • 45 min
          </Text>
        </View>
      </View>

      {/* Descripción */}
      <Text 
        className={textStyles.bodySmall}
        style={{ color: colors.text.secondary }}
      >
        Rutina enfocada en el desarrollo del pecho con ejercicios compuestos y de aislamiento.
      </Text>

      {/* Botón secundario */}
      <TouchableOpacity
        className={combineStyles(buttonStyles.secondary.container, 'mt-4')}
        style={{ backgroundColor: colors.background.tertiary }}
      >
        <Text 
          className={buttonStyles.secondary.text}
          style={{ color: colors.accent.orange }}
        >
          Iniciar Rutina
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Ejemplo 3: Lista con badges
export const ListExample = () => {
  const exercises = [
    { name: 'Press de Banca', series: '4x12', status: 'completed' },
    { name: 'Aperturas', series: '3x15', status: 'in-progress' },
    { name: 'Fondos', series: '3x12', status: 'pending' },
  ];

  const getBadgeColor = (status) => {
    switch (status) {
      case 'completed': return colors.success;
      case 'in-progress': return colors.warning;
      default: return colors.text.tertiary;
    }
  };

  return (
    <View className={containerStyles.screen}>
      {exercises.map((exercise, index) => (
        <View
          key={index}
          className="flex-row items-center p-4 mb-2 rounded-xl"
          style={{ 
            backgroundColor: colors.background.secondary,
            borderColor: colors.border.primary,
            borderWidth: 1
          }}
        >
          <View className="flex-1">
            <Text 
              className={textStyles.body}
              style={{ color: colors.text.primary }}
            >
              {exercise.name}
            </Text>
            <Text 
              className={textStyles.caption}
              style={{ color: colors.text.secondary }}
            >
              {exercise.series}
            </Text>
          </View>
          
          <View 
            className={badgeStyles.neutral}
            style={{ backgroundColor: getBadgeColor(exercise.status) }}
          >
            <Text 
              className="text-xs font-semibold"
              style={{ color: colors.text.primary }}
            >
              {exercise.status === 'completed' ? 'Completado' : 
               exercise.status === 'in-progress' ? 'En curso' : 'Pendiente'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// Ejemplo 4: Botones con gradiente (conceptual)
export const GradientButtonExample = () => {
  return (
    <View className="p-6">
      {/* Nota: Para gradientes reales, necesitarías usar expo-linear-gradient */}
      <TouchableOpacity
        className={buttonStyles.primary.container}
        style={{ 
          backgroundColor: colors.accent.orange,
          // Para gradiente real: instalar expo-linear-gradient
        }}
      >
        <Text 
          className={buttonStyles.primary.text}
          style={{ color: colors.background.primary }}
        >
          Botón con Naranja
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={combineStyles(buttonStyles.primary.container, 'mt-4')}
        style={{ backgroundColor: colors.accent.blue }}
      >
        <Text 
          className={buttonStyles.primary.text}
          style={{ color: colors.text.primary }}
        >
          Botón con Azul
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={combineStyles(buttonStyles.outline.container, 'mt-4')}
        style={{ borderColor: colors.accent.orange }}
      >
        <Text 
          className={buttonStyles.outline.text}
          style={{ color: colors.accent.orange }}
        >
          Botón Outline Naranja
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default {
  FormExample,
  CardExample,
  ListExample,
  GradientButtonExample,
};
