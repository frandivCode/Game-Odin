// Variables para el estado del juego
let vidasPc = 3;
let vidasJugador = 3;
let personajeJugador = null;
let personajePC = null;
let ronda = 1;

// Lista de personajes elementales con sus ataques
const personajesElementales = [
    {
        personaje: "Magnooki",
        ataques: ["Bola de fuego", "Remolino de agua", "Enredaderas venenosas", "Rafaga de aire"],
    },
    {
        personaje: "Vortapt",
        ataques: ["Llamarada", "Chorro de agua", "Lluvia de espinas", "Tornado"],
    },
    {
        personaje: "Gleamur",
        ataques: ["Soplido infernal", "Marea poderosa", "Hojas cortantes", "Corte de viento"],
    }
];

// Diccionario que asocia cada ataque con su tipo elemental
const tiposHabilidades = {
    "Bola de fuego": "fuego",
    "Llamarada": "fuego",
    "Soplido infernal": "fuego",
    "Remolino de agua": "agua",
    "Chorro de agua": "agua",
    "Marea poderosa": "agua",
    "Enredaderas venenosas": "planta",
    "Lluvia de espinas": "planta",
    "Hojas cortantes": "planta",
    "Rafaga de aire": "viento",
    "Tornado": "viento",
    "Corte de viento": "viento"
};

// Reglas de ataques: qué tipo de ataque es fuerte contra qué tipo
const reglasAtaques = {
    "fuego": ["planta"],
    "agua": ["fuego"],
    "planta": ["viento"],
    "viento": ["agua"]
};

// Selecciona un ataque aleatorio para la computadora
function getComputerChoice() {
    const ataques = [
        "Bola de fuego", "Remolino de agua", "Enredaderas venenosas", "Rafaga de aire",
        "Llamarada", "Chorro de agua", "Lluvia de espinas", "Tornado",
        "Soplido infernal", "Marea poderosa", "Hojas cortantes", "Corte de viento"
    ];
    const number = Math.floor(Math.random() * 1000);
    const eleccionPC = number % ataques.length;
    return ataques[eleccionPC];
}

// Selecciona un personaje aleatorio para la computadora
function getComputerCharacter() {
    const personajes = personajesElementales.map(p => p.personaje);
    const eleccionPC = Math.floor(Math.random() * personajes.length);
    return personajes[eleccionPC];
}

// Muestra un mensaje al usuario
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// Juega una ronda del juego
function jugarRonda(opcionJugador, opcionComputadora) {
    alert(`Elegiste ➡️ ${opcionJugador} 
el PC eligió ➡️ ${opcionComputadora}`);

    const tipoJugador = tiposHabilidades[opcionJugador];
    const tipoComputadora = tiposHabilidades[opcionComputadora];

    // Determina el resultado de la ronda
    if (tipoJugador === tipoComputadora) {
        alert("¡Hay un empate!");
    } else if (reglasAtaques[tipoJugador] && reglasAtaques[tipoJugador].includes(tipoComputadora)) {
        alert("Has ganado esta ronda. ¡Sigue así!");
        vidasPc--;
    } else {
        if (vidasJugador > 1) {
            alert("Has perdido esta ronda. ¡Vamos, no te rindas!");
        }
        vidasJugador--;
    }

    alert(`Vidas Restantes​ \nTú: ${vidasJugador} Computadora: ${vidasPc}`);

    // Muestra el resultado final si alguien se queda sin vidas
    if (vidasJugador === 0 || vidasPc === 0) {
        mostrarResultadoFinal();
    }
}

// Muestra el resultado final del juego
function mostrarResultadoFinal() {
    if (vidasJugador === 0 || vidasPc === 0) {
        if (vidasJugador > vidasPc) {
            playSoundVictory();
            mostrarMensaje('Has ganado, ¡bien hecho! 🥳');
        } else if (vidasJugador === vidasPc) {
            mostrarMensaje('Hubo un empate, ¡inténtalo de nuevo!');
        } else {
            playSoundDefeat();
            mostrarMensaje('Lamentablemente perdiste... 🙁');
        }

        botonReinicio.style.display = 'block';
        document.querySelector('.contenedorPersonajes').style.display = 'none';
        document.querySelector('.contenedorBotones').style.display = 'none';
    }
}

// Función para iniciar una nueva ronda
function jugarJuego(opcionJugador) {
    mostrarMensaje(`Round ${ronda}\n¡Fight! 🤜🤛`);
    const computerSelection = getComputerChoice();
    jugarRonda(opcionJugador, computerSelection);
    ronda++;
}

// Función para iniciar el juego y configurar el botón de inicio
function iniciarJuego() {
    setTimeout(function () {
        document.getElementById('startbutton').addEventListener('click', function () {
            document.getElementById('inicio').style.display = 'none';
            document.getElementById('juego').style.display = 'block';
            playMusicBattle();
        });
    }, 1300);
}

// Audio de la batalla
function playMusicBattle() {
    let audio = document.getElementById('musica-de-batalla');
    audio.loop = true;
    audio.play();
}

// Audio de victoria
function playSoundVictory() {
    let audio = document.getElementById('musica-de-batalla');
    audio.pause();
    audio.currentTime = 0;
    let victory = document.getElementById('sonido-de-victoria');
    victory.play();
}

// Audio de derrota
function playSoundDefeat() {
    let audio = document.getElementById('musica-de-batalla');
    audio.pause();
    audio.currentTime = 0;
    let gameOver = document.getElementById('game-over');
    gameOver.play();
}

// Configura los botones de selección de personajes
const btnsPersonajes = document.querySelectorAll('.btn-personaje');

btnsPersonajes.forEach(btn => {
    btn.addEventListener('click', () => {
        personajeJugador = btn.getAttribute('data-personaje');
        personajePC = getComputerCharacter();
        mostrarMensaje(`Has elegido a ${personajeJugador}\nPC ha elegido a ${personajePC}`);

        document.querySelector('.contenedorPersonajes').style.display = 'none';
        document.querySelector('.contenedorBotones').style.display = 'block';
        document.getElementById('eleccion-personajes').style.display = 'none';

        document.querySelectorAll('.contenedorBotones .btn-choice').forEach(ataqueBtn => {
            ataqueBtn.style.display = 'none';
        });

        const ataquesJugador = personajesElementales.find(p => p.personaje === personajeJugador).ataques;
        ataquesJugador.forEach(ataque => {
            document.getElementById(ataque.toLowerCase().replace(/ /g, '-')).style.display = 'inline-block';
        });
    });
});

// Configura los botones de selección de ataques
const btnsAtaques = document.querySelectorAll('.contenedorBotones .btn-choice');

btnsAtaques.forEach(btn => {
    btn.addEventListener('click', () => {
        jugarJuego(btn.textContent);
    });
});

// Configura el botón de reinicio
let botonReinicio = document.querySelector('.buttons');
botonReinicio.style.display = 'none';

document.getElementById('reiniciar').addEventListener('click', () => {
    playMusicBattle();
    vidasJugador = 3;
    vidasPc = 3;
    ronda = 1;
    personajeJugador = null;
    personajePC = null;
    document.querySelector('.contenedorPersonajes').style.display = 'block';
    document.querySelector('.contenedorBotones').style.display = 'none';
    document.getElementById('eleccion-personajes').style.display = 'block';
    mostrarMensaje("Juego reiniciado. ¡Empieza de nuevo!");
    botonReinicio.style.display = 'none';
});

// Inicia el juego
iniciarJuego();
