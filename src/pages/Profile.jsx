import { useState } from "react"
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap"
import Swal from "sweetalert2"
import { changePassword, getUser, updateMe } from "../services/authService"
import { getPasswordStrength, validatePasswordOrError } from "../utils/passwordStrength"

const ROLE_LABELS = {
  admin: "Administrador",
  coach: "Coach",
  user: "Usuario",
}

const ROLE_COLORS = {
  admin: "danger",
  coach: "success",
  user: "primary",
}

const SPORT_OPTIONS = [
  "Musculación",
  "Spinning",
  "Crossfit",
  "Funcional",
  "Yoga",
  "Pilates",
  "Natación",
  "Boxeo",
]

function Profile() {
  const storedUser = getUser()

  // --- Datos del perfil ---
  const [fullName, setFullName] = useState(storedUser?.full_name || "")
  const [birthDate, setBirthDate] = useState(storedUser?.birth_date || "")
  const [sports, setSports] = useState(
    storedUser?.metadata?.sports?.map((s) => s.name) || []
  )
  const [savingProfile, setSavingProfile] = useState(false)

  // --- Cambio de contraseña ---
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [savingPassword, setSavingPassword] = useState(false)

  const strength = getPasswordStrength(newPassword)
  const user = getUser() // se refresca tras guardar

  const toggleSport = (sport) => {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    )
  }

  const handleSaveProfile = async (event) => {
    event.preventDefault()

    if (!fullName || fullName.trim().length < 3) {
      Swal.fire("Datos incompletos", "El nombre debe tener al menos 3 caracteres.", "warning")
      return
    }

    setSavingProfile(true)
    try {
      await updateMe({
        full_name: fullName.trim(),
        birth_date: birthDate || null,
        metadata: {
          sports: sports.map((name) => ({ name, frequency_per_week: 3 })),
        },
      })
      Swal.fire("Perfil actualizado", "Tus datos se guardaron correctamente.", "success")
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setSavingProfile(false)
    }
  }

  const handleChangePassword = async (event) => {
    event.preventDefault()

    if (!currentPassword) {
      Swal.fire("Falta información", "Debes ingresar tu contraseña actual.", "warning")
      return
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire("No coinciden", "La nueva contraseña y su confirmación no coinciden.", "warning")
      return
    }

    const passwordError = validatePasswordOrError(newPassword)
    if (passwordError) {
      Swal.fire("Contraseña insegura", passwordError, "warning")
      return
    }

    setSavingPassword(true)
    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      })
      Swal.fire("Contraseña actualizada", "Tu contraseña se cambió correctamente.", "success")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmNewPassword("")
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <Container className="py-2">
      <Row className="g-4">
        {/* Resumen de la cuenta */}
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center p-4">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: "90px", height: "90px", backgroundColor: "#f0f0f0", fontSize: "2.2rem" }}
              >
                👤
              </div>
              <h4 className="mb-1">{user?.full_name || "Usuario"}</h4>
              <p className="text-muted mb-3">{user?.email}</p>
              <Badge bg={ROLE_COLORS[user?.role] || "secondary"} className="fs-6 px-3 py-2">
                {ROLE_LABELS[user?.role] || "Sin rol"}
              </Badge>

              <hr className="my-4" />

              <Row className="text-start">
                <Col xs={5} className="text-muted">ID</Col>
                <Col xs={7}>{user?.id ?? "—"}</Col>
              </Row>
              <Row className="text-start mt-2">
                <Col xs={5} className="text-muted">Nacimiento</Col>
                <Col xs={7}>{user?.birth_date || "No registrada"}</Col>
              </Row>
              <Row className="text-start mt-2">
                <Col xs={5} className="text-muted">Deportes</Col>
                <Col xs={7}>
                  {user?.metadata?.sports?.length
                    ? user.metadata.sports.map((s) => s.name).join(", ")
                    : "Ninguno seleccionado"}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Editar datos personales */}
        <Col md={8}>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Header className="fw-semibold">Editar mis datos</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSaveProfile}>
                <Row>
                  <Col md={7}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre completo</Form.Label>
                      <Form.Control
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha de nacimiento</Form.Label>
                      <Form.Control
                        type="date"
                        value={birthDate || ""}
                        onChange={(e) => setBirthDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Deportes de interés</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {SPORT_OPTIONS.map((sport) => (
                      <Badge
                        key={sport}
                        role="button"
                        onClick={() => toggleSport(sport)}
                        bg={sports.includes(sport) ? "primary" : "light"}
                        text={sports.includes(sport) ? "white" : "dark"}
                        className="p-2 border"
                        style={{ cursor: "pointer" }}
                      >
                        {sports.includes(sport) ? "✓ " : ""}{sport}
                      </Badge>
                    ))}
                  </div>
                </Form.Group>

                <Button type="submit" variant="primary" disabled={savingProfile}>
                  {savingProfile ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar cambios"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Cambiar contraseña */}
          <Card className="shadow-sm border-0">
            <Card.Header className="fw-semibold">Cambiar contraseña</Card.Header>
            <Card.Body>
              <Form onSubmit={handleChangePassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña actual</Form.Label>
                  <Form.Control
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Nueva contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 8 caracteres, con mayúscula y símbolo"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {newPassword && (
                  <div className="mb-3">
                    <ProgressBar
                      now={(strength.score / 5) * 100}
                      variant={strength.color}
                      style={{ height: "6px" }}
                    />
                    <small className={`text-${strength.color}`}>{strength.label}</small>
                  </div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar nueva contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="outline-danger" disabled={savingPassword}>
                  {savingPassword ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Actualizando...
                    </>
                  ) : (
                    "Cambiar contraseña"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
