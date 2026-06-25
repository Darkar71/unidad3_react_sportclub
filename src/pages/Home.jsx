import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <>
      <header className="site-header">
        <div className="logo-container">
          <img src="/logo_empresa_letra_v1.png" alt="SportClub" />
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#planes">Planes</a></li>
            <li><a href="#horarios">Horarios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="header-auth">
          <Link to="/login" className="btn-sm btn-login">Iniciar Sesión</Link>
          <Link to="/register" className="btn-sm btn-register">Registrarse</Link>
        </div>
      </header>

      <section className="hero-carousel">
        <div className="carousel-container">
          <div className="carousel-item" style={{ backgroundImage: "url('/img/gim1.webp')" }}></div>
          <div className="carousel-item" style={{ backgroundImage: "url('/img/gim2.webp')" }}></div>
          <div className="carousel-item" style={{ backgroundImage: "url('/img/gim3.jpg')" }}></div>
        </div>
        <div className="hero-content">
          <span className="landing-tagline">Tu mejor versión comienza hoy</span>
          <h1>ENTRENA CON LOS MEJORES</h1>
          <p>Programas personalizados, tecnología de vanguardia y una comunidad que te motiva a superar tus límites cada día.</p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <Link to="/register" className="btn-primary btn-yellow" style={{ width: "auto", padding: "15px 40px", textDecoration: "none" }}>
              ¡ÚNETE AHORA!
            </Link>
          </div>
        </div>
      </section>

      <section id="planes" className="planes-section">
        <h2 className="section-title">MEMBRESÍAS</h2>
        <p className="section-subtitle">Invierte en tu salud con nuestros planes especializados</p>
        <div className="pricing-table">
          <div className="pricing-header">
            <div>PLAN</div>
            <div>VALOR</div>
          </div>
          <div className="pricing-row">
            <div className="plan-name-col">🗓️ PLAN MENSUAL</div>
            <div className="price-col">
              <span className="price-value">$28.000</span>
              <span className="price-duration">Mensual</span>
            </div>
          </div>
          <div className="pricing-row">
            <div className="plan-name-col">📊 PLAN TRIMESTRAL</div>
            <div className="price-col">
              <span className="price-value">$75.000</span>
              <span className="price-duration">Cada 3 meses</span>
            </div>
          </div>
          <div className="pricing-row" style={{ backgroundColor: "#fef8e6" }}>
            <div className="plan-name-col" style={{ color: "#d9a404" }}>🏆 PLAN ANUAL</div>
            <div className="price-col" style={{ backgroundColor: "#fffdf5" }}>
              <span className="price-value">$255.000</span>
              <span className="price-duration">Mejor opción</span>
            </div>
          </div>
        </div>
      </section>

      <section id="horarios" className="horarios-section" style={{ backgroundColor: "var(--gray-light)" }}>
        <h2 className="section-title">NUESTROS HORARIOS</h2>
        <p className="section-subtitle">Abierto de Lunes a Sábado para tu comodidad</p>
        <div className="horarios-table">
          <div className="horarios-header">
            <div>BLOQUE</div>
            <div>DISPONIBILIDAD</div>
          </div>
          <div className="horarios-row">
            <div className="horario-col">🌅 Mañana</div>
            <div className="actividad-col">06:00 AM - 12:00 PM</div>
          </div>
          <div className="horarios-row">
            <div className="horario-col">☀️ Tarde</div>
            <div className="actividad-col">14:00 PM - 18:00 PM</div>
          </div>
          <div className="horarios-row">
            <div className="horario-col">🌙 Noche</div>
            <div className="actividad-col">18:00 PM - 22:30 PM</div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contacto-section">
        <h2 className="section-title">CONTÁCTANOS</h2>
        <p className="section-subtitle">¿Tienes dudas? Estamos aquí para ayudarte</p>
        <div className="contacto-grid">
          <div className="contacto-info">
            <div className="info-item">
              <span>📧</span>
              <strong>contacto.info@sportclub.com</strong>
            </div>
            <div className="info-item">
              <span>📍</span>
              <span>Av. Las Palmas #456, La Serena, Chile</span>
            </div>
            <div className="info-item">
              <span>📞</span>
              <span>+56 9 1234 5678</span>
            </div>
            <div style={{ marginTop: "20px" }}>
              <p><strong>Síguenos:</strong> @SportClub_Chile</p>
            </div>
          </div>
          <div className="map-placeholder">
            📍 [Mapa de ubicación próximamente]
          </div>
        </div>
      </section>

      <a href="#" className="whatsapp-float">💬</a>

      <footer className="site-footer">
        <img src="/logo_empresa_letra_v1.png" alt="SportClub" style={{ height: "50px", marginBottom: "20px" }} />
        <p>© 2025 SportClub. Todos los derechos reservados.</p>
      </footer>
    </>
  )
}

export default Home
