import { getToken } from "./authService"

const API_URL = "http://localhost:3000/api/users"

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}

// Extrae un mensaje legible desde la respuesta de error del backend.
function buildErrorMessage(data, fallback) {
  if (data?.errors && typeof data.errors === "object") {
    const firstError = Object.values(data.errors)[0]
    if (firstError) return Array.isArray(firstError) ? firstError[0] : firstError
  }
  return data?.message || fallback
}

// Listar usuarios
export async function getUsers() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Error al obtener usuarios")
  }

  return response.json()
}

// Crear usuario
export async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(buildErrorMessage(data, "Error al crear usuario"))
  }

  return data
}

// Editar usuario
export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(buildErrorMessage(data, "Error al actualizar usuario"))
  }

  return data
}

// Eliminar usuario
export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  })

  if (!response.ok) {
    throw new Error("Error al eliminar usuario")
  }

  return true
}
