let vidasPc = 3;
let vidasJugador = 3;
let personajeJugador = null;
let personajePC = null;
let ronda = 1;

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

function getComputerChoice() {
    const ataques = [
        "Bola de fuego", "Remolino de agua", "Enredaderas venenosas", "Rafaga de aire",
        "Llamarada", "Chorro de agua", "Lluvia de espinas", "Tornado",
        "Soplido infernal", "Marea poderosa", "Hojas cortantes", "Corte de viento"
    ];
    const randomIndex = Math.floor(Math.random() * ataques.length);
    return ataques[randomIndex];
}

function getComputerCharacter() {
    const eleccionPC = Math.floor(Math.random() * personajesElementales.length);
    return personajesElementales[eleccionPC].personaje;
}

function mostrarMensaje(mensaje) {
    alert(mensaje);
}

// Mensaje de la batalla 
function mostrarMensajeBatalla(msjBatalla, clase = '') {
    const mensajeBatalla = document.getElementById('mensajes-batalla');
    mensajeBatalla.innerHTML = msjBatalla;
    mensajeBatalla.className = 'text-mensajes ' + clase;
}

// Función para mostrar las vidas del jugador y la computadora
function mostrarVidas() {
    const vidasContainer = document.getElementById('container-vidas');
    vidasContainer.style.display = 'flex';

    const vidasComputer = document.getElementById('vidas-computer');
    vidasComputer.innerHTML = vidasPc;
    const vidasPlayer = document.getElementById('vidas-player');
    vidasPlayer.innerHTML = vidasJugador;
}

// Función para jugar una ronda
function jugarRonda(opcionJugador, opcionComputadora) {
    mostrarMensaje(`Elegiste ➡️ ${opcionJugador} \n el PC eligió ➡️ ${opcionComputadora}`);

    const tipoJugador = tiposHabilidades[opcionJugador];
    const tipoComputadora = tiposHabilidades[opcionComputadora];

    if (tipoJugador === tipoComputadora) {
        mostrarMensajeBatalla("¡Hay un empate!");
    } else if (reglasAtaques[tipoJugador] && reglasAtaques[tipoJugador].includes(tipoComputadora)) {
        mostrarMensajeBatalla("Has <span class=\"ganado\">ganado</span> esta ronda!");
        vidasPc--;
    } else {
        if (vidasJugador > 1) {
            mostrarMensajeBatalla("Has <span class=\"perdido\">perdido</span> esta ronda.");
        }
        vidasJugador--;
    }
    mostrarVidas();

    // Verifica si el juego ha terminado después de cada ronda
    if (vidasJugador === 0 || vidasPc === 0) {
        mostrarResultadoFinal();
    }
}

// Función para mostrar el resultado final del juego
function mostrarResultadoFinal() {
    const containerResultado = document.getElementById('container-resultado');
    const mensajeFinal = document.getElementById('mensaje-final');

    if (vidasJugador === 0 || vidasPc === 0) {
        if (vidasJugador > vidasPc) {
            mensajeFinal.innerHTML = 'You Win!';
            mensajeFinal.className = 'mensaje-ganador';
            playSoundVictory();
        } else if (vidasJugador === vidasPc) {
            mensajeFinal.innerHTML = 'Empate';
        } else {
            mensajeFinal.innerHTML = 'Game Over';
            mensajeFinal.className = 'mensaje-perdedor';
            playSoundDefeat();
        }

        const vidasContainer = document.getElementById('container-vidas');
        vidasContainer.style.display = 'none';

        botonReinicio.style.display = 'block';
        document.getElementById('container-mensajes').style.display = 'none';
        document.querySelector('.contenedorPersonajes').style.display = 'none';
        document.querySelector('.contenedorBotones').style.display = 'none';

        containerResultado.style.display = 'block';
    } else {
        // Si el juego no ha terminado, ocultamos el mensaje final
        containerResultado.style.display = 'none';
    }
}

function jugarJuego(opcionJugador) {
    mostrarMensaje(`Round ${ronda}\n¡Fight! 🤜🤛`);
    const computerSelection = getComputerChoice();
    jugarRonda(opcionJugador, computerSelection);
    ronda++;
}

// Función para iniciar el juego y configurar el botón de inicio
function iniciarJuego() {
    document.getElementById('container-vidas').style.display = 'none';
    setTimeout(function () {
        document.getElementById('startbutton').addEventListener('click', function () {
            document.getElementById('inicio').style.display = 'none';
            document.getElementById('juego').style.display = 'block';
            playMusicBattle();
            escribirTexto("Elemental Dominance", document.getElementById('tituloPrincipal'));
        });
    }, 1300);
}

// Función para escribir texto
function escribirTexto(texto, elemento) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
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
        mostrarVidas();
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

const btnsAtaques = document.querySelectorAll('.contenedorBotones .btn-choice');

btnsAtaques.forEach(btn => {
    btn.addEventListener('click', () => {
        jugarJuego(btn.textContent);
    });
});

let botonReinicio = document.querySelector('.buttons');
botonReinicio.style.display = 'none';

document.getElementById('reiniciar').addEventListener('click', () => {
    playMusicBattle();
    vidasJugador = 3;
    vidasPc = 3;
    ronda = 1;
    personajeJugador = null;
    personajePC = null;

    document.getElementById('container-vidas').style.display = 'none';
    document.querySelector('.contenedorPersonajes').style.display = 'block';
    document.querySelector('.contenedorBotones').style.display = 'none';
    document.getElementById('eleccion-personajes').style.display = 'block';

    const mensajeBatalla = document.getElementById('mensajes-batalla');
    mensajeBatalla.innerHTML = '';
    mensajeBatalla.className = 'text-mensajes';

    const containerMensajes = document.getElementById('container-mensajes');
    containerMensajes.style.display = 'flex';
    
    mostrarMensaje("Juego reiniciado. ¡Empieza de nuevo!");
    botonReinicio.style.display = 'none';

    // Ocultar mensaje final al reiniciar
    const containerResultado = document.getElementById('container-resultado');
    containerResultado.style.display = 'none';
});

iniciarJuego();