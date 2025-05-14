export type PasswordValidation = {
  label: string;
  isValid: (password: string) => boolean;
};

export const passwordValidations: PasswordValidation[] = [
  {
    label: '6 caracteres',
    isValid: (password: string) => password.length >= 6,
  },
  {
    label: 'Pelo menos 1 letra maiúscula',
    isValid: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: 'Pelo menos 1 número',
    isValid: (password: string) => /[0-9]/.test(password),
  },
  {
    label: 'Pelo menos 1 caractere especial',
    isValid: (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export const checkAllValidations = (password: string) => {
  return passwordValidations.every(validation => validation.isValid(password));
};