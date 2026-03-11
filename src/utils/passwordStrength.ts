export const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+={}[\]:;"'<,>.?/-]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "#FF4D4D", flex: 0.3 };
  if (score <= 4) return { label: "Average", color: "#FFD700", flex: 0.6 };
  return { label: "Strong", color: "#00C851", flex: 1 };
};
