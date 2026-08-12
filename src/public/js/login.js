const loginForm = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario,
        contrasena
      })
    });

    const data = await response.json();

    if (!response.ok) {
      mensaje.textContent = data.error || 'No se pudo iniciar sesión';
      return;
    }

    const rutas = {
      admin: '/dashboard-admin.html',
      docente: '/dashboard-docente.html',
      familia: '/dashboard-familia.html'
    };

    window.location.href = rutas[data.user.rol];
  } catch (error) {
    console.error(error);
    mensaje.textContent = 'Error de conexión con el servidor';
  }
});