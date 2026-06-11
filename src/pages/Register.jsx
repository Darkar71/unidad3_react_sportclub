import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService"

function Register() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    setLoading(true)

    try {
      const result = await registerUser({ nombre, email, password })

      if (result.id || result.message === "Usuario creado exitosamente") {
        setSuccess("¡Cuenta creada! Redirigiendo al login...")
        setTimeout(() => navigate("/login"), 1500)
      } else {
        setError(result.message || "No se pudo crear la cuenta. Intenta de nuevo.")
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Verifica tu conexión.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">

            {/* Logo / Encabezado */}
            <div className="text-center mb-4">
              <h2 className="fw-bold text-danger">⚽ SportClub</h2>
              <p className="text-muted">Crea tu cuenta y empieza hoy</p>
            </div>

            {/* Card del formulario */}
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h5 className="card-title mb-4 fw-semibold">Crear Cuenta</h5>

                {/* Mensajes de feedback */}
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success py-2" role="alert">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Confirmar contraseña */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Repite tu contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    className="btn btn-danger w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        />
                        Creando cuenta...
                      </>
                    ) : (
                      "Registrarme"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Link a login */}
            <p className="text-center mt-3 text-muted">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-danger fw-semibold text-decoration-none">
                Inicia sesión aquí
              </Link>
            </p>

            {/* Link a inicio */}
            <p className="text-center">
              <Link to="/" className="text-muted text-decoration-none small">
                ← Volver al inicio
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
