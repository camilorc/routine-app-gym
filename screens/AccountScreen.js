import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { colorClasses, colors } from '../theme/colors';

export default function AccountScreen() {
  const { user, signIn, signOut, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Función para manejar el inicio de sesión
  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, ingresa tu email y contraseña');
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('Error de autenticación', error.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el cierre de sesión
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

  // Si está cargando
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-100 text-lg">Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Si el usuario está autenticado, mostrar perfil
  if (user) {
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

              <View className="bg-gray-800 rounded-xl p-4">
                <Text className="text-sm text-gray-400 mb-1">
                  Último inicio de sesión
                </Text>
                <Text className="text-base text-gray-100">
                  {new Date(user.last_sign_in_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Text>
              </View>
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

  // Si no está autenticado, mostrar login
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          <View className="flex-1 px-6 py-8 min-h-full justify-center">
            {/* Header */}
            <View className="items-center mb-8">
              <View className="w-20 h-20 bg-gray-800 rounded-full items-center justify-center mb-4">
                <Ionicons name="person-outline" size={32} color={colors.textSecondary} />
              </View>
              <Text className="text-2xl font-light text-gray-100 text-center mb-2">
                Iniciar Sesión
              </Text>
              <Text className="text-base text-gray-400 text-center">
                Accede a tu cuenta para continuar
              </Text>
            </View>

            {/* Formulario de login */}
            <View className="mb-6">
              {/* Campo Email */}
              <View className="mb-4">
                <Text className="text-sm text-gray-400 mb-2 font-medium">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="tu@email.com"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4 text-base border border-transparent focus:border-emerald-400"
                />
              </View>

              {/* Campo Contraseña */}
              <View className="mb-6">
                <Text className="text-sm text-gray-400 mb-2 font-medium">
                  Contraseña
                </Text>
                <View className="relative">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Tu contraseña"
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={!showPassword}
                    className="bg-gray-800 text-gray-100 rounded-xl px-4 py-4 pr-12 text-base border border-transparent focus:border-emerald-400"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Botón de iniciar sesión */}
              <TouchableOpacity
                onPress={handleSignIn}
                disabled={isLoading}
                className={`${isLoading ? 'bg-gray-600' : 'bg-emerald-600'} rounded-xl p-4 flex-row items-center justify-center`}
              >
                {isLoading ? (
                  <Text className="text-gray-300 font-medium text-base">
                    Iniciando sesión...
                  </Text>
                ) : (
                  <>
                    <Ionicons name="log-in-outline" size={20} color="white" />
                    <Text className="text-white font-medium ml-2 text-base">
                      Iniciar Sesión
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Información adicional */}
            <View className="items-center">
              <Text className="text-xs text-gray-400 text-center leading-4">
                ¿No tienes una cuenta? Contacta al administrador para obtener acceso.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}