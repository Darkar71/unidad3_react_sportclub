import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Card, Container, Form, ProgressBar, Spinner } from "react-bootstrap"
import { registerUser } from "../services/authService"
import { getPasswordStrength, validatePasswordOrError } from "../utils/passwordStrength"

function Register() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const strength = getPasswordStrength(password)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.")
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    const passwordError = validatePasswordOrError(password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    setLoading(true)

    try {
      await registerUser({ full_name: fullName, email, password, role: "user" })
      setSuccess("¡Cuenta creada con éxito! Redirigiendo al login...")
      setTimeout(() => navigate("/login"), 1500)
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor. Verifica tu conexión.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(135deg, #2E1A47 0%, #4A2E7A 100%)" }}
    >
      <Card style={{ width: "26rem" }} className="shadow-lg border-0">
        <Card.Body className="p-4">
          <div className="text-center mb-3">
            <img src="/logo_empresa_letra_v1.png" alt="SportClub" style={{ height: "40px" }} />
          </div>
          <Card.Title className="text-center mb-4 text-muted">
            Crea tu cuenta y empieza hoy
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 8 caracteres, con mayúscula y símbolo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {password && (
              <div className="mb-3">
                <ProgressBar
                  now={(strength.score / 5) * 100}
                  variant={strength.color}
                  style={{ height: "6px" }}
                />
                <small className={`text-${strength.color}`}>{strength.label}</small>
              </div>
            )}

            <Form.Group className="mb-4">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="warning"
              className="w-100 fw-bold"
              disabled={loading}
              style={{ color: "#2E1A47" }}
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Creando cuenta...
                </>
              ) : (
                "Registrarme"
              )}
            </Button>
          </Form>

          <p className="text-center mt-4 mb-1 text-muted">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none">
              Inicia sesión aquí
            </Link>
          </p>
          <p className="text-center">
            <Link to="/" className="text-muted text-decoration-none small">
              ← Volver al inicio
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register
