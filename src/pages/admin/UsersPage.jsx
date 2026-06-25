import { useEffect, useState } from "react"
import { Badge, Button, Card, Spinner, Table } from "react-bootstrap"
import Swal from "sweetalert2"
import UserFormModal from "../../components/users/UserFormModal"
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../services/userService"

const ROLE_LABELS = {
  admin: "Administrador",
  coach: "Entrenador",
  user: "Usuario",
}

const ROLE_BADGE = {
  admin: "danger",
  coach: "success",
  user: "info",
}

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUsers = async () => {
    const data = await getUsers()
    return data.data || []
  }

  const loadUsers = async () => {
    try {
      setLoading(true)
      const list = await fetchUsers()
      setUsers(list)
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const list = await fetchUsers()
        if (isMounted) setUsers(list)
      } catch (error) {
        if (isMounted) Swal.fire("Error", error.message, "error")
      } finally {
        if (isMounted) setLoading(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const openCreateModal = () => {
    setSelectedUser(null)
    setShowModal(true)
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  const handleSave = async (formData) => {
    try {
      if (selectedUser) {
        // Si no se escribió una nueva contraseña, no se envía el campo:
        // el backend valida longitud mínima si el campo está presente.
        const { password, ...rest } = formData
        const payload = password ? formData : rest

        await updateUser(selectedUser.id, payload)
        Swal.fire("Actualizado", "Usuario actualizado correctamente", "success")
      } else {
        await createUser(formData)
        Swal.fire("Creado", "Usuario creado correctamente", "success")
      }
      closeModal()
      loadUsers()
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    }
  }

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${user.full_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    })

    if (result.isConfirmed) {
      try {
        await deleteUser(user.id)
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success")
        loadUsers()
      } catch (error) {
        Swal.fire("Error", error.message, "error")
      }
    }
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Header
        className="d-flex justify-content-between align-items-center"
        style={{ backgroundColor: "#6d1b7b", color: "white" }}
      >
        <h4 className="mb-0">Gestión de Usuarios</h4>
        <Button
          variant="warning"
          className="fw-semibold"
          onClick={openCreateModal}
        >
          + Nuevo Usuario
        </Button>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center p-4">
            <Spinner animation="border" style={{ color: "#6d1b7b" }} />
            <p className="mt-2">Cargando usuarios...</p>
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-muted p-4">
            No hay usuarios registrados todavía.
          </p>
        ) : (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg={ROLE_BADGE[user.role] || "secondary"}>
                      {ROLE_LABELS[user.role] || user.role}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(user)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(user)}
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

      <UserFormModal
        key={selectedUser ? selectedUser.id : "new"}
        show={showModal}
        handleClose={closeModal}
        handleSave={handleSave}
        selectedUser={selectedUser}
      />
    </Card>
  )
}

export default UsersPage
