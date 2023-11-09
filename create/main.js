const usuarios = [];
const storage = window.localStorage;

function validarCorreoRegular(email) {
  // Expresión regular para validar correo
  let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  // Validar el patrón de la expresión regular
  if (validEmail.test(email)) {
    return true;
  } else {
    return false;
  }
}

function validarCorreo() {
  const emailField = document.getElementById("user-email");
  const email = emailField.value;
  if (validarCorreoRegular(email)) {
    const newUser = { nombre: "xxxxxx", clave: "12345", correo: email };
    storage.setItem("newUsr", JSON.stringify(newUser));
    window.location.href = "./pag2.html"; // Redirige al segundo paso del registro
  } else {
    alert("Correo errado");
  }
}

function validarUsuarioyEdad() {
  let newUser = JSON.parse(storage.getItem("newUsr"));
  const usuarioField = document.getElementById("usuario");
  const usuario = usuarioField.value;

  function validarUsuarioRegular(user) {
    let validUser = /^\w{3,10}$/; // Modificar la expresión regular según tus requisitos

    if (user.length > 10) return false;

    // Validar patrón de la expresión regular
    if (validUser.test(user)) {
      return true;
    } else {
      return false;
    }
  }

  function validarAdulto() {
    const dobField = document.getElementById("fechaNacimiento");
    const dob = dobField.value;

    if (calcularEdad(dob) > 16) {
      return true;
    } else {
      return false;
    }
  }

  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  if (validarUsuarioRegular(usuario)) {
    if (validarAdulto()) {
      newUser.nombre = usuario;
      storage.setItem("newUsr", JSON.stringify(newUser));
      window.location.href = "./pag3.html"; // Redirige al tercer paso del registro
    } else {
      alert("Debes ser mayor de 16 años...");
    }
  } else {
    alert("El usuario debe ser de mínimo 3 y máximo 10 caracteres y contener solo letras y números");
  }
}

function validarClaves() {
  let newUser = JSON.parse(storage.getItem("newUsr"));
  const clave1Field = document.getElementById("clave1");
  const clave1 = clave1Field.value;

  const clave2Field = document.getElementById("clave2");
  const clave2 = clave2Field.value;

  if (clave1.length == 0 || clave2.length == 0) {
    alert("La clave no puede ser vacía ");
    return;
  }
  if (clave1 === clave2) {
    newUser.clave = clave1;
    usuarios.push(newUser);
    storage.setItem("userInfo", JSON.stringify(usuarios));
    window.location.href = "../login/HTML.html"; // Redirige a la página de inicio de sesión
    console.log("Todo bien");
  } else {
    alert("¡La contraseña no coincide!");
  }
}
