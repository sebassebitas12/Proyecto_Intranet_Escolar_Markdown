# Requerimientos

## Requerimientos funcionales

### Autenticación

- [x] Permitir iniciar sesión mediante usuario y contraseña.
- [x] Crear una sesión para el usuario autenticado.
- [x] Identificar el rol del usuario.
- [x] Redirigir al usuario al dashboard correspondiente.
- [x] Permitir cerrar sesión.
- [x] Impedir el acceso a dashboards sin una sesión válida.
- [x] Impedir que un usuario acceda al dashboard correspondiente a otro rol.

### Gestión de usuarios — Administrador

- [x] Consultar la lista de usuarios.
- [x] Crear usuarios.
- [x] Validar que los campos obligatorios estén completos.
- [x] Evitar la creación de usuarios duplicados.
- [x] Guardar las contraseñas utilizando bcrypt.
- [x] Editar usuarios.
- [x] Evitar duplicar nombres de usuario durante una edición.
- [x] Eliminar usuarios.
- [x] Mostrar mensajes de resultado dentro de la interfaz.
- [x] Permitir cancelar una acción de eliminación sin utilizar `confirm()`.

### Módulo académico

#### Calificaciones

- [x] Consultar calificaciones.
- [x] Permitir a las familias consultar las calificaciones correspondientes a su usuario.
- [x] Permitir a docentes y administradores consultar las calificaciones.
- [x] Permitir a docentes y administradores registrar calificaciones.
- [x] Validar que la nota se encuentre entre 0 y 100.
- [x] Registrar materia y período.
- [x] Asociar la calificación con el docente que la registra.

#### Asistencia

- [x] Consultar asistencia.
- [x] Permitir a las familias consultar la asistencia correspondiente.
- [x] Permitir a docentes y administradores consultar la asistencia.
- [x] Permitir a docentes y administradores registrar asistencia.
- [x] Validar el estado de asistencia.
- [x] Utilizar los estados permitidos `presente`, `ausente` y `tardanza`.
- [x] Asociar el registro con el docente que lo registra.

### Comunicados

- [x] Consultar comunicados.
- [x] Mostrar título, contenido, fecha y autor.
- [x] Permitir al administrador crear comunicados.
- [x] Validar los campos obligatorios al crear un comunicado.
- [x] Impedir que una familia cree comunicados.
- [x] Mantener la protección de la operación también en el servidor.

### Dashboards

- [x] Proporcionar un dashboard para administración.
- [x] Proporcionar un dashboard para docentes.
- [x] Proporcionar un dashboard para familias.
- [x] Mostrar información del usuario autenticado.
- [x] Proporcionar cierre de sesión desde cada dashboard.
- [x] Mostrar mensajes de carga y error dentro de la interfaz.

---

## Requerimientos no funcionales

### Seguridad

- [x] Utilizar sesiones para identificar usuarios autenticados.
- [x] Proteger las rutas mediante middleware.
- [x] Validar el rol antes de permitir operaciones restringidas.
- [x] Utilizar bcrypt para almacenar contraseñas de forma segura.
- [x] No depender únicamente de restricciones visuales del frontend.
- [x] No almacenar contraseñas en texto plano.

### Accesibilidad y usabilidad

- [x] Utilizar etiquetas asociadas a los campos de formulario.
- [x] Mantener controles de formulario utilizables mediante teclado.
- [x] Mostrar mensajes de estado en la interfaz.
- [x] Evitar `alert()`, `confirm()` y `prompt()` en las acciones administrativas principales.
- [x] Utilizar estados visuales de foco.
- [x] Mantener diseño responsive para pantallas pequeñas.

### Tecnologías

- [x] Utilizar Node.js y Express en el backend.
- [x] Utilizar HTML5, CSS3 y JavaScript puro en el frontend.
- [x] Utilizar archivos JSON como almacenamiento local.
- [x] No utilizar frameworks frontend.
- [x] Mantener las dependencias declaradas en `package.json`.

### Mantenibilidad

- [x] Separar las rutas por módulos.
- [x] Mantener middleware independiente para autenticación y autorización.
- [x] Mantener los archivos del frontend organizados por tipo.
- [x] Utilizar Git para versionar el proyecto.
- [x] Utilizar Conventional Commits.
- [x] Mantener documentación de instalación, uso y arquitectura.

---

## Roles y permisos

| Funcionalidad | Admin | Docente | Familia |
|---|---:|---:|---:|
| Iniciar sesión | Sí | Sí | Sí |
| Consultar usuarios | Sí | No | No |
| Crear usuarios | Sí | No | No |
| Editar usuarios | Sí | No | No |
| Eliminar usuarios | Sí | No | No |
| Consultar calificaciones | Sí | Sí | Sí |
| Registrar calificaciones | Sí | Sí | No |
| Consultar asistencia | Sí | Sí | Sí |
| Registrar asistencia | Sí | Sí | No |
| Crear comunicados | Sí | No | No |
| Consultar comunicados | Sí | Sí | Sí |
| Cerrar sesión | Sí | Sí | Sí |

---

## Criterios generales de aceptación

- [x] Un usuario válido puede iniciar sesión.
- [x] Un usuario inválido no puede acceder al sistema.
- [x] Cada usuario accede únicamente a las funcionalidades permitidas por su rol.
- [x] Las operaciones restringidas son rechazadas también desde el backend.
- [x] El administrador puede gestionar usuarios.
- [x] Los docentes pueden trabajar con información académica.
- [x] Las familias pueden consultar su información académica y los comunicados.
- [x] La aplicación puede ejecutarse localmente mediante `node src/server.js`.