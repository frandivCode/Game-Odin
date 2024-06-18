// Score 
let computadoraScore = 0;
let jugadorScore = 0;

// Buttons
const btnRoca = document.getElementById('btn-roca');
const btnViento = document.getElementById('btn-viento');
const btnFuego = document.getElementById('btn-fuego');
const btnTerremoto = document.getElementById('btn-terremoto');
const btnAgua = document.getElementById('btn-agua');

// Elección PC
function getComputerChoice() {
    let eleccionPC = Math.round(Math.random() * 5);
    if (eleccionPC === 0) {
        return 'Lluvia de rocas';
    } else if (eleccionPC === 1) {
        return 'Corte de viento';
    } else if (eleccionPC === 2) {
        return 'Bola de fuego';
    } else if (eleccionPC === 3) {
        return 'Terremoto';
    } else if (eleccionPC === 4) {
        return 'Chorro de agua';
    }
};

// Elecciones
function jugarRonda(opcionJugador, opcionComputadora, isLastRound) {
    alert('Elegiste ' + opcionJugador);
    alert('El PC eligió ' + opcionComputadora);

    if (opcionJugador === opcionComputadora) {
        if (!isLastRound) {
            alert("¡Se dio un empate! Elige mejor en la próxima ronda.");
        }
    } else if (
        (opcionJugador === "Lluvia de rocas" && opcionComputadora === "Corte de viento") ||
        (opcionJugador === "Corte de viento" && opcionComputadora === "Chorro de agua") ||
        (opcionJugador === "Chorro de agua" && opcionComputadora === "Bola de fuego") ||
        (opcionJugador === "Bola de fuego" && opcionComputadora === "Terremoto") ||
        (opcionJugador === "Terremoto" && opcionComputadora === "Lluvia de rocas")
    ) {
        jugadorScore++;
        if (!isLastRound) {
            alert("Has ganado esta ronda. ¡Sigue así!");
        }
    } else {
        computadoraScore++;
        if (!isLastRound) {
            alert("Has perdido esta ronda. ¡Vamos, no te rindas!");
        }
    }
};

let ronda = 1;
const totalRondas = 5;

function jugarJuego(opcionJugador) {
    alert("Comenzó la ronda " + ronda);
    const computerSelection = getComputerChoice();
    jugarRonda(opcionJugador, computerSelection, ronda === totalRondas);
    if (ronda < totalRondas) {
        alert("PUNTAJE \nTú: " + jugadorScore + " Computer: " + computadoraScore);
    }
    ronda++;

    // Mensaje Final
    if (ronda > totalRondas) {
        if (jugadorScore > computadoraScore) {
            alert('Has ganado, bien hecho!🥳');
        } else if (jugadorScore == computadoraScore) {
            alert('Uff se dio un empate, la próxima será...');
        } else {
            alert('Lamentablemente perdiste 🙁');
        }

        // Resultado Final
        alert("Resultado Final \n" + "Tú: " + jugadorScore + " Computer: " + computadoraScore);

        jugadorScore = 0;
        computadoraScore = 0;
        ronda = 1;

        iniciarJuego();
    }
}

// Inicializar juego
function iniciarJuego() {
    alert("¡Bienvenido al juego! \nElige sabiamente los elementos para asi ganarle a tu oponente!");
}

// Botones de elección
btnRoca.addEventListener('click', () => jugarJuego('Lluvia de rocas'));
btnViento.addEventListener('click', () => jugarJuego('Corte de viento'));
btnFuego.addEventListener('click', () => jugarJuego('Bola de fuego'));
btnAgua.addEventListener('click', () => jugarJuego('Chorro de agua'));
btnTerremoto.addEventListener('click', () => jugarJuego('Terremoto'));

// Botón de reinicio
document.getElementById('reiniciar').addEventListener('click', () => {
    jugadorScore = 0;
    computadoraScore = 0;
    ronda = 1;
    alert("Juego reiniciado. ¡Empieza de nuevo!");
    iniciarJuego();
});
// iniciarJuego();