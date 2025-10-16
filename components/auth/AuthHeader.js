import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../styles';

export const AuthHeader = ({ title, subtitle, iconName }) => {
  return (
    <View className="items-center mb-8">
      <View 
        className="w-20 h-20 rounded-full items-center justify-center mb-4"
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Ionicons 
          name={iconName} 
          size={32} 
          color={colors.text.secondary} 
        />
      </View>
      <Text 
        className="text-2xl font-light text-center mb-2"
        style={{ color: colors.text.primary }}
      >
        {title}
      </Text>
      <Text 
        className="text-base text-center"
        style={{ color: colors.text.secondary }}
      >
        {subtitle}
      </Text>
    </View>
  );
};