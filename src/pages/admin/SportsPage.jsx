import { useEffect, useState } from "react"
import {
  Badge,
  Button,
  Card,
  Form,
  Spinner,
  Table,
} from "react-bootstrap"
import Swal from "sweetalert2"
import SportFormModal from "../../components/sports/SportFormModal"
import {
  getSports,
  createSport,
  updateSport,
  deleteSport,
  changeSportStatus,
} from "../../services/sportService"

// Formatea una fecha ISO al estilo: "15 de Julio de 2026"
function formatDate(isoString) {
  if (!isoString) return "—"
  const date = new Date(isoString)
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function SportsPage() {
  const [sports, setSports] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedSport, setSelectedSport] = useState(null)

  // ─── Carga de datos ───────────────────────────────────────────────────────
  const loadSports = async () => {
    try {
      setLoading(true)
      const response = await getSports()
      setSports(response.data || [])
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo cargar la lista de deportes.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const response = await getSports()
        if (isMounted) setSports(response.data || [])
      } catch (error) {
        if (isMounted) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "No se pudo cargar la lista de deportes.",
          })
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  // ─── Modal ────────────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setSelectedSport(null)
    setShowModal(true)
  }

  const openEditModal = (sport) => {
    setSelectedSport(sport)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSport(null)
  }

  // ─── Guardar (crear o editar) ─────────────────────────────────────────────
  const handleSave = async (formData) => {
    try {
      if (selectedSport) {
        await updateSport(selectedSport.id, formData)
        Swal.fire({
          icon: "success",
          title: "Actualizado",
          text: "Deporte actualizado correctamente.",
          timer: 1800,
          showConfirmButton: false,
        })
      } else {
        await createSport(formData)
        Swal.fire({
          icon: "success",
          title: "Creado",
          text: "Deporte creado correctamente.",
          timer: 1800,
          showConfirmButton: false,
        })
      }
      closeModal()
      loadSports()
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al guardar el deporte.",
      })
    }
  }

  // ─── Eliminar ─────────────────────────────────────────────────────────────
  const handleDelete = async (sport) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminar este deporte?",
      text: `Se eliminará "${sport.name}" de forma permanente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6d1b7b",
    })

    if (result.isConfirmed) {
      try {
        await deleteSport(sport.id)
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "Deporte eliminado correctamente.",
          timer: 1800,
          showConfirmButton: false,
        })
        loadSports()
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudo eliminar el deporte.",
        })
      }
    }
  }

  // ─── Cambio de estado (Switch) ────────────────────────────────────────────
  const handleStatusChange = async (sport) => {
    const newStatus = !sport.status
    try {
      await changeSportStatus(sport.id, newStatus)
      // Actualizar el estado localmente para respuesta inmediata
      setSports((prev) =>
        prev.map((s) => (s.id === sport.id ? { ...s, status: newStatus } : s))
      )
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `El deporte ahora está ${newStatus ? "Activo" : "Inactivo"}.`,
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo cambiar el estado.",
      })
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <Card className="shadow-sm border-0">
      <Card.Header
        className="d-flex justify-content-between align-items-center flex-wrap gap-2"
        style={{ backgroundColor: "#6d1b7b", color: "white" }}
      >
        <h4 className="mb-0">🏋️ Gestión de Deportes</h4>
        <div className="d-flex gap-2">
          <Button
            variant="light"
            className="fw-semibold"
            onClick={loadSports}
            disabled={loading}
            title="Refrescar lista"
          >
            🔄 Refrescar
          </Button>
          <Button
            variant="warning"
            className="fw-semibold"
            onClick={openCreateModal}
          >
            + Nuevo Deporte
          </Button>
        </div>
      </Card.Header>

      <Card.Body>
        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" style={{ color: "#6d1b7b" }} />
            <p className="mt-2">Cargando deportes...</p>
          </div>
        ) : sports.length === 0 ? (
          <p className="text-center text-muted p-4">
            No hay deportes registrados todavía.
          </p>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Objetivo</th>
                <th>Duración</th>
                <th>Estado</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sports.map((sport) => (
                <tr key={sport.id}>
                  <td>{sport.id}</td>
                  <td className="fw-semibold">{sport.name}</td>
                  <td style={{ maxWidth: "220px" }}>
                    <span
                      title={sport.objective}
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {sport.objective}
                    </span>
                  </td>
                  <td>{sport.duration} min</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Form.Check
                        type="switch"
                        id={`status-switch-${sport.id}`}
                        checked={sport.status}
                        onChange={() => handleStatusChange(sport)}
                        label=""
                        title={sport.status ? "Activo — clic para desactivar" : "Inactivo — clic para activar"}
                      />
                      <Badge bg={sport.status ? "success" : "secondary"}>
                        {sport.status ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                  </td>
                  <td>{formatDate(sport.created_at)}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(sport)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(sport)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>

      <SportFormModal
        key={selectedSport ? selectedSport.id : "new"}
        show={showModal}
        handleClose={closeModal}
        handleSave={handleSave}
        selectedSport={selectedSport}
      />
    </Card>
  )
}

export default SportsPage
