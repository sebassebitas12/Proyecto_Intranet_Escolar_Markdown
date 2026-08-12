# CLAUDE.md — Memoria del Agente

## Contexto
Intranet escolar para una institución pública de Costa Rica.
Stack: Node.js + Express + JSON (sin base de datos).
Usuarios: administración, docentes, estudiantes y familias.
Acceso web interno desde navegador.

## Requerimientos

### Funcionales
- [x] Autenticación por roles (admin, docente, familia)
- [ ] Gestión de usuarios (alta, baja, edición)
- [ ] Registro de calificaciones
- [ ] Control de asistencia
- [ ] Tablón de comunicados

### No funcionales
- Interfaz clara y accesible
- Datos sensibles protegidos
- Código versionado en Git

## Reglas
- Nombres de archivos en inglés con kebab-case
- Variables en camelCase
- Un archivo por ruta (auth, usuarios, academico, comunicados)
- Conventional Commits obligatorio

## Restricciones
- NO exponer datos personales de menores en la interfaz
- NO guardar contraseñas en texto plano
- NO usar frameworks de frontend (React, Vue, Angular)
- NO usar base de datos externa

## Objetivos
- Login por roles funcionando
- Módulo de calificaciones consultable por familias
- Tablón de comunicados operativo

## Memoria del proyecto
- 2026-08: Se eligió JSON como almacenamiento (sin BD, proyecto educativo)
- 2026-08: Se eligió Express como servidor por simplicidad
- 2026-08: Tres roles definidos: admin, docente, familia

## Buenas prácticas
- Documentar el "por qué", no el "qué"
- Validar rol en middleware antes de cada ruta protegida
- Mantener los JSON ordenados y legibles