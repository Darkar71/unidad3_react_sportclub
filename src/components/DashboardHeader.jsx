import { Link, useNavigate } from "react-router-dom"
import { Button, Container, Navbar } from "react-bootstrap"
import { logout, getUser } from "../services/authService"

// Header común para todos los dashboards.
// themeColor define la identidad visual del rol (azul / verde / morado).
function DashboardHeader({ themeColor, profilePath }) {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <Navbar style={{ backgroundColor: themeColor }} variant="dark" expand="lg" className="px-3 shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo_empresa_letra_v1.png"
            alt="SportClub"
            style={{ height: "36px", filter: "brightness(0) invert(1)" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="dashboard-navbar" />
        <Navbar.Collapse id="dashboard-navbar" className="justify-content-end">
          <span className="text-white me-3 fw-semibold">
            👤 {user?.full_name || user?.name || "Usuario"}
          </span>
          <Link to={profilePath} className="btn btn-light btn-sm me-2 fw-semibold">
            Mi Perfil
          </Link>
          <Button variant="outline-light" size="sm" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default DashboardHeader
