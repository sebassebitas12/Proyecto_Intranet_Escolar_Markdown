# CLAUDE.md — Memoria del Agente

## Contexto

Intranet Escolar es un sistema web de gestión académica y comunicación escolar.

Stack tecnológico:

- Node.js
- Express
- HTML5
- CSS3
- JavaScript puro
- JSON para almacenamiento local

El sistema utiliza tres roles:

- `admin`
- `docente`
- `familia`

El acceso se realiza mediante navegador web y las sesiones se gestionan mediante `express-session`.

No se utiliza una base de datos externa.

---

## Requerimientos

### Funcionales

- [x] Autenticación mediante usuario y contraseña.
- [x] Identificación del usuario mediante sesión.
- [x] Control de acceso según rol.
- [x] Gestión de usuarios por parte del administrador.
- [x] Crear usuarios.
- [x] Consultar usuarios.
- [x] Editar usuarios.
- [x] Eliminar usuarios.
- [x] Consultar calificaciones.
- [x] Registrar calificaciones para docentes y administradores.
- [x] Consultar asistencia.
- [x] Registrar asistencia para docentes y administradores.
- [x] Crear comunicados por parte del administrador.
- [x] Consultar comunicados.
- [x] Dashboard específico para administración.
- [x] Dashboard específico para docentes.
- [x] Dashboard específico para familias.
- [x] Cerrar sesión.

### No funcionales

- [x] Interfaz clara y responsive.
- [x] Formularios con validación básica.
- [x] Mensajes de estado dentro de la interfaz.
- [x] Evitar diálogos `alert`, `confirm` y `prompt` para las acciones de administración.
- [x] Contraseñas almacenadas mediante hash con bcrypt.
- [x] Rutas protegidas mediante middleware.
- [x] Código versionado mediante Git.
- [x] Uso de Conventional Commits.
- [x] No utilizar frameworks frontend.

---

## Reglas

- Mantener la separación entre frontend, rutas, middleware y datos.
- Las rutas protegidas deben validar la autenticación y el rol correspondiente.
- Las contraseñas nunca deben almacenarse en texto plano.
- Utilizar `camelCase` para variables y funciones de JavaScript.
- Mantener un archivo de rutas separado para cada módulo principal.
- Utilizar Conventional Commits para los cambios del proyecto.
- Mantener los archivos JSON legibles y correctamente estructurados.
- Mantener la documentación actualizada cuando cambie una funcionalidad.
- Evitar lógica innecesaria en el frontend cuando una validación de seguridad debe realizarse en el servidor.

---

## Restricciones

- No utilizar React, Vue, Angular u otros frameworks frontend.
- No utilizar una base de datos externa.
- No guardar contraseñas en texto plano.
- No depender únicamente del frontend para controlar permisos.
- No permitir que un usuario de un rol inferior ejecute operaciones administrativas mediante solicitudes HTTP.
- No exponer información innecesaria de otros usuarios.
- No utilizar diálogos del navegador para las acciones principales de la interfaz administrativa.
- Mantener el almacenamiento de datos en archivos JSON mientras el proyecto conserve su alcance educativo.

---

## Objetivos

- Mantener funcionando el inicio de sesión por roles.
- Mantener la separación de permisos entre administración, docentes y familias.
- Permitir al administrador gestionar usuarios.
- Permitir consultar y registrar información académica.
- Permitir publicar y consultar comunicados.
- Mantener una interfaz sencilla, accesible y responsive.
- Mantener el proyecto documentado y preparado para evaluación.

---

## Memoria del proyecto

- 2026-08: Se estableció Node.js + Express como backend.
- 2026-08: Se eligió JSON como mecanismo de almacenamiento local.
- 2026-08: Se definieron los roles `admin`, `docente` y `familia`.
- 2026-08: Se implementó autenticación mediante sesiones.
- 2026-08: Se implementó middleware para protección de rutas.
- 2026-08: Se implementó la gestión administrativa de usuarios.
- 2026-08: Se implementaron calificaciones y asistencia.
- 2026-08: Se implementó el módulo de comunicados.
- 2026-08: Se crearon dashboards independientes para cada rol.
- 2026-08: Se reemplazaron los diálogos del navegador utilizados para administrar usuarios por controles integrados en la interfaz.
- 2026-08: Se añadió documentación del proyecto para facilitar instalación, evaluación y mantenimiento.

---

## Buenas prácticas

- Documentar el motivo de las decisiones importantes, no únicamente describir qué hace el código.
- Validar permisos mediante middleware antes de ejecutar operaciones protegidas.
- Mantener las responsabilidades separadas entre rutas, middleware, frontend y almacenamiento.
- Validar los datos recibidos por las rutas antes de guardarlos.
- Evitar duplicación de lógica cuando pueda reutilizarse de forma clara.
- Mantener mensajes de error comprensibles para el usuario.
- Mantener los JSON ordenados y legibles.
- Probar cada rol después de realizar cambios relacionados con permisos.
- Verificar que los cambios del frontend no sustituyan las validaciones de seguridad del backend.