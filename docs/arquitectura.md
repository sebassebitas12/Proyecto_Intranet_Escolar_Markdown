# Arquitectura del Sistema

## Descripción general

Intranet Escolar utiliza una arquitectura web sencilla basada en Node.js y Express.

El backend proporciona las rutas de autenticación, usuarios, información académica y comunicados.

El frontend está compuesto por páginas HTML, hojas de estilo CSS y archivos JavaScript que consumen las API mediante `fetch()`.

Los datos se almacenan localmente en archivos JSON.

## Stack tecnológico

| Capa              | Tecnología                |
| ----------------- | ------------------------- |
| Servidor          | Node.js + Express         |
| Frontend          | HTML5 + CSS3 + JavaScript |
| Almacenamiento    | Archivos JSON             |
| Autenticación     | express-session           |
| Contraseñas       | bcrypt                    |
| Control de acceso | Middleware                |
| Versionamiento    | Git                       |

## Estructura real del proyecto

```text
Intranet_Markdown/
│
├── src/
│   ├── data/
│   │   ├── asistencia.json
│   │   ├── calificaciones.json
│   │   ├── comunicados.json
│   │   └── usuarios.json
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css
│   │   │
│   │   ├── js/
│   │   │   ├── dashboard-admin.js
│   │   │   ├── dashboard-docente.js
│   │   │   ├── dashboard-familia.js
│   │   │   └── login.js
│   │   │
│   │   ├── dashboard-admin.html
│   │   ├── dashboard-docente.html
│   │   ├── dashboard-familia.html
│   │   └── login.html
│   │
│   ├── routes/
│   │   ├── academico.routes.js
│   │   ├── auth.routes.js
│   │   ├── comunicados.routes.js
│   │   └── usuarios.routes.js
│   │
│   └── server.js
│
├── docs/
│   ├── arquitectura.md
│   └── requerimientos.md
│
├── .env
├── .gitignore
├── CHANGELOG.md
├── CLAUDE.md
├── CONTRIBUTING.md
├── package.json
├── package-lock.json
└── README.md
```

## Responsabilidad de cada capa

### `src/server.js`

Es el punto de entrada de la aplicación.

Se encarga de:

* Inicializar Express.
* Configurar middleware.
* Configurar sesiones.
* Servir los archivos públicos.
* Registrar las rutas de la aplicación.
* Iniciar el servidor.

### `src/routes/`

Contiene las rutas de la API.

Los módulos actuales son:

* `auth.routes.js`
* `usuarios.routes.js`
* `academico.routes.js`
* `comunicados.routes.js`

Cada archivo concentra las operaciones relacionadas con su módulo.

### `src/middleware/`

Contiene la lógica reutilizable relacionada con autenticación y autorización.

El middleware verifica que exista una sesión válida y que el usuario tenga el rol necesario para ejecutar determinadas operaciones.

### `src/data/`

Contiene los archivos JSON utilizados como almacenamiento local.

Los archivos actuales son:

* `usuarios.json`
* `calificaciones.json`
* `asistencia.json`
* `comunicados.json`

### `src/public/`

Contiene la interfaz web.

Se divide en:

* `css/` para estilos.
* `js/` para lógica del frontend.
* Archivos `.html` para las diferentes vistas.

## Flujo de autenticación

```text
Usuario
   │
   ▼
login.html
   │
   ▼
login.js
   │
   │ POST /api/auth/login
   ▼
auth.routes.js
   │
   ▼
usuarios.json
   │
   ▼
bcrypt verifica contraseña
   │
   ▼
Se crea la sesión
   │
   ▼
Se identifica el rol
   │
   ├── admin ───────► dashboard-admin.html
   │
   ├── docente ─────► dashboard-docente.html
   │
   └── familia ─────► dashboard-familia.html
```

## Flujo de una solicitud protegida

```text
Frontend
   │
   ▼
Solicitud HTTP
   │
   ▼
Ruta Express
   │
   ▼
Middleware de autenticación
   │
   ├── Sin sesión ──► 401
   │
   ▼
Middleware de autorización
   │
   ├── Rol incorrecto ──► 403
   │
   ▼
Lógica de la ruta
   │
   ▼
Archivo JSON
   │
   ▼
Respuesta HTTP
   │
   ▼
Frontend
```

## Roles

| Rol       | Acceso principal                                         |
| --------- | -------------------------------------------------------- |
| `admin`   | Gestión de usuarios, comunicados e información académica |
| `docente` | Consulta y registro de información académica             |
| `familia` | Consulta de información académica y comunicados          |

Los permisos se validan en el servidor y no únicamente mediante la interfaz.

## API principal

### Autenticación

```text
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Usuarios

```text
GET    /api/usuarios
POST   /api/usuarios
PUT    /api/usuarios/:id
DELETE /api/usuarios/:id
```

Estas operaciones administrativas están protegidas para el rol `admin`.

### Calificaciones

```text
GET  /api/academico/calificaciones
POST /api/academico/calificaciones
```

La consulta está disponible según el rol.

El registro está restringido a `docente` y `admin`.

### Asistencia

```text
GET  /api/academico/asistencia
POST /api/academico/asistencia
```

La consulta está disponible según el rol.

El registro está restringido a `docente` y `admin`.

### Comunicados

```text
GET  /api/comunicados
POST /api/comunicados
```

La creación de comunicados está restringida al administrador.

## Decisiones técnicas

### JSON sobre base de datos

Se utiliza JSON porque el proyecto tiene un alcance educativo y no requiere una base de datos externa.

Esto permite ejecutar el sistema localmente sin configuraciones adicionales.

### Express

Express proporciona una estructura sencilla para crear las rutas HTTP, middleware y servidor.

### JavaScript puro

El frontend no utiliza React, Vue ni Angular.

Esto permite mantener el proyecto sencillo y cumplir con el uso de JavaScript puro.

### Sesiones

Las sesiones permiten mantener identificado al usuario entre las diferentes solicitudes HTTP.

### bcrypt

bcrypt permite almacenar las contraseñas mediante hash en lugar de texto plano.

## Seguridad

Las restricciones de acceso se implementan en el backend.

El frontend puede ocultar o mostrar determinadas funcionalidades, pero la seguridad no depende de esa presentación.

Antes de ejecutar una operación protegida se valida:

1. Que exista una sesión.
2. Que el usuario tenga el rol necesario.
3. Que los datos recibidos sean válidos.

Esto permite rechazar solicitudes no autorizadas aunque sean realizadas directamente contra la API.

## Frontend

Cada rol dispone de su propia página:

* `dashboard-admin.html`
* `dashboard-docente.html`
* `dashboard-familia.html`

Cada dashboard utiliza un archivo JavaScript independiente:

* `dashboard-admin.js`
* `dashboard-docente.js`
* `dashboard-familia.js`

Todos comparten:

```text
style.css
```

Esto permite mantener una apariencia consistente en toda la aplicación.

## Almacenamiento

El sistema utiliza los siguientes archivos JSON:

```text
src/data/usuarios.json
src/data/calificaciones.json
src/data/asistencia.json
src/data/comunicados.json
```

Las operaciones de escritura actualizan estos archivos directamente.

Esta solución es adecuada para el alcance actual del proyecto educativo, pero una aplicación de producción con múltiples usuarios concurrentes requeriría un mecanismo de persistencia más robusto.
