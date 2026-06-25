// Validación de fuerza de contraseña en el frontend.
// El backend solo exige mínimo 8 caracteres; aquí se agrega una capa
// adicional de seguridad recomendando mayúsculas, minúsculas, números y símbolos.

export function getPasswordStrength(password) {
  if (!password) {
    return { score: 0, label: "", color: "secondary" }
  }

  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }

  const score = Object.values(checks).filter(Boolean).length

  if (!checks.length) {
    return { score, label: "Muy débil (mínimo 8 caracteres)", color: "danger", checks }
  }
  if (score <= 2) {
    return { score, label: "Débil — añade mayúsculas y símbolos", color: "danger", checks }
  }
  if (score <= 3) {
    return { score, label: "Aceptable — añade símbolos para más seguridad", color: "warning", checks }
  }
  if (score === 4) {
    return { score, label: "Buena contraseña", color: "info", checks }
  }
  return { score, label: "Contraseña fuerte", color: "success", checks }
}

// Validación mínima obligatoria antes de enviar al backend.
// Devuelve un mensaje de error o null si es válida.
export function validatePasswordOrError(password) {
  if (!password || password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres."
  }
  if (!/[A-Z]/.test(password)) {
    return "Añade al menos una letra mayúscula para una contraseña más segura."
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Añade al menos un símbolo (ej: !, @, #, _) para una contraseña más segura."
  }
  return null
}
