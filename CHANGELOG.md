# Changelog

Todos los cambios importantes del proyecto se documentan en este archivo.

## [0.1.0] — 2026-08-12

### Agregado

* Estructura inicial del proyecto Intranet Escolar.
* Servidor Node.js con Express.
* Configuración de sesiones mediante `express-session`.
* Autenticación mediante usuario y contraseña.
* Protección de contraseñas mediante bcrypt.
* Middleware de autenticación y autorización por roles.
* Roles `admin`, `docente` y `familia`.
* Rutas de autenticación.
* Rutas de gestión de usuarios.
* Rutas académicas.
* Rutas de comunicados.
* Almacenamiento local mediante archivos JSON.
* Dashboard administrativo.
* Dashboard docente.
* Dashboard familiar.
* Página de inicio de sesión.
* Consulta de usuarios.
* Creación de usuarios.
* Edición de usuarios.
* Eliminación de usuarios.
* Consulta de calificaciones.
* Registro de calificaciones.
* Consulta de asistencia.
* Registro de asistencia.
* Consulta de comunicados.
* Creación de comunicados por administración.
* Validaciones de datos en las rutas.
* Restricciones de acceso según rol.
* Cierre de sesión.
* Estilos compartidos para los dashboards.
* Diseño responsive.
* Estados de foco para controles interactivos.
* Mensajes de estado dentro de la interfaz.
* Interfaz administrativa sin uso de `alert()`, `confirm()` ni `prompt()` para las acciones principales.
* Documentación de instalación y ejecución.
* Documentación de arquitectura.
* Documentación de requerimientos.
* Guía de contribución.
* Memoria del agente mediante `CLAUDE.md`.

### Seguridad

* Se protegieron las rutas administrativas mediante autorización por rol.
* Se impidió que usuarios de familia creen comunicados.
* Se impidió que usuarios no administrativos gestionen usuarios.
* Se validó el acceso a las rutas protegidas desde el servidor.
* Las contraseñas se almacenan mediante bcrypt.
* Se utilizan sesiones para mantener la autenticación.

### Documentación

* Se añadió `README.md`.
* Se añadió `CONTRIBUTING.md`.
* Se añadió `CHANGELOG.md`.
* Se añadió `CLAUDE.md`.
* Se añadió `docs/arquitectura.md`.
* Se añadió `docs/requerimientos.md`.

## Historial de desarrollo

El proyecto fue desarrollado progresivamente mediante commits separados utilizando Conventional Commits.

Entre los cambios realizados se incluyen:

* Configuración inicial de estilos.
* Creación de dashboard familiar.
* Creación de dashboard docente.
* Creación de formularios administrativos.
* Mejoras de validación de usuarios.
* Mejoras en eliminación de usuarios.
* Configuración de sesiones mediante variables de entorno.
* Sustitución de diálogos del navegador por controles integrados en la interfaz.
* Implementación de autenticación y control de acceso por roles.
