const usuarioInfo = document.getElementById('usuarioInfo');
const usuariosContainer = document.getElementById('usuarios');
const comunicadosContainer = document.getElementById('comunicados');

const usuarioForm = document.getElementById('usuarioForm');
const comunicadoForm = document.getElementById('comunicadoForm');

const usuarioMensaje = document.getElementById('usuarioMensaje');
const usuarioAccionMensaje =
  document.getElementById('usuarioAccionMensaje');

const comunicadoMensaje =
  document.getElementById('comunicadoMensaje');

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

  if (usuarios.length === 0) {
    usuariosContainer.textContent =
      'No hay usuarios registrados.';
    return;
  }

  usuarios.forEach((usuario) => {
    const elemento = document.createElement('div');

    const informacion = document.createElement('p');

    const nombre = document.createElement('strong');
    nombre.textContent = usuario.nombre;

    informacion.appendChild(nombre);

    informacion.appendChild(
      document.createTextNode(
        ` — ${usuario.usuario} — ${usuario.rol}`
      )
    );

    elemento.appendChild(informacion);


    const editarBtn = document.createElement('button');

    editarBtn.type = 'button';
    editarBtn.textContent = 'Editar';

    editarBtn.addEventListener('click', () => {
      editarUsuario(
        usuario.id,
        usuario.nombre
      );
    });

    elemento.appendChild(editarBtn);


    const eliminarBtn = document.createElement('button');

    eliminarBtn.type = 'button';
    eliminarBtn.textContent = 'Eliminar';

    eliminarBtn.addEventListener('click', () => {
      mostrarEliminar(usuario.id);
    });

    elemento.appendChild(eliminarBtn);


    const confirmacion = document.createElement('div');

    confirmacion.id = `eliminar-${usuario.id}`;
    confirmacion.className = 'hidden';

    const pregunta = document.createElement('p');

    pregunta.textContent =
      '¿Deseas eliminar este usuario?';

    confirmacion.appendChild(pregunta);


    const confirmarBtn = document.createElement('button');

    confirmarBtn.type = 'button';
    confirmarBtn.textContent = 'Sí, eliminar';

    confirmarBtn.addEventListener('click', () => {
      eliminarUsuario(usuario.id);
    });

    confirmacion.appendChild(confirmarBtn);


    const cancelarBtn = document.createElement('button');

    cancelarBtn.type = 'button';
    cancelarBtn.textContent = 'Cancelar';

    cancelarBtn.addEventListener('click', () => {
      cancelarEliminar(usuario.id);
    });

    confirmacion.appendChild(cancelarBtn);

    elemento.appendChild(confirmacion);


    const separador = document.createElement('hr');

    elemento.appendChild(separador);

    usuariosContainer.appendChild(elemento);
  });
}


function editarUsuario(id, nombreActual) {
  usuarioAccionMensaje.innerHTML = '';

  const contenedor = document.createElement('div');

  const etiqueta = document.createElement('label');

  etiqueta.setAttribute(
    'for',
    'nuevoNombre'
  );

  etiqueta.textContent =
    'Nuevo nombre';

  contenedor.appendChild(etiqueta);


  const input = document.createElement('input');

  input.type = 'text';
  input.id = 'nuevoNombre';
  input.value = nombreActual;

  contenedor.appendChild(input);


  const guardarBtn = document.createElement('button');

  guardarBtn.type = 'button';
  guardarBtn.textContent = 'Guardar';

  guardarBtn.addEventListener('click', () => {
    guardarEdicion(id);
  });

  contenedor.appendChild(guardarBtn);


  const cancelarBtn = document.createElement('button');

  cancelarBtn.type = 'button';
  cancelarBtn.textContent = 'Cancelar';

  cancelarBtn.addEventListener(
    'click',
    cancelarEdicion
  );

  contenedor.appendChild(cancelarBtn);


  usuarioAccionMensaje.appendChild(contenedor);

  input.focus();
}


async function guardarEdicion(id) {
  const input =
    document.getElementById('nuevoNombre');

  if (!input || !input.value.trim()) {
    usuarioAccionMensaje.textContent =
      'El nombre no puede estar vacío.';
    return;
  }

  const response = await fetch(
    `/api/usuarios/${id}`,
    {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        nombre: input.value.trim()
      })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    usuarioAccionMensaje.textContent =
      data.error ||
      'No se pudo editar el usuario.';
    return;
  }

  usuarioAccionMensaje.textContent =
    'Usuario actualizado correctamente.';

  await cargarUsuarios();
}


function cancelarEdicion() {
  usuarioAccionMensaje.textContent = '';
}


function mostrarEliminar(id) {
  const elemento =
    document.getElementById(
      `eliminar-${id}`
    );

  if (!elemento) {
    return;
  }

  elemento.classList.remove('hidden');
}


function cancelarEliminar(id) {
  const elemento =
    document.getElementById(
      `eliminar-${id}`
    );

  if (!elemento) {
    return;
  }

  elemento.classList.add('hidden');
}


async function eliminarUsuario(id) {
  const response = await fetch(
    `/api/usuarios/${id}`,
    {
      method: 'DELETE'
    }
  );

  const data = await response.json();

  if (!response.ok) {
    usuarioAccionMensaje.textContent =
      data.error ||
      'No se pudo eliminar el usuario.';
    return;
  }

  usuarioAccionMensaje.textContent =
    'Usuario eliminado correctamente.';

  await cargarUsuarios();
}


usuarioForm.addEventListener(
  'submit',
  async (event) => {
    event.preventDefault();

    usuarioMensaje.textContent = '';

    const datos = {
      nombre:
        document.getElementById('nombre')
          .value.trim(),

      usuario:
        document.getElementById('usuario')
          .value.trim(),

      contrasena:
        document.getElementById('contrasena')
          .value,

      rol:
        document.getElementById('rol')
          .value
    };


    const response = await fetch(
      '/api/usuarios',
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
      usuarioMensaje.textContent =
        data.error ||
        'No se pudo crear el usuario.';
      return;
    }


    usuarioMensaje.textContent =
      'Usuario creado correctamente.';

    usuarioForm.reset();

    await cargarUsuarios();
  }
);


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
    comunicadosContainer.textContent =
      'No hay comunicados publicados.';
    return;
  }


  comunicados.forEach((comunicado) => {
    const elemento =
      document.createElement('article');


    const titulo =
      document.createElement('h3');

    titulo.textContent =
      comunicado.titulo;


    const contenido =
      document.createElement('p');

    contenido.textContent =
      comunicado.contenido;


    const fecha =
      document.createElement('small');

    fecha.textContent =
      comunicado.fecha;


    elemento.appendChild(titulo);
    elemento.appendChild(contenido);
    elemento.appendChild(fecha);


    comunicadosContainer.appendChild(
      elemento
    );
  });
}


comunicadoForm.addEventListener(
  'submit',
  async (event) => {
    event.preventDefault();

    comunicadoMensaje.textContent = '';

    const datos = {
      titulo:
        document.getElementById('titulo')
          .value.trim(),

      contenido:
        document.getElementById('contenido')
          .value.trim()
    };


    const response =
      await fetch(
        '/api/comunicados',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(datos)
        }
      );


    const data =
      await response.json();


    if (!response.ok) {
      comunicadoMensaje.textContent =
        data.error ||
        'No se pudo publicar el comunicado.';
      return;
    }


    comunicadoMensaje.textContent =
      'Comunicado publicado correctamente.';

    comunicadoForm.reset();

    await cargarComunicados();
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

  await cargarUsuarios();
  await cargarComunicados();
}


iniciarDashboard();