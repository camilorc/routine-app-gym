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

export default function RegisterScreen({ navigation, onToggleMode }) {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    formData,
    updateField,
    clearForm,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
  } = useAuthForm();

  const handleRegister = async () => {
    const validationError = authValidators.validateRegisterForm(
      formData.email, 
      formData.password, 
      formData.confirmPassword,
      formData.fullName
    );

    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      
      if (error) {
        Alert.alert('Error de registro', error.message);
      } else {
        Alert.alert(
          'Registro exitoso', 
          'Se ha enviado un email de confirmación. Por favor, verifica tu cuenta antes de iniciar sesión.',
          [{ text: 'OK', onPress: () => {
            clearForm();
            onToggleMode();
          }}]
        );
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
        title="Crear Cuenta"
        subtitle="Únete para comenzar tu rutina"
        iconName="person-add-outline"
      />

      <View className="mb-6">
        <AuthInput
          label="Nombre completo"
          value={formData.fullName}
          onChangeText={(value) => updateField('fullName', value)}
          placeholder="Tu nombre completo"
          autoCapitalize="words"
          autoCorrect={false}
        />

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
          placeholder="Mínimo 6 caracteres"
          secureTextEntry={true}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <AuthInput
          label="Confirmar contraseña"
          value={formData.confirmPassword}
          onChangeText={(value) => updateField('confirmPassword', value)}
          placeholder="Confirma tu contraseña"
          secureTextEntry={true}
          showPassword={showConfirmPassword}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          style="mb-6"
        />

        <AuthButton
          onPress={handleRegister}
          title="Crear Cuenta"
          icon="person-add-outline"
          isLoading={isLoading}
          loadingText="Creando cuenta..."
        />
      </View>

      <AuthToggle
        isRegistering={true}
        onToggle={onToggleMode}
      />
    </AuthLayout>
  );
}