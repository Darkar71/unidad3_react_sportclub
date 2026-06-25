import { getToken } from "./authService"

const API_URL = "http://localhost:3000/api/sports"

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}

function buildErrorMessage(data, fallback) {
  if (data?.errors && typeof data.errors === "object") {
    const firstError = Object.values(data.errors)[0]
    if (firstError) return Array.isArray(firstError) ? firstError[0] : firstError
  }
  return data?.message || fallback
}

// Listar todos los deportes
export async function getSports() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getHeaders(),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al obtener deportes"))
  }

  return data
}

// Obtener un deporte por ID
export async function getSportById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al obtener el deporte"))
  }

  return data
}

// Crear un deporte
export async function createSport(sportData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(sportData),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al crear el deporte"))
  }

  return data
}

// Actualizar un deporte
export async function updateSport(id, sportData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(sportData),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al actualizar el deporte"))
  }

  return data
}

// Eliminar un deporte
export async function deleteSport(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al eliminar el deporte"))
  }

  return data
}

// Cambiar estado de un deporte (PATCH /api/sports/:id/status)
export async function changeSportStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  })

  const data = await response.json()

  if (!response.ok || data.ok === false) {
    throw new Error(buildErrorMessage(data, "Error al cambiar el estado del deporte"))
  }

  return data
}
