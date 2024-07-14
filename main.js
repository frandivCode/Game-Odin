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

const reglasAtaques = {
    "fuego": ["planta"],
    "agua": ["fuego"],
    "planta": ["viento"],
    "viento": ["agua"]
};

// Guardar datos en localStorage
localStorage.setItem('personajesElementales', JSON.stringify(personajesElementales));
localStorage.setItem('tiposHabilidades', JSON.stringify(tiposHabilidades));
localStorage.setItem('reglasAtaques', JSON.stringify(reglasAtaques));

// Recuperar datos desde localStorage
const personajesElementalesGuardados = JSON.parse(localStorage.getItem('personajesElementales')) || personajesElementales;
const tiposHabilidadesGuardados = JSON.parse(localStorage.getItem('tiposHabilidades')) || tiposHabilidades;
const reglasAtaquesGuardados = JSON.parse(localStorage.getItem('reglasAtaques')) || reglasAtaques;

function getComputerChoice() {
    if (!personajePC) {
        personajePC = getComputerCharacter();
    }

    const personaje = personajesElementales.find(p => p.personaje === personajePC);
    const ataques = personaje.ataques;
    const randomIndex = Math.floor(Math.random() * ataques.length);
    return ataques[randomIndex];
}

function getComputerCharacter() {
    const eleccionPC = Math.floor(Math.random() * personajesElementales.length);
    return personajesElementales[eleccionPC].personaje;
}

// Mensaje de la batalla 
function mostrarMensajeBatalla(msjBatalla, clase = '') {
    const mensajeBatalla = document.getElementById('mensajes-batalla');
    mensajeBatalla.innerHTML = msjBatalla;
    mensajeBatalla.className = 'text-mensajes ' + clase;
}

function mostrarVidas() {
    const vidasComputer = document.getElementById('vidas-computer');
    const vidasPlayer = document.getElementById('vidas-player');

    vidasComputer.innerHTML = '';
    vidasPlayer.innerHTML = '';

    // Añade img jugador 
    for (let i = 0; i < 3; i++) {
        const img = document.createElement('img');
        img.src = 'img/heart-pixel.png';
        img.alt = 'corazon pixelado';
        img.className = 'img-corazon';

        if (i >= vidasJugador) {
            img.classList.add('opaque');
        }

        vidasPlayer.appendChild(img);
    }
    // Añade img pc
    for (let i = 0; i < 3; i++) {
        const img = document.createElement('img');
        img.src = 'img/heart-pixel.png';
        img.alt = 'corazon pixelado';
        img.className = 'img-corazon';

        if (i >= vidasPc) {
            img.classList.add('opaque');
        }

        vidasComputer.appendChild(img);
    }
}

function mostrarAtaquesPlayer(ataqueJugador) {
    const atckPlayer = document.getElementById('atck-player');
    atckPlayer.innerHTML = `Atacaste con ${ataqueJugador}`;
}

function mostrarAtaquesComputer(ataqueComputadora) {
    const atckComputer = document.getElementById('atck-computer');
    atckComputer.innerHTML = `Atacó con ${ataqueComputadora}`;
}

const playerImg = document.getElementById('img-personaje-jugador');
const computerImg = document.getElementById('img-personaje-computer');

function handleAnimationEnd(e) {
    if (e.animationName === "hurt" || e.animationName === "tie") {
        e.target.classList.remove("hurt", "tie");
    }
    if (e.animationName === "shoot") {
        e.target.classList.remove("shoot");
    }
}

playerImg.addEventListener("animationend", handleAnimationEnd);
computerImg.addEventListener("animationend", handleAnimationEnd);

function animatePlayerShoot() {
    playerImg.classList.add('shoot');
}

function animateComputerShoot() {
    computerImg.classList.add('shoot');
}

function jugarRonda(opcionJugador, opcionComputadora) {
    document.getElementById('container-atck').style.display = 'flex';

    const tipoJugador = tiposHabilidades[opcionJugador];
    const tipoComputadora = tiposHabilidades[opcionComputadora];

    mostrarAtaquesPlayer(opcionJugador);
    mostrarAtaquesComputer(opcionComputadora);

    if (tipoJugador === tipoComputadora) {
        mostrarMensajeBatalla("¡Hay un empate!");
        animatePlayerShoot();
        animateComputerShoot();
        setTimeout(() => {
            mostrarVidas();
            playerImg.classList.add('tie');
            computerImg.classList.add('tie');
            if (vidasJugador === 0 || vidasPc === 0) {
                mostrarResultadoFinal();
            }
        }, 100);
    } else if (reglasAtaques[tipoJugador] && reglasAtaques[tipoJugador].includes(tipoComputadora)) {
        mostrarMensajeBatalla("Has <span class=\"ganado\">ganado</span> esta ronda!");
        animateComputerShoot();
        setTimeout(() => {
            vidasPc--;
            computerImg.classList.add('hurt');
            mostrarVidas();
            if (vidasPc === 0) {
                mostrarResultadoFinal();
            }
        }, 100);
    } else {
        mostrarMensajeBatalla("Has <span class=\"perdido\">perdido</span> esta ronda.");
        animatePlayerShoot();
        setTimeout(() => {
            vidasJugador--;
            playerImg.classList.add('hurt');
            mostrarVidas();
            if (vidasJugador === 0) {
                mostrarResultadoFinal();
            }
        }, 100);
    }
}

// Función para mostrar el resultado final del juego
function mostrarResultadoFinal() {
    const containerResultado = document.getElementById('container-resultado');
    const mensajeFinal = document.getElementById('mensaje-final');

    if (vidasJugador === 0 || vidasPc === 0) {
        if (vidasJugador > vidasPc) {
            mensajeFinal.innerHTML = 'You Win!';
            mensajeFinal.className = 'mensaje-ganador bounce';
            playSoundVictory();
        } else {
            mensajeFinal.innerHTML = 'Game Over';
            mensajeFinal.className = 'mensaje-perdedor anaglyph';
            playSoundDefeat();
        }

        const vidasContainer = document.getElementById('container-vidas');
        vidasContainer.style.display = 'none';

        botonReinicio.style.display = 'block';
        document.getElementById('container-mensajes').style.display = 'none';
        document.querySelector('.contenedorPersonajes').style.display = 'none';
        document.querySelector('.contenedorBotones').style.display = 'none';
        document.getElementById('container-rondas').style.display = 'none';
        document.getElementById('tituloPrincipal').style.display = 'none';
        document.getElementById('container-atck').style.display = 'none';

        ocultarFondoVersus();
        containerResultado.style.display = 'flex';
    } else {
        containerResultado.style.display = 'none';
    }
}

function mostrarRondas() {
    const verRondas = document.getElementById('container-rondas');
    verRondas.innerHTML = `<h3>Ronda ${ronda}</h3>`;
    document.getElementById('container-rondas').style.display = 'block';
}

function reiniciarRondas() {
    const verRondas = document.getElementById('container-rondas');
    verRondas.innerHTML = '';
    document.getElementById('container-rondas').style.display = 'none';
}

function jugarJuego(opcionJugador) {
    mostrarRondas();
    const computerSelection = getComputerChoice();
    jugarRonda(opcionJugador, computerSelection);
    ronda++;
}

function iniciarJuego() {
    document.getElementById('container-vidas').style.display = 'none';
    document.getElementById('container-resultado').style.display = 'none';
    document.querySelector('.contenedorBotones').style.display = 'none';
    setTimeout(function () {
        document.getElementById('startbutton').addEventListener('click', function () {
            document.getElementById('inicio').style.display = 'none';
            document.getElementById('juego').style.display = 'block';
            escribirTexto("Elemental Dominance", document.getElementById('tituloPrincipal'));
            mostrarVidas();
        });
    }, 1300);
}

// Funcion para escribir el titulo
function escribirTexto(texto, elemento) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 80);
}

// Boton para desactivar la música al inicio del juego
const prenderButton = document.getElementById('prender-music');
const apagarButton = document.getElementById('apagar-music');
const audio = document.getElementById('musica-de-batalla');

prenderButton.addEventListener('click', function () {
    audio.play();
    prenderButton.style.display = 'none';
    apagarButton.style.display = 'block';
});

apagarButton.addEventListener('click', function () {
    audio.pause();
    prenderButton.style.display = 'block';
    apagarButton.style.display = 'none';
});

// Audio de la batalla
function playMusicBattle() {
    let audio = document.getElementById('musica-de-batalla');
    audio.loop = true;
    audio.play();
}

// Función para ajustar el volumen
function ajustarVolumen(nuevoVolumen) {
    if (nuevoVolumen < 0) {
        nuevoVolumen = 0;
    } else if (nuevoVolumen > 1) {
        nuevoVolumen = 1;
    }
    audio.volume = nuevoVolumen;
}
ajustarVolumen(0.2);

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
// Audio de click
function playSoundClick() {
    let soundClick = document.getElementById('sonido-de-click');
    soundClick.play();
}

function mostrarFondoVersus() {
    const pantallaJuego = document.getElementById('juego');
    pantallaJuego.classList.add('fondo-versus');
}

function ocultarFondoVersus() {
    const pantallaJuego = document.getElementById('juego');
    pantallaJuego.classList.remove('fondo-versus');
}

const imgPersonajes = document.querySelectorAll('.img-personaje');

// Función para manejar la selección de personajes
imgPersonajes.forEach(btn => {
    btn.addEventListener('click', () => {
        personajeJugador = btn.getAttribute('data-personaje');
        personajePC = getComputerCharacter();
        mostrarFondoVersus();
        
        document.getElementById('img-personaje-jugador').src = `./img/${personajeJugador.toLowerCase()}.png`;
        document.getElementById('img-personaje-computer').src = `./img/${personajePC.toLowerCase()}.png`;

        mostrarRondas();
        mostrarVidas();
        document.getElementById('tituloPrincipal').style.display = 'none';
        document.getElementById('eleccion-personajes').style.display = 'none';
        document.getElementById('container-mensajes').style.display = 'flex';
        document.getElementById('container-vidas').style.display = 'flex';
        document.querySelector('.contenedorPersonajes').style.display = 'none';
        document.querySelector('.contenedorBotones').style.display = 'flex';
        document.querySelectorAll('.contenedorBotones .img-choice').forEach(ataqueBtn => {
            ataqueBtn.style.display = 'none';
        });

        // Mostrar solo los ataques del personaje seleccionado
        const ataquesJugador = personajesElementales.find(p => p.personaje === personajeJugador).ataques;
        ataquesJugador.forEach(ataque => {
            document.getElementById(ataque.toLowerCase().replace(/ /g, '-')).style.display = 'inline-block';
        });
    });
});

const attacksContainers = document.querySelectorAll('.contenedorBotones > div');

// Función para mostrar solo los ataques del personaje seleccionado
function mostrarAtaques(personajeSeleccionado) {
    attacksContainers.forEach(container => {
        if (container.id === `attacks-${personajeSeleccionado.toLowerCase()}`) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}

// Evento al seleccionar un personaje
document.querySelectorAll('.img-personaje').forEach(personaje => {
    personaje.addEventListener('click', function () {
        const personajeSeleccionado = this.dataset.personaje;
        mostrarAtaques(personajeSeleccionado);
    });
});

const imgAtaques = document.querySelectorAll('.img-choice');
const opacityImg = document.querySelectorAll('.opac');

// Elegir ataques al clickear las img por el atributo alt
imgAtaques.forEach(img => {
    img.addEventListener('click', () => {
        playSoundClick();
        const ataqueSeleccionado = img.getAttribute('alt');
        jugarJuego(ataqueSeleccionado);
    });
});

let botonReinicio = document.querySelector('.buttons');
botonReinicio.style.display = 'none';

document.getElementById('reiniciar').addEventListener('click', () => {
    Swal.fire({
        title: 'Juego Reiniciado',
        padding: '1.5rem',
        timer: 1500,
        showConfirmButton: false,
        customClass: {
            title: 'tituloAlert',
        },
        showClass: {
            popup: 'animate__animated animate__backInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__backOutUp'
        }
    });
    vidasJugador = 3;
    vidasPc = 3;
    ronda = 1;
    personajeJugador = null;
    personajePC = null;

    document.getElementById('container-vidas').style.display = 'none';
    document.getElementById('eleccion-personajes').style.display = 'flex';
    document.getElementById('container-rondas').style.display = 'block';
    document.querySelector('.contenedorPersonajes').style.display = 'flex';
    document.querySelector('.contenedorBotones').style.display = 'none';
    document.getElementById('tituloPrincipal').style.display = 'flex';
    document.getElementById('container-atck').style.display = 'none';

    const mensajeBatalla = document.getElementById('mensajes-batalla');
    mensajeBatalla.innerHTML = '';
    mensajeBatalla.className = 'text-mensajes';

    botonReinicio.style.display = 'none';
    document.getElementById('container-mensajes').style.display = 'none';
    document.getElementById('container-resultado').style.display = 'none';

    reiniciarRondas();
    mostrarVidas();

    // Remover clases de animación
    playerImg.classList.remove('shoot', 'hurt');
    computerImg.classList.remove('shoot', 'hurt');
});

iniciarJuego();