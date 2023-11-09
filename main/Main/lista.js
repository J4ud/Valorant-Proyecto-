// Restaurar los datos del usuario almacenados en el LocalStorage
var addedIcons = {};

// Recuperar los datos del usuario almacenados en el LocalStorage
var currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
  favoritos: {} // Inicializa la propiedad favoritos si no existe
};

// Función para mostrar los datos del usuario en la consola
function mostrarDatosUsuario() {
  if (currentUser) {
    console.log("Datos del usuario:", currentUser);
  } else {
    console.log("No hay datos disponibles");
  }
}

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

// Función para redireccionar a la segunda página con el ID del personaje como parámetro
function redirectToCharacterPage(personajeId) {
  window.location.href = `../character/character.html?personaje=${personajeId}`;
}

// Esto genera los personajes
getCharacters(data => {
  const personajesContainer = document.querySelector(".personajesContainer");
  const categoriasContainer = document.querySelector(".clases");

  data.data.forEach(personaje => {
    if (personaje.role && personaje.role.displayName && personaje.displayIcon) {
      const personajeButton = document.createElement('button');
      personajeButton.className = "personaje";
      const personajeId = personaje.uuid; // Obtén el ID del personaje

      // Verifica si el personaje está marcado como favorito en los datos del usuario
      let favorito = currentUser.favoritos ? currentUser.favoritos[personajeId] || false : false;

      // Agrega un evento de clic para redireccionar a la segunda página con el ID del personaje
      personajeButton.addEventListener('click', () => {
        redirectToCharacterPage(personajeId);
      });

      personajeButton.setAttribute('data-displayName', personaje.role.displayName);

      const img = document.createElement('img');
      img.src = personaje.displayIcon;

      const favoritoIcon = createFavoritoIcon();

      // Establece el color del icono según el estado de favorito
      if (favorito) {
        favoritoIcon.style.color = 'white';
      } else {
        favoritoIcon.style.color = '#0F1923';
      }

      // Agrega un evento de clic para marcar o desmarcar como favorito
      favoritoIcon.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el clic en el icono propague al botón del personaje
        favorito = !favorito;
        if (!currentUser.favoritos) {
          currentUser.favoritos = {}; // Inicializa favoritos si es null o undefined
        }
        if (favorito) {
          favoritoIcon.style.color = 'white'; // Cambiar el color o el estilo
          currentUser.favoritos[personajeId] = true; // Marcar como favorito
        } else {
          favoritoIcon.style.color = '#0F1923'; // Cambiar el color o el estilo de vuelta
          delete currentUser.favoritos[personajeId]; // Desmarcar como favorito
        }

        // Guarda los personajes favoritos en el almacenamiento local vinculado al usuario
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      });

      personajeButton.appendChild(img);
      personajeButton.appendChild(favoritoIcon);
      personajesContainer.appendChild(personajeButton);
    } else {
      console.log("Datos incompletos para un personaje:", personaje);
    }
  });

  // Resto del código (filtro de personajes, etc.

  data.data.forEach(categoria => {
    if (categoria.role && categoria.role.displayIcon && categoria.role.displayName) {
      const displayIcon = categoria.role.displayIcon;

      if (!addedIcons[displayIcon]) {
        addedIcons[displayIcon] = true;
        const categoriaButton = document.createElement('button');
        categoriaButton.className = "class-icon";
        categoriaButton.setAttribute('data-displayName', categoria.role.displayName);

        const img = document.createElement('img');
        img.src = categoria.role.displayIcon;

        categoriaButton.appendChild(img);
        categoriasContainer.appendChild(categoriaButton);
      }
    }
  });

  // Selecciona todos los botones de categoría por su clase
  const categoriaButtons = document.querySelectorAll('.class-icon');

  categoriaButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Obtiene el displayName desde el atributo data-displayName del botón
      const displayName = button.getAttribute('data-displayName');

      // Oculta todos los personajes
      const personajes = document.querySelectorAll('.personaje');
      personajes.forEach(personaje => {
        personaje.style.display = 'none';
      });

      // Muestra solo los personajes con el mismo displayName
      const personajesFiltrados = document.querySelectorAll(`.personaje[data-displayName="${displayName}"]`);
      personajesFiltrados.forEach(personaje => {
        personaje.style.display = 'block';
      });
    });
  });

  const allClasses = document.querySelector('.all'); // Asegúrate de que el selector sea correcto

  allClasses.addEventListener('click', () => {
    // Muestra todos los personajes
    const allCharacters = document.querySelectorAll(`.personaje`);
    allCharacters.forEach(personaje => {
      personaje.style.display = 'block';
    });
  });

  function createFavoritoIcon() {
    const icon = document.createElement('span');
    icon.classList.add('favorito-icon');
    icon.textContent = '★';
    icon.style.color = '#0F1923';
    icon.style.cursor = 'pointer';
    icon.style.border = '10px';
    return icon;
  }

  mostrarDatosUsuario(); // Muestra los datos del usuario en la consola
});
