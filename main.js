let computadoraScore = 0;
let jugadorScore = 0;

// Eleccion PC
function getComputerChoice() {
    let eleccionPC = Math.floor(Math.random() * 3);

    if (eleccionPC == 0) {
        return 'piedra';
    } else if (eleccionPC == 1) {
        return 'papel';
    } else if (eleccionPC == 2) {
        return 'tijera';
    }
}

// Eleccion Jugador
function getHumanChoice() {
    let eleccionPlayer = prompt('Elige piedra, papel o tijera para jugar!');
    if (eleccionPlayer == 'piedra') {
        return 'piedra';
    } else if (eleccionPlayer == 'papel') {
        return 'papel';
    } else if (eleccionPlayer == 'tijera') {
        return 'tijera';
    } else {
        return 'Invalid';
    }
}

// Rondas y elecciones
function jugarRonda(opcionJugador, opcionComputadora) {
    alert('Elegiste ' + opcionJugador);
    alert('El PC eligió ' + opcionComputadora);

    if (opcionJugador === opcionComputadora) {
        alert("¡Se dió un empate! Elige mejor en la próxima ronda.");
    } else if (
        (opcionJugador === "piedra" && opcionComputadora === "tijera") ||
        (opcionJugador === "papel" && opcionComputadora === "piedra") ||
        (opcionJugador === "tijera" && opcionComputadora === "papel")
    ) {
        jugadorScore++;
        alert("Has ganado esta ronda. ¡Sigue así!");
    } else {
        computadoraScore++;
        alert("Has perdido esta ronda. ¡Vamos, no te rindas!");
    }
}

// Juego
function jugarJuego() {
    let ronda = 1;

    for (i = 0; i < 5; i++) {
        alert("Ronda " + ronda);
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        jugarRonda(humanSelection, computerSelection);
        alert(
            "PUNTAJE \nTú: " + jugadorScore + " Computer: " + computadoraScore
        );
        ronda++;
    }
    // Mensaje Final
    if (jugadorScore > computadoraScore) {
        alert('GANASTE 🥳');
    } else if (jugadorScore == computadoraScore) {
        alert('EMPATE');
    } else {
        alert('PERDISTE 🙁');
    }
}

// Iniciar game
jugarJuego();
