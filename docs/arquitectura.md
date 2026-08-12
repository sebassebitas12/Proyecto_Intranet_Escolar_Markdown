# Arquitectura del Sistema

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Servidor | Node.js + Express |
| Frontend | HTML5, CSS3, JavaScript puro |
| Almacenamiento | JSON (archivos locales) |
| Autenticación | Sesiones por rol en memoria |

## Estructura del proyecto
src/
├── server.js ← punto de entrada
├── routes/ ← rutas por módulo
├── middleware/ ← protección por rol
├── controllers/ ← lógica de negocio
├── data/ ← archivos JSON
└── public/ ← frontend
├── css/
├── js/
└── *.html
## Flujo de autenticación
Usuario ingresa credenciales
↓
auth.routes.js valida usuario en usuarios.json
↓
Se guarda rol en sesión
↓
Redirige al dashboard según rol

## Roles del sistema

| Rol | Acceso |
|-----|--------|
| `admin` | Todo el sistema |
| `docente` | Calificaciones y asistencia |
| `familia` | Consulta de notas y comunicados |

## Decisiones técnicas

- **JSON sobre BD**: proyecto educativo, sin necesidad de persistencia compleja
- **Express**: servidor minimalista, fácil de entender y configurar
- **Sin frameworks frontend**: cumplir requisito del curso de JS puro