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
    const elemento = document.createElement('div');

    elemento.innerHTML = `
      <p>
        <strong>${usuario.nombre}</strong>
        — ${usuario.usuario}
        — ${usuario.rol}
      </p>

      <button type="button"
        onclick="editarUsuario(${usuario.id}, '${usuario.nombre.replace(/'/g, "\\'")}')">
        Editar
      </button>

      <button type="button"
        onclick="mostrarEliminar(${usuario.id})">
        Eliminar
      </button>

      <div id="eliminar-${usuario.id}" class="hidden">
        <p>¿Eliminar este usuario?</p>

        <button type="button"
          onclick="eliminarUsuario(${usuario.id})">
          Sí, eliminar
        </button>

        <button type="button"
          onclick="cancelarEliminar(${usuario.id})">
          Cancelar
        </button>
      </div>

      <hr>
    `;

    usuariosContainer.appendChild(elemento);
  });
}

function editarUsuario(id, nombreActual) {
  const mensaje = document.getElementById('usuarioAccionMensaje');

  mensaje.innerHTML = `
    <label for="nuevoNombre">
      Nuevo nombre
    </label>

    <input
      type="text"
      id="nuevoNombre"
      value="${nombreActual.replace(/"/g, '&quot;')}"
    >

    <button type="button" onclick="guardarEdicion(${id})">
      Guardar
    </button>

    <button type="button" onclick="cancelarEdicion()">
      Cancelar
    </button>
  `;

  document.getElementById('nuevoNombre').focus();
}

async function guardarEdicion(id) {
  const input = document.getElementById('nuevoNombre');
  const mensaje = document.getElementById('usuarioAccionMensaje');

  if (!input.value.trim()) {
    mensaje.textContent = 'El nombre no puede estar vacío.';
    return;
  }

  const response = await fetch(`/api/usuarios/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: input.value.trim()
    })
  });

  const data = await response.json();

  if (!response.ok) {
    mensaje.textContent =
      data.error || 'No se pudo editar el usuario.';
    return;
  }

  mensaje.textContent = 'Usuario actualizado correctamente.';

  await cargarUsuarios();
}

function cancelarEdicion() {
  document.getElementById('usuarioAccionMensaje').textContent = '';
}

function mostrarEliminar(id) {
  const elemento = document.getElementById(`eliminar-${id}`);

  elemento.classList.remove('hidden');
}

function cancelarEliminar(id) {
  const elemento = document.getElementById(`eliminar-${id}`);

  elemento.classList.add('hidden');
}

async function eliminarUsuario(id) {
  const mensaje = document.getElementById('usuarioAccionMensaje');

  const response = await fetch(`/api/usuarios/${id}`, {
    method: 'DELETE'
  });

  const data = await response.json();

  if (!response.ok) {
    mensaje.textContent =
      data.error || 'No se pudo eliminar el usuario.';
    return;
  }

  mensaje.textContent = 'Usuario eliminado correctamente.';

  await cargarUsuarios();
}