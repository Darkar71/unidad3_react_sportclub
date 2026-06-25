import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap"
import { getUser } from "../../services/authService"
import { getUsers } from "../../services/userService"

function AdminDashboard() {
  const user = getUser()

  const [stats, setStats] = useState({ total: 0, admins: 0, coaches: 0, users: 0 })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    let isMounted = true

    ;(async () => {
      try {
        const response = await getUsers()
        const list = response.data || []
        const admins = list.filter((u) => u.role === "admin").length
        const coaches = list.filter((u) => u.role === "coach").length
        const users = list.filter((u) => u.role === "user").length

        if (isMounted) {
          setStats({ total: list.length, admins, coaches, users })
        }
      } catch {
        // Si falla, se muestran contadores en 0 sin romper el dashboard
      } finally {
        if (isMounted) setLoadingStats(false)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const pct = (value) => (stats.total > 0 ? Math.round((value / stats.total) * 100) : 0)

  return (
    <Container fluid>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="mb-1" style={{ color: "#6d1b7b" }}>
            Panel de Administración 🛠️
          </h2>
          <p className="text-muted mb-0">
            Bienvenido/a {user?.full_name || "Administrador"}. Gestiona usuarios,
            deportes, entrenadores y clases desde aquí.
          </p>
        </Col>
        <Col xs="auto">
          <Link to="/admin/profile">
            <Button variant="outline-dark" style={{ borderColor: "#6d1b7b", color: "#6d1b7b" }}>
              Editar mi perfil
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #6d1b7b" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Usuarios totales</Card.Subtitle>
              <Card.Title style={{ color: "#6d1b7b" }}>
                {loadingStats ? <Spinner size="sm" animation="border" /> : stats.total}
              </Card.Title>
              <Badge bg="secondary">Usuario / Coach / Admin</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #6d1b7b" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Coaches activos</Card.Subtitle>
              <Card.Title style={{ color: "#6d1b7b" }}>
                {loadingStats ? <Spinner size="sm" animation="border" /> : stats.coaches}
              </Card.Title>
              <Badge bg="success">Operativos</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #6d1b7b" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Administradores</Card.Subtitle>
              <Card.Title style={{ color: "#6d1b7b" }}>
                {loadingStats ? <Spinner size="sm" animation="border" /> : stats.admins}
              </Card.Title>
              <Badge bg="danger">Acceso total</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #6d1b7b" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Socios (usuarios)</Card.Subtitle>
              <Card.Title style={{ color: "#6d1b7b" }}>
                {loadingStats ? <Spinner size="sm" animation="border" /> : stats.users}
              </Card.Title>
              <Badge bg="info" text="dark">Plan activo</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        {/* Distribución de roles */}
        <Col md={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header style={{ backgroundColor: "#6d1b7b", color: "white" }}>
              Distribución de roles
            </Card.Header>
            <Card.Body>
              {loadingStats ? (
                <div className="text-center py-3">
                  <Spinner animation="border" style={{ color: "#6d1b7b" }} />
                </div>
              ) : stats.total === 0 ? (
                <p className="text-muted text-center mb-0">Aún no hay usuarios registrados.</p>
              ) : (
                <>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Usuarios</span><span>{pct(stats.users)}%</span>
                    </div>
                    <ProgressBar now={pct(stats.users)} style={{ height: "8px" }} variant="info" />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Coaches</span><span>{pct(stats.coaches)}%</span>
                    </div>
                    <ProgressBar now={pct(stats.coaches)} style={{ height: "8px" }} variant="success" />
                  </div>
                  <div>
                    <div className="d-flex justify-content-between small mb-1">
                      <span>Administradores</span><span>{pct(stats.admins)}%</span>
                    </div>
                    <ProgressBar now={pct(stats.admins)} style={{ height: "8px" }} variant="danger" />
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Módulos administrativos */}
        <Col md={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header style={{ backgroundColor: "#6d1b7b", color: "white" }}>
              Módulos administrativos
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col md={6}>
                  <Card className="text-center border-0 bg-light h-100">
                    <Card.Body>
                      <div className="fs-1 mb-2">👥</div>
                      <Card.Title className="fs-6">Gestión de Usuarios</Card.Title>
                      <Card.Text className="text-muted small">
                        Crear, editar y eliminar usuarios del sistema.
                      </Card.Text>
                      <Link to="/admin/users">
                        <Button size="sm" style={{ backgroundColor: "#6d1b7b", color: "white", border: "none" }}>
                          Ir al módulo
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="text-center border-0 bg-light h-100">
                    <Card.Body>
                      <div className="fs-1 mb-2">🏋️</div>
                      <Card.Title className="fs-6">Gestión de Deportes</Card.Title>
                      <Card.Text className="text-muted small">
                        Administra los deportes ofrecidos por el club.
                      </Card.Text>
                      <Link to="/admin/sports">
                        <Button size="sm" style={{ backgroundColor: "#6d1b7b", color: "white", border: "none" }}>
                          Ir al módulo
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
