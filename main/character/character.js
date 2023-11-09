document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const personajeId = urlParams.get("personaje");


    // Obtener los datos de los personajes desde la API
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

    // Comprobar si se proporciona un personajeId en la URL
    if (personajeId) {
        getCharacters(function (data) {
            const personaje = data.data.find(agent => agent.uuid === personajeId);
    
            // Accedemos a los elementos HTML y actualizamos sus contenidos
            const nameElement = document.querySelector(".name");
            const classElement = document.querySelector(".class");
            const bioTextElement = document.querySelector(".bio-text");
            const figureElement = document.querySelector(".figure");
    
            // Verificamos si el personaje existe
            if (personaje) {// Crear un fragmento de documento
                const properties = document.createRange().createContextualFragment(`
                    <div class="imagen-pers">
                        <img src="${personaje.fullPortrait}" class="fondo">
                    </div>
                    <div class="name">${personaje.displayName}</div>
                    <div class="rol">ROLE</div>
                    <div class="class">${personaje.role.displayName} <img src="${personaje.role.displayIcon}"></div>
                    <div class="bio">BIOGRAPHY</div>
                    <div class="figure"> <img src="${personaje.fullPortrait}" alt="">
                    </div>
                    <div class="bio-text">${personaje.description}</div>
                `);
    
                const ab = document.createRange().createContextualFragment(`
                <div class="ab-title">
                SPECIAL ABILITIES
                </div>
    
                <div class="ab-icons">
                     <img src="${personaje.abilities[0].displayIcon}">
                    <img src="${personaje.abilities[1].displayIcon}">
                     <img src="${personaje.abilities[2].displayIcon}">
                    <img src="${personaje.abilities[3].displayIcon}">
                </div>
    
                <div class="ab-text">
                <DIV class="Q">
                    <h1>Q - "${personaje.abilities[0].displayName}"</h1>
                    <p>"${personaje.abilities[0].description}"</p>
                </DIV>
                <DIV class="E">
                    <h1>E - "${personaje.abilities[1].displayName}"</h1>
                    <p>"${personaje.abilities[1].description}"</p>
                </DIV>
                <DIV class="C">
                    <h1>C - "${personaje.abilities[2].displayName}"</h1>
                    <p>"${personaje.abilities[2].description}"</p>
                </DIV>
                <DIV class="X">
                    <h1>X - "${personaje.abilities[3].displayName}"</h1>
                    <p>"${personaje.abilities[3].description}"
                    </p>
                </DIV>
                `);
    
                // Acceder al contenedor y agregar el fragmento
                const chPr = document.querySelector(".bg");
                chPr.appendChild(properties);
                const abPr = document.querySelector(".abilities")
                abPr.appendChild(ab);
            } else {
                console.error("No se encontró ningún agente.");
            }
        });
    }
});    