import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const AuthHeader = ({ title, subtitle, iconName }) => {
  return (
    <View className="items-center mb-8">
      <View className="w-20 h-20 bg-gray-800 rounded-full items-center justify-center mb-4">
        <Ionicons 
          name={iconName} 
          size={32} 
          color={colors.textSecondary} 
        />
      </View>
      <Text className="text-2xl font-light text-gray-100 text-center mb-2">
        {title}
      </Text>
      <Text className="text-base text-gray-400 text-center">
        {subtitle}
      </Text>
    </View>
  );
};