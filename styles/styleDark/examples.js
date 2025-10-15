/**
 * Ejemplos de uso de los estilos centralizados
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
} from '../index';

// Ejemplo 1: Pantalla con formulario
export const FormExample = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView className={containerStyles.screen}>
      <View className={containerStyles.content}>
        {/* Título */}
        <Text className={textStyles.h1}>Registro</Text>
        <Text className={combineStyles(textStyles.bodySecondary, 'mb-6')}>
          Completa tus datos para continuar
        </Text>

        {/* Input de nombre */}
        <View className={inputStyles.base.container}>
          <Text className={inputStyles.base.label}>Nombre completo</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej: Juan Pérez"
            placeholderTextColor={colors.placeholder}
            className={inputStyles.base.input}
          />
        </View>

        {/* Input de email */}
        <View className={inputStyles.base.container}>
          <Text className={inputStyles.base.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="ejemplo@correo.com"
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
            className={inputStyles.base.input}
          />
        </View>

        {/* Botón primario */}
        <TouchableOpacity className={buttonStyles.primary.container}>
          <Text className={buttonStyles.primary.text}>Registrarse</Text>
        </TouchableOpacity>

        {/* Botón secundario */}
        <TouchableOpacity
          className={combineStyles(
            buttonStyles.secondary.container,
            'mt-4'
          )}
        >
          <Text className={buttonStyles.secondary.text}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Ejemplo 2: Card con información
export const CardExample = () => {
  return (
    <View className={containerStyles.card}>
      {/* Header del card */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className={textStyles.h3}>Mi Rutina</Text>
        <Ionicons
          name="fitness"
          size={iconStyles.sizes.md}
          color={iconStyles.colors.accent}
        />
      </View>

      {/* Contenido */}
      <Text className={textStyles.bodySecondary}>
        Rutina de fuerza completa para principiantes
      </Text>

      {/* Stats */}
      <View className="flex-row mt-4 gap-4">
        <View>
          <Text className={textStyles.caption}>Ejercicios</Text>
          <Text className={textStyles.h4}>12</Text>
        </View>
        <View>
          <Text className={textStyles.caption}>Duración</Text>
          <Text className={textStyles.h4}>45 min</Text>
        </View>
      </View>
    </View>
  );
};

// Ejemplo 3: Botón con icono
export const IconButtonExample = () => {
  return (
    <TouchableOpacity
      className={combineStyles(
        buttonStyles.primary.container,
        buttonStyles.withIcon
      )}
    >
      <Ionicons name="add" size={iconStyles.sizes.sm} color="#0B0F0E" />
      <Text
        className={combineStyles(
          buttonStyles.primary.text,
          buttonStyles.iconSpacing
        )}
      >
        Añadir Ejercicio
      </Text>
    </TouchableOpacity>
  );
};

// Ejemplo 4: Lista con items
export const ListExample = () => {
  const items = [
    { id: 1, name: 'Press de Banca', sets: 4, reps: 12 },
    { id: 2, name: 'Sentadillas', sets: 4, reps: 10 },
    { id: 3, name: 'Peso Muerto', sets: 3, reps: 8 },
  ];

  return (
    <View className={containerStyles.section}>
      <Text className={combineStyles(textStyles.h3, 'mb-4')}>
        Ejercicios
      </Text>

      {items.map((item) => (
        <View
          key={item.id}
          className={combineStyles(
            containerStyles.cardSmall,
            'mb-3',
            borderStyles.solid
          )}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className={textStyles.body}>{item.name}</Text>
              <Text className={textStyles.caption}>
                {item.sets} series × {item.reps} reps
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={iconStyles.sizes.sm}
                color={iconStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

// Ejemplo 5: Búsqueda
export const SearchExample = () => {
  const [query, setQuery] = useState('');

  return (
    <View className={inputStyles.search.container}>
      <Ionicons
        name="search-outline"
        size={iconStyles.sizes.sm}
        color={iconStyles.colors.secondary}
      />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar ejercicio..."
        placeholderTextColor={colors.placeholder}
        className={inputStyles.search.input}
      />
    </View>
  );
};

// Ejemplo 6: Estados de botones
export const ButtonStatesExample = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View className={containerStyles.section}>
      {/* Botón normal */}
      <TouchableOpacity className={buttonStyles.primary.container}>
        <Text className={buttonStyles.primary.text}>Guardar</Text>
      </TouchableOpacity>

      {/* Botón deshabilitado */}
      <TouchableOpacity
        disabled
        className={combineStyles(
          buttonStyles.disabled.container,
          'mt-4'
        )}
      >
        <Text className={buttonStyles.disabled.text}>Deshabilitado</Text>
      </TouchableOpacity>

      {/* Botón de peligro */}
      <TouchableOpacity
        className={combineStyles(
          buttonStyles.danger.container,
          'mt-4'
        )}
      >
        <Text className={buttonStyles.danger.text}>Eliminar</Text>
      </TouchableOpacity>

      {/* Botón outline */}
      <TouchableOpacity
        className={combineStyles(
          buttonStyles.outline.container,
          'mt-4'
        )}
      >
        <Text className={buttonStyles.outline.text}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

// Ejemplo 7: TextArea
export const TextAreaExample = () => {
  const [description, setDescription] = useState('');

  return (
    <View className={inputStyles.textarea.container}>
      <Text className={inputStyles.textarea.label}>
        Descripción (opcional)
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Agrega notas o instrucciones..."
        placeholderTextColor={colors.placeholder}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        className={inputStyles.textarea.input}
      />
    </View>
  );
};

// Ejemplo 8: Usar colores directamente
export const DirectColorsExample = () => {
  return (
    <View>
      {/* Fondo con color */}
      <View
        style={{
          backgroundColor: colors.background.secondary,
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: colors.text.primary, fontSize: 16 }}>
          Usando colores directamente en style props
        </Text>
      </View>

      {/* Icono con color */}
      <Ionicons
        name="checkmark-circle"
        size={24}
        color={colors.success}
        style={{ marginTop: 16 }}
      />
    </View>
  );
};
