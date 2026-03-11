import { Colors } from "../constants/styles";

// Strength evaluator used by the ControllerTextInput
export default function evaluatePasswordStrength(password: string) {
  if (!password) return { label: "None", color: "#9CA3AF", score: 0 };

  let score = 0;

  // 1. Length check (The most important factor)
  if (password.length >= 8) score++;
  if (password.length >= 12) score++; // Bonus for length

  // 2. Character diversity checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  // Increment score based on variety
  const criteriaCount = [
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  // Logic: Award points if the user uses a mix of types
  if (criteriaCount >= 2) score++;
  if (criteriaCount >= 4) score++;

  // Map scores to UI feedback
  switch (score) {
    case 0:
    case 1:
      return { label: "Weak", color: Colors.error, score };
    case 2:
      return { label: "Fair", color: "#F59E0B", score };
    case 3:
      return { label: "Good", color: "#3B82F6", score };
    case 4:
    default:
      return { label: "Strong", color: Colors.success, score };
  }
}