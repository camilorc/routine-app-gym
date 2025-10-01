import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useAuth } from '../../auth/AuthContext';
import { useAuthForm } from '../../hooks/useAuthForm';
import { authValidators } from '../../hooks/useAuthValidation';

// Componentes de UI
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { AuthInput } from '../../components/auth/AuthInput';
import { AuthButton } from '../../components/auth/AuthButton';
import { AuthToggle } from '../../components/auth/AuthToggle';

export default function LoginScreen({ navigation, onToggleMode }) {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    formData,
    updateField,
    clearForm,
    showPassword,
    setShowPassword
  } = useAuthForm();

  const handleLogin = async () => {
    const validationError = authValidators.validateLoginForm(
      formData.email, 
      formData.password
    );

    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        Alert.alert('Error de autenticación', error.message);
      } else {
        clearForm();
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Iniciar Sesión"
        subtitle="Accede a tu cuenta para continuar"
        iconName="person-outline"
      />

      <View className="mb-6">
        <AuthInput
          label="Email"
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          placeholder="tu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AuthInput
          label="Contraseña"
          value={formData.password}
          onChangeText={(value) => updateField('password', value)}
          placeholder="Tu contraseña"
          secureTextEntry={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          style="mb-6"
        />

        <AuthButton
          onPress={handleLogin}
          title="Iniciar Sesión"
          icon="log-in-outline"
          isLoading={isLoading}
          loadingText="Iniciando sesión..."
        />
      </View>

      <AuthToggle
        isRegistering={false}
        onToggle={onToggleMode}
      />
    </AuthLayout>
  );
}