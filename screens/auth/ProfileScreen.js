import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../auth/AuthContext';
import { colors } from '../../styles';

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
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1">
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-gray-800 rounded-full items-center justify-center mb-4">
              <Ionicons name="person" size={32} color={colors.textPrimary} />
            </View>
            <Text className="text-2xl font-light text-gray-100 text-center">
              Mi Cuenta
            </Text>
          </View>

          {/* Información del usuario */}
          <View className="mb-8">
            <View className="bg-gray-800 rounded-xl p-4 mb-4">
              <Text className="text-sm text-gray-400 mb-1">
                Email
              </Text>
              <Text className="text-base text-gray-100">
                {user.email}
              </Text>
            </View>

            {user.user_metadata?.full_name && (
              <View className="bg-gray-800 rounded-xl p-4 mb-4">
                <Text className="text-sm text-gray-400 mb-1">
                  Nombre
                </Text>
                <Text className="text-base text-gray-100">
                  {user.user_metadata.full_name}
                </Text>
              </View>
            )}

            {user.last_sign_in_at && (
              <View className="bg-gray-800 rounded-xl p-4">
                <Text className="text-sm text-gray-400 mb-1">
                  Último inicio de sesión
                </Text>
                <Text className="text-base text-gray-100">
                  {formatDate(user.last_sign_in_at)}
                </Text>
              </View>
            )}
          </View>

          {/* Botón de cerrar sesión */}
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-red-600 rounded-xl p-4 flex-row items-center justify-center"
          >
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-medium ml-2 text-base">
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}