const usuarioInfo = document.getElementById('usuarioInfo');
const usuariosContainer = document.getElementById('usuarios');
const comunicadosContainer = document.getElementById('comunicados');
const logoutBtn = document.getElementById('logoutBtn');

async function cargarSesion() {
  const response = await fetch('/api/auth/me');

  if (!response.ok) {
    window.location.href = '/login.html';
    return null;
  }

  const data = await response.json();

  if (data.user.rol !== 'admin') {
    window.location.href = '/login.html';
    return null;
  }

  usuarioInfo.textContent =
    `Usuario: ${data.user.nombre} (${data.user.rol})`;

  return data.user;
}

async function cargarUsuarios() {
  const response = await fetch('/api/usuarios');

  if (!response.ok) {
    usuariosContainer.textContent = 'No se pudieron cargar los usuarios.';
    return;
  }

  const usuarios = await response.json();

  usuariosContainer.innerHTML = '';

  usuarios.forEach((usuario) => {
    const elemento = document.createElement('p');

    elemento.textContent =
      `${usuario.nombre} — ${usuario.usuario} — ${usuario.rol}`;

    usuariosContainer.appendChild(elemento);
  });
}

async function cargarComunicados() {
  const response = await fetch('/api/comunicados');

  if (!response.ok) {
    comunicadosContainer.textContent =
      'No se pudieron cargar los comunicados.';
    return;
  }

  const comunicados = await response.json();

  comunicadosContainer.innerHTML = '';

  comunicados.forEach((comunicado) => {
    const elemento = document.createElement('article');

    elemento.innerHTML = `
      <h3>${comunicado.titulo}</h3>
      <p>${comunicado.contenido}</p>
      <small>${comunicado.fecha}</small>
    `;

    comunicadosContainer.appendChild(elemento);
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

  await cargarUsuarios();
  await cargarComunicados();
}

iniciarDashboard();