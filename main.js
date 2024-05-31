// Score 
let computadoraScore = 0;
let jugadorScore = 0;

// Buttons
const btnPiedra = document.getElementById('btn-piedra');
const btnPapel = document.getElementById('btn-papel');
const btnTijera = document.getElementById('btn-tijera');

// Elección PC
function getComputerChoice() {
    let eleccionPC = Math.floor(Math.random() * 3);
    if (eleccionPC == 0) {
        return 'piedra';
    } else if (eleccionPC == 1) {
        return 'papel';
    } else if (eleccionPC == 2) {
        return 'tijera';
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
        (opcionJugador === "piedra" && opcionComputadora === "tijera") ||
        (opcionJugador === "papel" && opcionComputadora === "piedra") ||
        (opcionJugador === "tijera" && opcionComputadora === "papel")
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
    alert("Ronda " + ronda);
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
    alert("¡Bienvenido al juego! Elige piedra, papel o tijera para comenzar :)");
}

// Botones de elección
btnPiedra.addEventListener('click', () => jugarJuego('piedra'));
btnPapel.addEventListener('click', () => jugarJuego('papel'));
btnTijera.addEventListener('click', () => jugarJuego('tijera'));

// Botón de reinicio
document.getElementById('reiniciar').addEventListener('click', () => {
    jugadorScore = 0;
    computadoraScore = 0;
    ronda = 1;
    alert("Juego reiniciado. ¡Empieza de nuevo!");
    iniciarJuego();
});
iniciarJuego();