//Función para autenticarse
function authenticate(event) {
    event.preventDefault();
    
    var password = document.getElementById('password').value;
  
    // Verificar las credenciales
    if (password === 'Bodorrio2025') {
      // Credenciales válidas, mostrar el contenido
      document.getElementById('login-container').style.display = 'none';
      document.getElementById('cover-container').style.display = 'block';
      // Almacenar en sessionStorage que el usuario ha iniciado sesión
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      // Credenciales incorrectas, mostrar un mensaje de error
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  }
  
  
  // Función para mostrar una sección oculta
  function mostrarSeccion(nextSection, agregarEntradaHistorial = true) {
  
    // Oculta todas las secciones
    var secciones = document.querySelectorAll('.oculto');
    secciones.forEach(function (seccion) {
      seccion.style.display = 'none';
    });
  
    // Muestra la sección especificada
    if (nextSection == "portada"){
      var contenedor = document.getElementById('cover-container');
    }else{
      var contenedor = document.getElementById('contain-container');
    }
  
    var seccionMostrar = contenedor.querySelector('#' + nextSection);
  
    if (seccionMostrar) {
      contenedor.style.display = 'block';
      seccionMostrar.style.display = 'block';
    }
  
    // Cambia la URL y agrega una entrada al historial
    if (agregarEntradaHistorial) {
      window.history.pushState({ seccion: nextSection }, null, "#" + nextSection);
    }
  }
  
  // Evento "load" inicial
  window.addEventListener("load", function () {
    // Comprobar si el usuario ya está autenticado
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
  
    if (isLoggedIn === 'true') {
      // El usuario ha iniciado sesión previamente
      ocultarContenedorDeInicioDeSesion();
      handleURLChange();
    }  
  });
  
  
  // Función para manejar el cambio en la URL
  function handleURLChange() {
    var fragmentoURL = window.location.hash;
    if (fragmentoURL) {
      mostrarSeccion(fragmentoURL.slice(1), false); // Quita el "#" del fragmento
      if (fragmentoURL != "#portada") {
        ocultarPortada();
      }
      
    }else{
      mostrarSeccion("portada", true);
    }
    // mostrarSeccion(fragmentoURL.slice(1), true); // No agregar entrada al historial
  }
  
  // Evento "popstate" para cambios en el historial
  window.addEventListener("popstate", handleURLChange);
  
  // Función para ocultar la portada principal
  function ocultarPortada() {
    var portadaPrincipal = document.querySelector('.portada');
    portadaPrincipal.style.display = 'none';
  }
  
  function ocultarContenedorDeInicioDeSesion() {
    var loginContainer = document.getElementById('login-container');
    if (loginContainer) {
      loginContainer.style.display = 'none';
    }
  }