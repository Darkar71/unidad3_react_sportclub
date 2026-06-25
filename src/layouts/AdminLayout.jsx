import { Link, Outlet, useLocation } from "react-router-dom"
import { Nav } from "react-bootstrap"
import DashboardHeader from "../components/DashboardHeader"

const THEME_COLOR = "#6d1b7b" // Morado/Rojo - identidad del rol Administrador

function AdminLayout() {
  const location = useLocation()

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#fbf0fc" }}>
      <DashboardHeader themeColor={THEME_COLOR} profilePath="/admin/profile" />

      <Nav
        className="px-3 py-2 shadow-sm"
        style={{ backgroundColor: "#922a9e" }}
        activeKey={location.pathname}
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/dashboard" className="text-white fw-semibold">
            🏠 Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/users" className="text-white fw-semibold">
            👥 Usuarios
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/sports" className="text-white fw-semibold">
            🏋️ Deportes
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/profile" className="text-white fw-semibold">
            👤 Mi Perfil
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
