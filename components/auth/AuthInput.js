import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles';

export const AuthInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false, 
  showPassword, 
  onTogglePassword, 
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  style = ''
}) => {
  return (
    <View className={`mb-4 ${style}`}>
      <Text 
        className="text-sm mb-2 font-medium"
        style={{ color: colors.text.secondary }}
      >
        {label}
      </Text>
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.text.secondary}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          className="rounded-xl px-4 py-4 text-base border"
          style={{ 
            backgroundColor: colors.background.secondary, 
            color: colors.text.primary,
            borderColor: colors.border.light
          }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={onTogglePassword}
            className="absolute right-4 top-4"
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};