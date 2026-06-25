import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert, Button, Card, Container, Form, Spinner } from "react-bootstrap"
import { loginUser, saveSession } from "../services/authService"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Debes completar correo y contraseña.")
      return
    }

    setLoading(true)

    try {
      const response = await loginUser({ email, password })
      const { token, user } = response.data

      saveSession(token, user)

      if (user.role === "admin") {
        navigate("/admin/dashboard")
      } else if (user.role === "coach") {
        navigate("/coach/dashboard")
      } else {
        navigate("/user/dashboard")
      }
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
            Inicia sesión en tu cuenta
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Ingresando...
                </>
              ) : (
                "Ingresar"
              )}
            </Button>
          </Form>

          <p className="text-center mt-4 mb-1 text-muted">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="fw-semibold text-decoration-none">
              Regístrate aquí
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

export default Login
