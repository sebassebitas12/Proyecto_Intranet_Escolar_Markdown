const usuarioInfo = document.getElementById('usuarioInfo');
const usuariosContainer = document.getElementById('usuarios');
const comunicadosContainer = document.getElementById('comunicados');
const usuarioForm = document.getElementById('usuarioForm');
const comunicadoForm = document.getElementById('comunicadoForm');
const usuarioMensaje = document.getElementById('usuarioMensaje');
const comunicadoMensaje = document.getElementById('comunicadoMensaje');
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
    usuariosContainer.textContent =
      'No se pudieron cargar los usuarios.';
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

usuarioForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  usuarioMensaje.textContent = '';

  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    usuario: document.getElementById('usuario').value.trim(),
    contrasena: document.getElementById('contrasena').value,
    rol: document.getElementById('rol').value
  };

  const response = await fetch('/api/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const data = await response.json();

  if (!response.ok) {
    usuarioMensaje.textContent = data.error;
    return;
  }

  usuarioMensaje.textContent = 'Usuario creado correctamente.';
  usuarioForm.reset();

  await cargarUsuarios();
});

comunicadoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  comunicadoMensaje.textContent = '';

  const datos = {
    titulo: document.getElementById('titulo').value.trim(),
    contenido: document.getElementById('contenido').value.trim()
  };

  const response = await fetch('/api/comunicados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const data = await response.json();

  if (!response.ok) {
    comunicadoMensaje.textContent = data.error;
    return;
  }

  comunicadoMensaje.textContent =
    'Comunicado publicado correctamente.';

  comunicadoForm.reset();

  await cargarComunicados();
});

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