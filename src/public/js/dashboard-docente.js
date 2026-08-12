const usuarioInfo = document.getElementById('usuarioInfo');

const calificacionesContainer =
  document.getElementById('calificaciones');

const asistenciaContainer =
  document.getElementById('asistencia');

const calificacionForm =
  document.getElementById('calificacionForm');

const asistenciaForm =
  document.getElementById('asistenciaForm');

const calificacionMensaje =
  document.getElementById('calificacionMensaje');

const asistenciaMensaje =
  document.getElementById('asistenciaMensaje');

const logoutBtn =
  document.getElementById('logoutBtn');


async function cargarSesion() {
  const response = await fetch('/api/auth/me');

  if (!response.ok) {
    window.location.href = '/login.html';
    return null;
  }

  const data = await response.json();

  if (!data.user || data.user.rol !== 'docente') {
    window.location.href = '/login.html';
    return null;
  }

  usuarioInfo.textContent =
    `Usuario: ${data.user.nombre} (${data.user.rol})`;

  return data.user;
}


async function cargarCalificaciones() {
  const response =
    await fetch('/api/academico/calificaciones');

  if (!response.ok) {
    calificacionesContainer.textContent =
      'No se pudieron cargar las calificaciones.';
    return;
  }

  const calificaciones = await response.json();

  calificacionesContainer.innerHTML = '';

  if (calificaciones.length === 0) {
    calificacionesContainer.innerHTML =
      '<p>No hay calificaciones registradas.</p>';

    return;
  }

  calificaciones.forEach((item) => {
    const elemento = document.createElement('p');

    elemento.textContent =
      `Estudiante ${item.estudianteId} — ` +
      `${item.materia} — ` +
      `${item.nota} — ` +
      `${item.periodo}`;

    calificacionesContainer.appendChild(elemento);
  });
}


async function cargarAsistencia() {
  const response =
    await fetch('/api/academico/asistencia');

  if (!response.ok) {
    asistenciaContainer.textContent =
      'No se pudo cargar la asistencia.';
    return;
  }

  const asistencia = await response.json();

  asistenciaContainer.innerHTML = '';

  if (asistencia.length === 0) {
    asistenciaContainer.innerHTML =
      '<p>No hay registros de asistencia.</p>';

    return;
  }

  asistencia.forEach((item) => {
    const elemento = document.createElement('p');

    elemento.textContent =
      `Estudiante ${item.estudianteId} — ` +
      `${item.fecha} — ` +
      `${item.estado}`;

    asistenciaContainer.appendChild(elemento);
  });
}


calificacionForm.addEventListener(
  'submit',
  async (event) => {
    event.preventDefault();

    calificacionMensaje.textContent = '';

    const datos = {
      estudianteId:
        document
          .getElementById('calificacionEstudianteId')
          .value,

      materia:
        document
          .getElementById('calificacionMateria')
          .value
          .trim(),

      nota:
        document
          .getElementById('calificacionNota')
          .value,

      periodo:
        document
          .getElementById('calificacionPeriodo')
          .value
          .trim()
    };


    const response = await fetch(
      '/api/academico/calificaciones',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(datos)
      }
    );


    const data = await response.json();


    if (!response.ok) {
      calificacionMensaje.textContent =
        data.error ||
        'No se pudo registrar la calificación.';

      return;
    }


    calificacionMensaje.textContent =
      'Calificación registrada correctamente.';


    calificacionForm.reset();

    await cargarCalificaciones();
  }
);


asistenciaForm.addEventListener(
  'submit',
  async (event) => {
    event.preventDefault();

    asistenciaMensaje.textContent = '';

    const datos = {
      estudianteId:
        document
          .getElementById('asistenciaEstudianteId')
          .value,

      fecha:
        document
          .getElementById('asistenciaFecha')
          .value,

      estado:
        document
          .getElementById('asistenciaEstado')
          .value
    };


    const response = await fetch(
      '/api/academico/asistencia',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(datos)
      }
    );


    const data = await response.json();


    if (!response.ok) {
      asistenciaMensaje.textContent =
        data.error ||
        'No se pudo registrar la asistencia.';

      return;
    }


    asistenciaMensaje.textContent =
      'Asistencia registrada correctamente.';


    asistenciaForm.reset();

    await cargarAsistencia();
  }
);


logoutBtn.addEventListener(
  'click',
  async () => {

    await fetch(
      '/api/auth/logout',
      {
        method: 'POST'
      }
    );

    window.location.href = '/login.html';
  }
);


async function iniciarDashboard() {
  const usuario = await cargarSesion();

  if (!usuario) {
    return;
  }

  await cargarCalificaciones();

  await cargarAsistencia();
}


iniciarDashboard();