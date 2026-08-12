# Contribución

## Ramas

| Rama | Uso |
|------|-----|
| `master` | Código estable y entregable |
| `dev` | Desarrollo del día a día |
| `feature/nombre` | Funcionalidad nueva |

## Flujo de trabajo

1. Crea tu rama desde `dev`:

```bash
git checkout -b feature/nombre-feature
```

2. Haz tus cambios y commitea:

```bash
git add .
git commit -m "feat: descripción del cambio"
```

3. Sube tu rama:

```bash
git push origin feature/nombre-feature
```

4. Abre un Pull Request hacia `dev`

## Conventional Commits

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de error |
| `chore:` | Configuración o estructura |
| `docs:` | Documentación |
| `style:` | Estilos visuales |

## Revisión

- Todo PR debe ser revisado antes de mergear a `master`
- No hacer push directo a `master`