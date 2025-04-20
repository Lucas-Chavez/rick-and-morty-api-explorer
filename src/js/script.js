const personajeLista = document.getElementById("lista-personaje");
let todosLosPersonajes = [];

// Función para cargar personajes
async function fetchPersonajes() {
    try {
        const respuesta = await fetch('https://rickandmortyapi.com/api/character/');
        const personajes = await respuesta.json();

        todosLosPersonajes = personajes.results

        mostrarPersonajes(todosLosPersonajes) //Mostrar todos los personajes
    } catch (error) {
        console.error("Error al cargar los personajes: ", error);
    }
}            

// Función para mostrar personajes filtrados o todos
function mostrarPersonajes(personajes) {
    personajeLista.innerHTML = ''; //Limpia la lista actual

    personajes.forEach(personaje => {
        const li = document.createElement('li')

        li.innerHTML = 
        `
        <article class="tarjeta-personaje">
            <img src=${personaje.image} alt=${personaje.name}>
            
            <div class="contenido-tarjeta__info">
                <div class="tarjeta-personaje__info">
                    <h2 class="tarjeta-personaje__nombre">${personaje.name}</h2>
                    <span class="tarjeta-personaje__estado">
                    <span class="tarjeta-personaje__icono-estado"></span>
                    <p class="tarjeta-personaje__texto-estado">${personaje.status} - ${personaje.species}</p>
                    </span>
                </div>
                
                <div class="tarjeta-personaje__ubicacion">
                    <span class="tarjeta-personaje__etiqueta">Última ubicación conocida</span>
                    <p class="tarjeta-personaje__nombre-ubicacion">${personaje.location.name}</p>
                </div>
            </div>
        </article>
        `
    
        personajeLista.appendChild(li);
    
        const estadoElemento = li.querySelector(".tarjeta-personaje__icono-estado");
    
        if (personaje.status == "Alive") {
            estadoElemento.style.backgroundColor = "green";
        } else if (personaje.status == "Dead") {
            estadoElemento.style.backgroundColor = "red";
        } else {
            estadoElemento.style.backgroundColor = "gray";
        }
        
    });
} 

// Función para filtrar personajes
function filtrarPersonajes(busqueda) {
    busqueda = busqueda.toLowerCase();

    if (busqueda === '') {
        mostrarPersonajes(todosLosPersonajes); //Si no hay busqueda mostrar todos
        return;
    }

    const personajesFiltrados = todosLosPersonajes.filter(personaje =>
        personaje.name.toLowerCase().includes(busqueda)
    );

    mostrarPersonajes(personajesFiltrados);
}


document.addEventListener('DOMContentLoaded', () => {
    fetchPersonajes();

    //Busqueda tiempo real
    const inputBusqueda = document.getElementById('entrada-busqueda');
    inputBusqueda.addEventListener('input', () => {
        filtrarPersonajes(inputBusqueda.value);
    });
});
