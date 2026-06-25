import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap"
import { getUser } from "../../services/authService"

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

const MOCK_RESERVATIONS = [
  { class: "Spinning", coach: "Marcos Díaz", day: "Lun", time: "07:00", status: "Confirmada" },
  { class: "Funcional", coach: "Camila Ríos", day: "Hoy", time: "18:00", status: "Pendiente" },
  { class: "Yoga", coach: "Marcos Díaz", day: "Mié", time: "09:00", status: "Confirmada" },
]

const STATUS_VARIANT = {
  Confirmada: "success",
  Pendiente: "warning",
}

function UserDashboard() {
  const user = getUser()
  const firstName = user?.full_name?.split(" ")[0] || "Usuario"
  const sports = user?.metadata?.sports || []

  // Marcado simple de asistencia de la semana (solo visual, no persiste en backend)
  const [attendedDays, setAttendedDays] = useState(["Lun", "Mié"])

  const toggleDay = (day) => {
    setAttendedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const weeklyGoal = 4
  const progressPct = Math.min((attendedDays.length / weeklyGoal) * 100, 100)

  return (
    <Container fluid>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="mb-1" style={{ color: "#1d4ed8" }}>
            Hola, {firstName} 👋
          </h2>
          <p className="text-muted mb-0">
            Este es tu panel de socio. Revisa tus reservas, tu progreso semanal y tus
            deportes favoritos.
          </p>
        </Col>
        <Col xs="auto">
          <Link to="/user/profile">
            <Button variant="outline-primary">Editar mi perfil</Button>
          </Link>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #1d4ed8" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Mi Plan</Card.Subtitle>
              <Card.Title style={{ color: "#1d4ed8" }}>Plan Trimestral</Card.Title>
              <Badge bg="primary">Activo</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #1d4ed8" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Clases reservadas</Card.Subtitle>
              <Card.Title style={{ color: "#1d4ed8" }}>3 esta semana</Card.Title>
              <ProgressBar now={60} variant="primary" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #1d4ed8" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Próxima clase</Card.Subtitle>
              <Card.Title style={{ color: "#1d4ed8" }}>Funcional · 18:00</Card.Title>
              <Badge bg="info" text="dark">Hoy</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        {/* Objetivo semanal interactivo */}
        <Col md={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header style={{ backgroundColor: "#1d4ed8", color: "white" }}>
              Mi objetivo semanal
            </Card.Header>
            <Card.Body>
              <p className="text-muted small mb-2">
                Marca los días que asististe al club. Meta: {weeklyGoal} días por semana.
              </p>
              <div className="d-flex gap-2 mb-3 flex-wrap">
                {WEEK_DAYS.map((day) => (
                  <Badge
                    key={day}
                    role="button"
                    onClick={() => toggleDay(day)}
                    bg={attendedDays.includes(day) ? "primary" : "light"}
                    text={attendedDays.includes(day) ? "white" : "dark"}
                    className="p-2 border"
                    style={{ cursor: "pointer", minWidth: "44px" }}
                  >
                    {day}
                  </Badge>
                ))}
              </div>
              <ProgressBar now={progressPct} variant="primary" style={{ height: "10px" }} />
              <small className="text-muted">
                {attendedDays.length} de {weeklyGoal} días completados
              </small>
            </Card.Body>
          </Card>
        </Col>

        {/* Mis deportes favoritos */}
        <Col md={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header style={{ backgroundColor: "#1d4ed8", color: "white" }}>
              Mis deportes de interés
            </Card.Header>
            <Card.Body>
              {sports.length === 0 ? (
                <div className="text-center text-muted py-3">
                  <p className="mb-2">Aún no has seleccionado tus deportes favoritos.</p>
                  <Link to="/user/profile">
                    <Button size="sm" variant="primary">Elegir deportes</Button>
                  </Link>
                </div>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {sports.map((sport) => (
                    <Badge key={sport.name} bg="primary" className="p-2 fs-6">
                      {sport.name}
                    </Badge>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm">
        <Card.Header style={{ backgroundColor: "#1d4ed8", color: "white" }}>
          Mis próximas reservas
        </Card.Header>
        <Card.Body>
          <Table responsive hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Clase</th>
                <th>Coach</th>
                <th>Horario</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_RESERVATIONS.map((res) => (
                <tr key={res.class + res.day}>
                  <td>{res.class}</td>
                  <td>{res.coach}</td>
                  <td>{res.day} · {res.time}</td>
                  <td><Badge bg={STATUS_VARIANT[res.status]}>{res.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default UserDashboard
