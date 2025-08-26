# Tercer Avance - Gestión de Alumnos (Angular)

<p align="center">
  <img src="https://jobs.coderhouse.com/assets/logos_coderhouse.png" alt="CoderHouse" height="100"/>
</p>

Aplicación Angular para gestionar alumnos, cursos e inscripciones. Integra autenticación básica por roles y consumo de APIs MockAPI.

## Requisitos y ejecución

- Node.js y npm instalados
- Instalar dependencias: `npm install`
- Ejecutar en desarrollo: `npm start` y abrir `http://localhost:4200/`

Scripts útiles:
- `npm start`: inicia el servidor de desarrollo
- `npm run build`: compila a producción en `dist/`
- `npm test`: ejecuta tests unitarios (si aplica)

## Autenticación

Credenciales de demo (definidas en `src/app/core/auth/auth.ts`):
- Admin: usuario `admin` / contraseña `admin`
- Usuario: usuario `user` / contraseña `user`

El rol `admin` habilita acciones de edición y eliminación.

## Endpoints (MockAPI)

- Alumnos: `https://689296dfc49d24bce867de63.mockapi.io/api/v1/students`
  - Archivo: `src/app/features/alumnos/alumnos-api.ts`

- Cursos: `https://689296dfc49d24bce867de63.mockapi.io/api/v1/courses`
  - Archivo: `src/app/features/cursos/cursos-api.ts`
  - Vista: `src/app/features/cursos/cursos.html`

- Inscripciones: `https://68a42ed2c123272fb9b1aaeb.mockapi.io/api/v1/inscripciones`
  - Archivo (carga de lista): `src/app/features/inscripciones/inscripciones.ts`

Colecciones esperadas por la app (enum `DbRoutes`): `students`, `courses`, `inscripciones`.

## Modelos de datos

Student (`src/shared/entities.ts`):
- `id?: string` (MockAPI)
- `name: string`
- `surname: string`
- `age: number`
- `dni: number`
- `average: number` (la UI valida 0–10)

Course (`src/shared/entities.ts`):
- `id: string`
- `name: string`
- `code: string | number` (MockAPI puede devolver numérico; la UI solo lo muestra)
- `credits: number`

Inscripción (referencial; configurable en MockAPI):
- `id: string`
- `studentId: string` (referencia a `students.id`)
- `courseId: string` (referencia a `courses.id`)
- `date?: string` (ISO)
- `status?: string`

Notas importantes:
- La UI utiliza `dni` para mostrar, pero los servicios usan `id` de MockAPI para PUT/DELETE si está presente (fallback a `dni`).
- Si cambias a `average` en escala 0–100 en la API, ajusta los validadores en los formularios.

## Estructura relevante

- Alumnos: `src/app/features/alumnos/*`
- Cursos: `src/app/features/cursos/*`
- Inscripciones: `src/app/features/inscripciones/*`
- Tabla alumnos: `src/app/students-table/*`
- Login: `src/app/login/*`
- Enrutado: `src/app/app.routes.ts`

## Personalización de endpoints

- Alumnos: editar `baseUrl` en `src/app/features/alumnos/alumnos-api.ts`
- Cursos: editar `baseUrl` en `src/app/features/cursos/cursos-api.ts`
- Inscripciones: editar `baseUrl` en `src/app/features/inscripciones/inscripciones.ts`

Sugerencia: mover URLs a `environments` para evitar hardcodear en código fuente.

## Estilo de commits

Se utiliza Conventional Commits. Ejemplos:
- `feat(alumnos): switch to MockAPI and use id for CRUD if present`
- `fix(login): remove left whitespace and center headings`
- `docs(readme): add Spanish project documentation and MockAPI setup`

---

Generado con [Angular CLI](https://github.com/angular/angular-cli) v20.1.0.
