const usuarioInfo =
  document.getElementById('usuarioInfo');

const calificacionesContainer =
  document.getElementById('calificaciones');

const asistenciaContainer =
  document.getElementById('asistencia');

const comunicadosContainer =
  document.getElementById('comunicados');

const calificacionesMensaje =
  document.getElementById('calificacionesMensaje');

const asistenciaMensaje =
  document.getElementById('asistenciaMensaje');

const comunicadosMensaje =
  document.getElementById('comunicadosMensaje');

const logoutBtn =
  document.getElementById('logoutBtn');


async function cargarSesion() {
  const response =
    await fetch('/api/auth/me');

  if (!response.ok) {
    window.location.href = '/login.html';
    return null;
  }

  const data = await response.json();

  if (!data.user || data.user.rol !== 'familia') {
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

  const calificaciones =
    await response.json();

  calificacionesContainer.innerHTML = '';

  if (calificaciones.length === 0) {
    calificacionesContainer.innerHTML =
      '<p>No hay calificaciones disponibles.</p>';

    return;
  }

  const lista =
    document.createElement('ul');

  calificaciones.forEach((item) => {
    const elemento =
      document.createElement('li');

    elemento.textContent =
      `${item.materia} — ` +
      `${item.nota} — ` +
      `${item.periodo}`;

    lista.appendChild(elemento);
  });

  calificacionesContainer.appendChild(lista);
}


async function cargarAsistencia() {
  const response =
    await fetch('/api/academico/asistencia');

  if (!response.ok) {
    asistenciaContainer.textContent =
      'No se pudo cargar la asistencia.';

    return;
  }

  const asistencia =
    await response.json();

  asistenciaContainer.innerHTML = '';

  if (asistencia.length === 0) {
    asistenciaContainer.innerHTML =
      '<p>No hay registros de asistencia disponibles.</p>';

    return;
  }

  const lista =
    document.createElement('ul');

  asistencia.forEach((item) => {
    const elemento =
      document.createElement('li');

    elemento.textContent =
      `${item.fecha} — ${item.estado}`;

    lista.appendChild(elemento);
  });

  asistenciaContainer.appendChild(lista);
}


async function cargarComunicados() {
  const response =
    await fetch('/api/comunicados');

  if (!response.ok) {
    comunicadosContainer.textContent =
      'No se pudieron cargar los comunicados.';

    return;
  }

  const comunicados =
    await response.json();

  comunicadosContainer.innerHTML = '';

  if (comunicados.length === 0) {
    comunicadosContainer.innerHTML =
      '<p>No hay comunicados disponibles.</p>';

    return;
  }

  comunicados.forEach((item) => {
    const elemento =
      document.createElement('article');

    const titulo =
      document.createElement('h3');

    const contenido =
      document.createElement('p');

    const fecha =
      document.createElement('small');

    titulo.textContent = item.titulo;

    contenido.textContent =
      item.contenido;

    fecha.textContent =
      `Fecha: ${item.fecha}`;

    elemento.appendChild(titulo);
    elemento.appendChild(contenido);
    elemento.appendChild(fecha);

    comunicadosContainer.appendChild(elemento);
  });
}


logoutBtn.addEventListener(
  'click',
  async () => {

    await fetch(
      '/api/auth/logout',
      {
        method: 'POST'
      }
    );

    window.location.href =
      '/login.html';
  }
);


async function iniciarDashboard() {
  const usuario =
    await cargarSesion();

  if (!usuario) {
    return;
  }

  await cargarCalificaciones();

  await cargarAsistencia();

  await cargarComunicados();
}


iniciarDashboard();