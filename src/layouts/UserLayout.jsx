import { Link, Outlet, useLocation } from "react-router-dom"
import { Nav } from "react-bootstrap"
import DashboardHeader from "../components/DashboardHeader"

const THEME_COLOR = "#1d4ed8" // Azul - identidad del rol Usuario

function UserLayout() {
  const location = useLocation()

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#f0f5ff" }}>
      <DashboardHeader themeColor={THEME_COLOR} profilePath="/user/profile" />

      <Nav
        className="px-3 py-2 shadow-sm"
        style={{ backgroundColor: "#3b6ee8" }}
        activeKey={location.pathname}
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/user/dashboard" className="text-white fw-semibold">
            🏠 Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/user/profile" className="text-white fw-semibold">
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

export default UserLayout
