

function getCharacters(done) {
    fetch("https://valorant-api.com/v1/agents")
        .then(response => response.json())
        .then(data => {
            done(data);
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
        });
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));


if (currentUser) {
  console.log("Datos del usuario:", currentUser);

  // Obtenemos el elemento con la clase "profile-text"
  const profileElement = document.querySelector(".profile-text");

  // Generamos el contenido HTML para mostrar los datos del usuario
  const nombre = currentUser.nombre;
  const correo = currentUser.correo;
  const contraseña = currentUser.clave;

  // Ocultar la contraseña
  var hiddenContraseña = '';
  for (var i = 0; i < contraseña.length; i++) {
    hiddenContraseña += '*';
  }

  // Generamos el contenido HTML para el perfil
  profileElement.innerHTML = `
    <h1>${nombre}</h1>
    <h2>Email</h2>
    <p>${correo}</p>
    <h2>Password</h2>
    <p class="pw">${hiddenContraseña}</p>
  `;

  // Obten el botón "Modify Information" existente del HTML
  const modifyButton = document.querySelector(".mi");

  // Elementos para modificar información
  const newNameInput = document.createElement("input");
  newNameInput.type = "text";
  newNameInput.id = "new-name";
  newNameInput.placeholder = "Nuevo Nombre";
  newNameInput.style.display = "none";

  const newPasswordInput = document.createElement("input");
  newPasswordInput.type = "password";
  newPasswordInput.id = "new-password";
  newPasswordInput.placeholder = "Nueva Contraseña";
  newPasswordInput.style.display = "none";

  // Insertamos los elementos de modificar información en el perfil
  profileElement.appendChild(newNameInput);
  profileElement.appendChild(newPasswordInput);

  modifyButton.addEventListener("click", () => {
    if (newNameInput.style.display === "none") {
      newNameInput.style.display = "block";
      newPasswordInput.style.display = "block";
    } else {
      // Obten los nuevos valores del nombre y la contraseña
      const newNombre = newNameInput.value;
      const newContraseña = newPasswordInput.value;

      // Actualiza los datos del usuario en el almacenamiento local
      currentUser.nombre = newNombre;
      currentUser.clave = newContraseña;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // Actualiza la visualización en la página
      const pwElement = profileElement.querySelector(".pw");
      pwElement.textContent = "*".repeat(newContraseña.length);

      // Oculta los campos de entrada nuevamente
      newNameInput.style.display = "none";
      newPasswordInput.style.display = "none";

      // Muestra una alerta y recarga la página
      alert("¡Información actualizada! Es necesario recargar la página");
      location.reload(); // Recargar la página
    }
  });

  // Función para generar personajes favoritos en el perfil
  function generateFavoriteCharacters(data) {
    // Accede a la lista de favoritos del usuario
    var favoritos = currentUser.favoritos;

    if (!favoritos) {
      console.log("No hay personajes favoritos en el perfil.");
      return;
    }

    // Recorre los datos de los personajes
    data.data.forEach(personaje => {
      if (personaje.role && personaje.role.displayName && personaje.displayIcon) {
        const personajeButton = document.createElement('button');
        personajeButton.className = "personaje";
        const personajeId = personaje.uuid; // Obtén el ID del personaje

        // Verifica si el ID del personaje existe en la lista de favoritos
        if (favoritos[personajeId]) {
          // El personaje es favorito, genera el botón y el icono de favorito
          function createFavoritoIcon() {
            const icon = document.createElement('span');
            icon.classList.add('favorito-icon');
            icon.textContent = '★'; // Puedes personalizar el contenido del icono aquí
            icon.style.color = '#FFD700'; // Cambia el color a tu preferencia
            icon.style.cursor = 'pointer';
            return icon;
             }
          const img = document.createElement('img');
          img.src = personaje.displayIcon;

          const favoritoIcon = createFavoritoIcon();
          favoritoIcon.style.color = 'white'; // Marcar como favorito

          personajeButton.appendChild(img);
          personajeButton.appendChild(favoritoIcon);
          favoritesContainer.appendChild(personajeButton);
        }
      }
    });
  }

  // Obtén una referencia al div donde se mostrarán los personajes favoritos
  const favoritesContainer = document.querySelector(".f-agents");

  // Llama a la función para generar personajes favoritos en el perfil
  getCharacters(data => {
    generateFavoriteCharacters(data);
  });

  // Obtén referencias a los elementos HTML
  const imageInput = document.getElementById("image-upload");
  const imagePreview = document.getElementById("image-preview");
  const imageButton = document.getElementById("image-button");

  imageButton.addEventListener("click", () => {
    imageInput.click(); // Al hacer clic en el botón de imagen, se abrirá el cuadro de diálogo de selección de archivo
  });

  imageInput.addEventListener("change", (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(selectedImage);
    }
  });
}
