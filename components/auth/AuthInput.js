import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

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
      <Text className="text-sm text-gray-400 mb-2 font-medium">
        {label}
      </Text>
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base border border-transparent focus:border-emerald-400"
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={onTogglePassword}
            className="absolute right-4 top-4"
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};