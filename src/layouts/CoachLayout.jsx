import { Link, Outlet, useLocation } from "react-router-dom"
import { Nav } from "react-bootstrap"
import DashboardHeader from "../components/DashboardHeader"

const THEME_COLOR = "#15803d" // Verde - identidad del rol Coach

function CoachLayout() {
  const location = useLocation()

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "#f0fdf4" }}>
      <DashboardHeader themeColor={THEME_COLOR} profilePath="/coach/profile" />

      <Nav
        className="px-3 py-2 shadow-sm"
        style={{ backgroundColor: "#1ea34d" }}
        activeKey={location.pathname}
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/coach/dashboard" className="text-white fw-semibold">
            🏠 Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/coach/profile" className="text-white fw-semibold">
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

export default CoachLayout
