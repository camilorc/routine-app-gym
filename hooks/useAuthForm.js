import { useState } from 'react';

export const useAuthForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return {
    formData,
    updateField,
    clearForm,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
  };
};