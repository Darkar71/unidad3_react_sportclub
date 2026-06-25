import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const initialForm = {
  name: "",
  objective: "",
  duration: "",
  status: true,
}

function buildFormFromSport(sport) {
  if (!sport) return initialForm
  return {
    name: sport.name || "",
    objective: sport.objective || "",
    duration: sport.duration || "",
    status: sport.status ?? true,
  }
}

function SportFormModal({ show, handleClose, handleSave, selectedSport }) {
  const [formData, setFormData] = useState(() => buildFormFromSport(selectedSport))
  const [errors, setErrors] = useState({})

  // Sincronizar formulario cuando cambia el deporte seleccionado
  useEffect(() => {
    setFormData(buildFormFromSport(selectedSport))
    setErrors({})
  }, [selectedSport, show])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Limpiar error del campo al modificarlo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio."
    }

    if (!formData.objective.trim()) {
      newErrors.objective = "El objetivo es obligatorio."
    }

    if (!formData.duration || formData.duration === "") {
      newErrors.duration = "La duración es obligatoria."
    } else if (isNaN(formData.duration) || Number(formData.duration) <= 0) {
      newErrors.duration = "La duración debe ser un número mayor a 0."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    handleSave({
      name: formData.name.trim(),
      objective: formData.objective.trim(),
      duration: Number(formData.duration),
      status: formData.status,
    })
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#6d1b7b", color: "white" }}>
        <Modal.Title>
          {selectedSport ? "✏️ Editar Deporte" : "➕ Nuevo Deporte"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit} noValidate>
        <Modal.Body>
          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label>
              Nombre <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Ej: CrossFit"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Objetivo */}
          <Form.Group className="mb-3">
            <Form.Label>
              Objetivo <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="objective"
              placeholder="Ej: Mejorar fuerza y resistencia..."
              value={formData.objective}
              onChange={handleChange}
              isInvalid={!!errors.objective}
            />
            <Form.Control.Feedback type="invalid">
              {errors.objective}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Duración */}
          <Form.Group className="mb-3">
            <Form.Label>
              Duración (minutos) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="duration"
              placeholder="Ej: 60"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              isInvalid={!!errors.duration}
            />
            <Form.Control.Feedback type="invalid">
              {errors.duration}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Estado */}
          <Form.Group className="mb-2">
            <Form.Label>Estado</Form.Label>
            <div>
              <Form.Check
                type="switch"
                id="sport-status-switch"
                name="status"
                label={formData.status ? "Activo" : "Inactivo"}
                checked={formData.status}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            style={{ backgroundColor: "#6d1b7b", border: "none" }}
          >
            {selectedSport ? "Actualizar" : "Crear Deporte"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default SportFormModal
