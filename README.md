# SportClub – SPA con React

Aplicación web SPA (Single Page Application) para la gestión de un gimnasio/club
deportivo, desarrollada como proyecto de la **Unidad 3 – Desarrollo de Aplicaciones
Web SPA con React** de la asignatura Programación Front End.

El sistema cuenta con autenticación, autorización por roles (usuario, coach y
administrador), dashboards diferenciados visualmente para cada rol, y un módulo
administrativo de gestión de usuarios (CRUD) conectado a un backend.

## Integrantes

- _Completar con el nombre del estudiante / equipo correspondiente._

## Imágenes pendientes (agregar antes de usar)

El proyecto no incluye las imágenes originales del sitio. Debes copiarlas tú:

- **Logo**: coloca `logo_empresa_letra_v1.png` directamente en la carpeta `public/`
  (junto a `favicon.svg`).
- **Carrusel del Home**: coloca `gim1.webp`, `gim2.webp`, `gim3.jpg` (y `gim4.jpg`
  si agregas un cuarto slide) dentro de `public/img/`.

Mientras esos archivos no existan, verás el ícono de "imagen rota" del navegador en
el logo y un fondo morado liso en el hero — es esperado, no es un error del código.

## Tecnologías utilizadas

- **React 19** (con [Vite](https://vitejs.dev/) como bundler y servidor de desarrollo)
- **React Router DOM v7** – navegación SPA, rutas protegidas y rutas por rol
- **React-Bootstrap 2** + **Bootstrap 5** – componentes de UI (Modal, Form, Navbar,
  Alert, Spinner, Table, ProgressBar, etc.)
- **SweetAlert2** – confirmaciones, alertas de éxito y error
- **Fetch API** – consumo del backend REST
- **localStorage** – persistencia de sesión (token + datos del usuario)
- **ESLint** – control de calidad de código

## Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── DashboardHeader.jsx
│   └── users/
│       └── UserFormModal.jsx
├── layouts/            # Plantillas por rol (header + navegación + Outlet)
│   ├── UserLayout.jsx      (identidad azul)
│   ├── CoachLayout.jsx     (identidad verde)
│   └── AdminLayout.jsx     (identidad morada)
├── pages/              # Vistas principales
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Unauthorized.jsx
│   ├── Profile.jsx
│   ├── user/UserDashboard.jsx
│   ├── coach/CoachDashboard.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       └── UsersPage.jsx      # Módulo CRUD de Gestión de Usuarios
├── routes/
│   ├── AppRoutes.jsx       # Definición central de rutas
│   ├── ProtectedRoute.jsx  # Bloquea acceso sin sesión activa
│   └── RoleRoute.jsx       # Bloquea acceso según el rol del usuario
├── services/
│   ├── authService.js      # Login, registro, sesión (localStorage)
│   └── userService.js      # CRUD de usuarios contra el backend
├── App.jsx
└── main.jsx
```

## Roles del sistema

| Rol     | Color de identidad | Acceso                                            |
|---------|---------------------|----------------------------------------------------|
| `user`  | Azul                | Dashboard de usuario, mis reservas, mi perfil      |
| `coach` | Verde               | Dashboard de coach, clases y alumnos, mi perfil    |
| `admin` | Morado              | Dashboard admin, **Gestión de Usuarios (CRUD)**, mi perfil |

El acceso a cada zona está protegido por `RoleRoute`, que redirige a `/login` si no
hay sesión activa, o a `/unauthorized` si el usuario no tiene el rol permitido para
esa ruta.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js) o pnpm
- El backend de SportClub disponible (ver sección siguiente)

## Cómo instalar las dependencias

Clonar o descomprimir el proyecto, luego ejecutar dentro de la carpeta del proyecto:

```bash
npm install
```

o si se utiliza pnpm:

```bash
pnpm install
```

Esto instalará React, React Router, React-Bootstrap, Bootstrap, SweetAlert2 y las
herramientas de desarrollo (Vite, ESLint).

## Cómo ejecutar el frontend

```bash
npm run dev
```

Esto levanta el servidor de desarrollo de Vite. Por defecto la aplicación queda
disponible en:

```
http://localhost:5173
```

Otros comandos disponibles:

```bash
npm run build     # genera la versión de producción en /dist
npm run preview   # sirve localmente la build de producción
npm run lint      # ejecuta ESLint sobre el proyecto
```

## Cómo ejecutar el backend

El frontend espera un backend REST disponible en `http://localhost:3000` con, como
mínimo, los siguientes endpoints:

| Acción              | Método | Endpoint                |
|---------------------|--------|--------------------------|
| Login               | POST   | `/api/auth/login`        |
| Registro            | POST   | `/api/auth/register`     |
| Listar usuarios     | GET    | `/api/users`              |
| Crear usuario       | POST   | `/api/users`              |
| Editar usuario      | PUT    | `/api/users/:id`          |
| Eliminar usuario    | DELETE | `/api/users/:id`          |

El backend debe responder el login con un formato similar a:

```json
{
  "ok": true,
  "message": "Login exitoso.",
  "data": {
    "token": "jwt_generado_por_backend",
    "user": {
      "id": 5,
      "full_name": "Demo Admin",
      "email": "admin@demo.cl",
      "role": "admin"
    }
  }
}
```

Roles soportados: `user`, `coach`, `admin`.

Para ejecutar el backend proporcionado por el curso, seguir las instrucciones
entregadas por el docente para ese repositorio (normalmente `npm install` seguido de
`npm start` o `npm run dev`, dependiendo de cómo esté configurado).

Si el backend utiliza otra URL o puerto distinto a `http://localhost:3000`, se debe
ajustar la constante `API_URL` en:

- `src/services/authService.js`
- `src/services/userService.js`

## Flujo de uso

1. Ingresar a `http://localhost:5173`.
2. Registrarse o iniciar sesión.
3. Según el rol del usuario autenticado, el sistema redirige automáticamente a:
   - `/user/dashboard`
   - `/coach/dashboard`
   - `/admin/dashboard`
4. El administrador puede acceder a **Usuarios** desde el menú del dashboard para
   crear, editar y eliminar usuarios del sistema.
5. Cualquier usuario puede ir a **Mi Perfil** para:
   - Editar su nombre, fecha de nacimiento y deportes de interés.
   - Cambiar su contraseña (pide la contraseña actual + nueva + confirmación).
   - Cerrar sesión desde el header del dashboard.

### Contraseñas seguras

Aunque el backend solo exige un mínimo de 8 caracteres, el frontend exige además
al menos una mayúscula y un símbolo, mostrando un indicador visual de fuerza
(débil / aceptable / buena / fuerte) tanto en el registro como al cambiar la
contraseña desde Mi Perfil.

## Pruebas recomendadas

| Prueba                                 | Resultado esperado                                  |
|-----------------------------------------|------------------------------------------------------|
| Acceder a `/admin/dashboard` sin sesión | Redirige a `/login`                                  |
| Usuario con rol `user` entra a `/admin` | Redirige a `/unauthorized`                            |
| Usuario con rol `admin` entra a `/admin`| Acceso permitido                                      |
| Refrescar el navegador                  | La sesión se mantiene (token guardado en localStorage)|
| Cerrar sesión                           | Elimina token/usuario y vuelve a `/login`              |
| Crear / editar / eliminar usuario       | La tabla se actualiza sin recargar la página           |
