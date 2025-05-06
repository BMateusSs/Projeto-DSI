import { useState } from "react";

export const SignUpValidation = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateSignUp = (password: string, confirmPassword: string): boolean => {
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem');
      return false;
    }
    
    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase) {
      setErrorMessage('A senha deve conter pelo menos uma letra maiúscula');
      return false;
    }
    
    if (!hasLowerCase) {
      setErrorMessage('A senha deve conter pelo menos uma letra minúscula');
      return false;
    }
    
    if (!hasNumber) {
      setErrorMessage('A senha deve conter pelo menos um número');
      return false;
    }
    
    if (!hasSpecialChar) {
      setErrorMessage('A senha deve conter pelo menos um caractere especial');
      return false;
    }
    
    setErrorMessage('');
    return true;
  };

  return { errorMessage, validateSignUp };
};