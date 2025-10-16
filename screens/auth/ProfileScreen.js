import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/AuthContext';
import { colors, textStyles, buttonStyles, containerStyles } from '../../styles';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            const { error } = await signOut();
            if (error) {
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView className={containerStyles.screen}>
      <ScrollView className="flex-1">
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.background.secondary }}>
              <Ionicons name="person" size={32} color={colors.text.primary} />
            </View>
            <Text className={`${textStyles.h2} text-center`}>
              Mi Cuenta
            </Text>
          </View>

          {/* Información del usuario */}
          <View className="mb-8">
            <View 
              className="border-2 border-dashed rounded-xl p-4 mb-4"
              style={{ 
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.secondary
              }}
            >
              <Text className={textStyles.label}>
                Email
              </Text>
              <Text className={textStyles.body}>
                {user.email}
              </Text>
            </View>

            {user.user_metadata?.full_name && (
              <View 
                className="border-2 border-dashed rounded-xl p-4 mb-4"
                style={{ 
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.border.secondary
                }}
              >
                <Text className={textStyles.label}>
                  Nombre
                </Text>
                <Text className={textStyles.body}>
                  {user.user_metadata.full_name}
                </Text>
              </View>
            )}

            {user.last_sign_in_at && (
              <View 
                className="border-2 border-dashed rounded-xl p-4"
                style={{ 
                  backgroundColor: colors.background.secondary,
                  borderColor: colors.border.secondary
                }}
              >
                <Text className={textStyles.label}>
                  Último inicio de sesión
                </Text>
                <Text className={textStyles.body}>
                  {formatDate(user.last_sign_in_at)}
                </Text>
              </View>
            )}
          </View>

          {/* Botón de cerrar sesión */}
          <TouchableOpacity
            onPress={handleSignOut}
            className="rounded-xl p-4 flex-row items-center justify-center"
            style={{ backgroundColor: colors.accent.bright || colors.accent.primary }}
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold text-center text-base ml-2">
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}