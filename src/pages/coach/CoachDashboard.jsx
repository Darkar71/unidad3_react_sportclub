import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap"
import { getUser } from "../../services/authService"

const CLASSES_TODAY = [
  { name: "Spinning", time: "07:00", attendees: 12, status: "Finalizada" },
  { name: "Crossfit", time: "10:00", attendees: 9, status: "Finalizada" },
  { name: "Funcional", time: "18:00", attendees: 15, status: "Próxima" },
  { name: "Yoga", time: "20:00", attendees: 8, status: "Próxima" },
]

const STATUS_VARIANT = {
  Finalizada: "secondary",
  Próxima: "success",
}

const STUDENTS_PREVIEW = [
  { name: "Valentina Soto", lastClass: "Funcional", attendance: 92 },
  { name: "Diego Fuentes", lastClass: "Crossfit", attendance: 78 },
  { name: "Camila Rojas", lastClass: "Spinning", attendance: 100 },
]

function CoachDashboard() {
  const user = getUser()
  const firstName = user?.full_name?.split(" ")[0] || ""

  const [checkedIn, setCheckedIn] = useState({})

  const toggleCheckIn = (className) => {
    setCheckedIn((prev) => ({ ...prev, [className]: !prev[className] }))
  }

  const finishedCount = CLASSES_TODAY.filter((c) => c.status === "Finalizada").length
  const dayProgress = (finishedCount / CLASSES_TODAY.length) * 100

  return (
    <Container fluid>
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="mb-1" style={{ color: "#15803d" }}>
            Hola, Coach {firstName} 💪
          </h2>
          <p className="text-muted mb-0">
            Aquí puedes revisar tus clases del día, marcar asistencia y ver tus
            alumnos destacados.
          </p>
        </Col>
        <Col xs="auto">
          <Link to="/coach/profile">
            <Button variant="outline-success">Editar mi perfil</Button>
          </Link>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #15803d" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Clases hoy</Card.Subtitle>
              <Card.Title style={{ color: "#15803d" }}>{CLASSES_TODAY.length} clases</Card.Title>
              <ProgressBar now={dayProgress} variant="success" style={{ height: "8px" }} />
              <small className="text-muted">{finishedCount} finalizadas</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #15803d" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Alumnos activos</Card.Subtitle>
              <Card.Title style={{ color: "#15803d" }}>27 alumnos</Card.Title>
              <Badge bg="success">+3 esta semana</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: "5px solid #15803d" }}>
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">Próxima clase</Card.Subtitle>
              <Card.Title style={{ color: "#15803d" }}>Funcional · 18:00</Card.Title>
              <Badge bg="warning" text="dark">En 2 horas</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        {/* Clases de hoy con check-in */}
        <Col md={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header style={{ backgroundColor: "#15803d", color: "white" }}>
              Mis clases de hoy
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Clase</th>
                    <th>Horario</th>
                    <th>Alumnos</th>
                    <th>Estado</th>
                    <th>Check-in</th>
                  </tr>
                </thead>
                <tbody>
                  {CLASSES_TODAY.map((c) => (
                    <tr key={c.name}>
                      <td>{c.name}</td>
                      <td>{c.time}</td>
                      <td>{c.attendees}</td>
                      <td><Badge bg={STATUS_VARIANT[c.status]}>{c.status}</Badge></td>
                      <td>
                        <Button
                          size="sm"
                          variant={checkedIn[c.name] ? "success" : "outline-success"}
                          onClick={() => toggleCheckIn(c.name)}
                        >
                          {checkedIn[c.name] ? "✓ Pasada lista" : "Pasar lista"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Alumnos destacados */}
        <Col md={5}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header style={{ backgroundColor: "#15803d", color: "white" }}>
              Alumnos con mejor asistencia
            </Card.Header>
            <ListGroup variant="flush">
              {STUDENTS_PREVIEW.map((s) => (
                <ListGroup.Item key={s.name} className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{s.name}</div>
                    <small className="text-muted">Última clase: {s.lastClass}</small>
                  </div>
                  <Badge bg={s.attendance >= 90 ? "success" : "warning"} text={s.attendance >= 90 ? undefined : "dark"}>
                    {s.attendance}%
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default CoachDashboard
