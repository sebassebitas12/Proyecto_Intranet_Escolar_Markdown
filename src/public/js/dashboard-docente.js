const usuarioInfo = document.getElementById('usuarioInfo');
const calificacionesContainer = document.getElementById('calificaciones');
const asistenciaContainer = document.getElementById('asistencia');
const logoutBtn = document.getElementById('logoutBtn');

async function cargarSesion() {
  const response = await fetch('/api/auth/me');

  if (!response.ok) {
    window.location.href = '/login.html';
    return null;
  }

  const data = await response.json();

  if (data.user.rol !== 'docente') {
    window.location.href = '/login.html';
    return null;
  }

  usuarioInfo.textContent =
    `Usuario: ${data.user.nombre} (${data.user.rol})`;

  return data.user;
}

async function cargarCalificaciones() {
  const response = await fetch('/api/academico/calificaciones');

  if (!response.ok) {
    calificacionesContainer.textContent =
      'No se pudieron cargar las calificaciones.';
    return;
  }

  const calificaciones = await response.json();

  calificacionesContainer.innerHTML = '';

  calificaciones.forEach((item) => {
    const elemento = document.createElement('p');

    elemento.textContent =
      `Estudiante ${item.estudianteId} — ${item.materia} — ${item.nota} — ${item.periodo}`;

    calificacionesContainer.appendChild(elemento);
  });
}

async function cargarAsistencia() {
  const response = await fetch('/api/academico/asistencia');

  if (!response.ok) {
    asistenciaContainer.textContent =
      'No se pudo cargar la asistencia.';
    return;
  }

  const asistencia = await response.json();

  asistenciaContainer.innerHTML = '';

  asistencia.forEach((item) => {
    const elemento = document.createElement('p');

    elemento.textContent =
      `Estudiante ${item.estudianteId} — ${item.fecha} — ${item.estado}`;

    asistenciaContainer.appendChild(elemento);
  });
}

logoutBtn.addEventListener('click', async () => {
  await fetch('/api/auth/logout', {
    method: 'POST'
  });

  window.location.href = '/login.html';
});

async function iniciarDashboard() {
  const usuario = await cargarSesion();

  if (!usuario) {
    return;
  }

  await cargarCalificaciones();
  await cargarAsistencia();
}

iniciarDashboard();