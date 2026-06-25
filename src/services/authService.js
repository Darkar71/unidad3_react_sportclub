const API_URL = "http://localhost:3000/api/auth"

// Extrae un mensaje legible desde la respuesta de error del backend.
// El backend puede devolver { message } o { message, errors: { campo: "texto" } }.
function buildErrorMessage(data, fallback) {
  if (data?.errors && typeof data.errors === "object") {
    const firstError = Object.values(data.errors)[0]
    if (firstError) return Array.isArray(firstError) ? firstError[0] : firstError
  }
  return data?.message || fallback
}

// Login contra el backend
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al iniciar sesión"))
  }

  return data
}

// Registro contra el backend
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al registrar usuario"))
  }

  return data
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}

// Obtener datos actualizados del usuario autenticado
export async function getMe() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: getHeaders(),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al obtener el perfil"))
  }

  return data
}

// Actualizar mi perfil (nombre, correo, fecha de nacimiento, deportes favoritos)
export async function updateMe(payload) {
  const response = await fetch(`${API_URL}/me`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al actualizar el perfil"))
  }

  // Mantiene la sesión local sincronizada con los datos nuevos
  if (data.data) {
    const currentToken = getToken()
    saveSession(currentToken, data.data)
  }

  return data
}

// Cambiar mi contraseña
export async function changePassword(payload) {
  const response = await fetch(`${API_URL}/me/password`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al cambiar la contraseña"))
  }

  return data
}

// Guardar sesión en el navegador
export function saveSession(token, user) {
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(user))
}

// Obtener token
export function getToken() {
  return localStorage.getItem("token")
}

// Obtener usuario
export function getUser() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

// Verificar si existe sesión
export function isAuthenticated() {
  return Boolean(getToken())
}

// Cerrar sesión
export function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}
