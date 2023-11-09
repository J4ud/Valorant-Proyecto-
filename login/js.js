function login() {
  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Obtener los datos del usuario registrado desde el almacenamiento local
  var usuariosLocal = localStorage.getItem("userInfo");
  var usuarioList = JSON.parse(usuariosLocal);

  // Comprobar si el correo y la contraseña coinciden con los datos registrados
  var userFound = usuarioList.find(function (user) {
    return user.correo === email && user.clave === password;
  });

  if (userFound) {
    console.log("Datos válidos");
    
    // Almacena los datos del usuario en el LocalStorage con la clave "currentUser"
    localStorage.setItem("currentUser", JSON.stringify(userFound));
    
    // Redirigir al usuario a la página principal o a donde desees
    window.location.href = "../main/Main/lista.html";
  } else {
    alert("Datos inválidos");
  }
}
