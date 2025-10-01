export const authValidators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return 'El email es obligatorio';
    if (!emailRegex.test(email)) return 'Por favor, ingresa un email válido';
    return null;
  },

  password: (password, isRegistering = false) => {
    if (!password.trim()) return 'La contraseña es obligatoria';
    if (isRegistering && password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  },

  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword.trim()) return 'Confirmar contraseña es obligatorio';
    if (password !== confirmPassword) return 'Las contraseñas no coinciden';
    return null;
  },

  fullName: (fullName) => {
    if (!fullName.trim()) return 'El nombre completo es obligatorio';
    if (fullName.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
    return null;
  },

  validateLoginForm: (email, password) => {
    const emailError = authValidators.email(email);
    const passwordError = authValidators.password(password);

    if (emailError) return emailError;
    if (passwordError) return passwordError;
    return null;
  },

  validateRegisterForm: (email, password, confirmPassword, fullName) => {
    const emailError = authValidators.email(email);
    const passwordError = authValidators.password(password, true);
    const confirmPasswordError = authValidators.confirmPassword(password, confirmPassword);
    const fullNameError = authValidators.fullName(fullName);

    if (fullNameError) return fullNameError;
    if (emailError) return emailError;
    if (passwordError) return passwordError;
    if (confirmPasswordError) return confirmPasswordError;
    return null;
  }
};