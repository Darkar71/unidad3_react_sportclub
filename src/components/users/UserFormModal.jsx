import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const initialForm = {
  full_name: "",
  email: "",
  role: "user",
  password: "",
}

function buildFormFromUser(selectedUser) {
  if (!selectedUser) return initialForm

  return {
    full_name: selectedUser.full_name || "",
    email: selectedUser.email || "",
    role: selectedUser.role || "user",
    password: "",
  }
}

function UserFormModal({ show, handleClose, handleSave, selectedUser }) {
  const [formData, setFormData] = useState(() => buildFormFromUser(selectedUser))

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    handleSave(formData)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#6d1b7b", color: "white" }}>
        <Modal.Title>
          {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              placeholder="Ej: Juan Pérez"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {!selectedUser && (
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">Usuario</option>
              <option value="coach">Coach</option>
              <option value="admin">Administrador</option>
            </Form.Select>
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
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UserFormModal
