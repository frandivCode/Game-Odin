let vidasPc = 3;
let vidasPlayer = 3;
let personajeJugador = null;
let personajePC = null;

// Personajes y sus ataques
const personajesElementales = [
    {
        personaje: "Magnooki",
        ataques: ["Bola de fuego", "Remolino de agua", "Enrredaderas venenosas", "Sobrecarga electrica"],
    },
    {
        personaje: "Vortapt",
        ataques: ["Llamarada", "Chorro de agua", "Lluvia de espinas", "Electro garra"],
    },
    {
        personaje: "Gleamur",
        ataques: ["Soplido infernal", "Marea poderosa", "Hojas cortantes", "Tormenta electrica"],
    }
];

// Reglas del juego para ganar
const tiposHabilidades = {
    "Bola de fuego": "fuego",
    "Llamarada": "fuego",
    "Soplido infernal": "fuego",
    "Remolino de agua": "agua",
    "Chorro de agua": "agua",
    "Marea poderosa": "agua",
    "Enrredaderas venenosas": "planta",
    "Lluvia de espinas": "planta",
    "Hojas cortantes": "planta",
    "Sobrecarga electrica": "electricidad",
    "Electro garra": "electricidad",
    "Tormenta electrica": "electricidad"
};

const reglasAtaques = {
    "fuego": ["planta"],
    "agua": ["fuego"],
    "planta": ["electricidad"],
    "electricidad": ["agua"]
};

function getComputerChoice() {
    const ataques = [
        "Bola de fuego", "Remolino de agua", "Enrredaderas venenosas", "Sobrecarga electrica",
        "Llamarada", "Chorro de agua", "Lluvia de espinas", "Electro garra",
        "Soplido infernal", "Marea poderosa", "Hojas cortantes", "Tormenta electrica"
    ];
    const eleccionPC = Math.floor(Math.random() * ataques.length);
    return ataques[eleccionPC];
}

function getComputerCharacter() {
    const personajes = personajesElementales.map(p => p.personaje);
    const eleccionPC = Math.floor(Math.random() * personajes.length);
    return personajes[eleccionPC];
}

function mostrarTablaVentajas() {
    const tablaVentajas = `
    Ventajas y Desventajas:
    🔥 Fuego vence ➡️ Planta 🌱
    💧 Agua vence ➡️ Fuego 🔥
    🌱 Planta vence ➡️ Electricidad ⚡
    ⚡ Electricidad vence ➡️ Agua 💧
    `;
    alert(tablaVentajas);
}

// Elecciones
function jugarRonda(opcionJugador, opcionComputadora) {
    alert('Elegiste ➡️ ' + opcionJugador);
    alert('El PC eligió ➡️ ' + opcionComputadora);

    const tipoJugador = tiposHabilidades[opcionJugador];
    const tipoComputadora = tiposHabilidades[opcionComputadora];

    if (tipoJugador === tipoComputadora) {
        alert("¡Hay un empate!");
    } else if (reglasAtaques[tipoJugador] && reglasAtaques[tipoJugador].includes(tipoComputadora)) {
        alert("Has ganado esta ronda. ¡Sigue así!");
        vidasPc--;
    } else {
        alert("Has perdido esta ronda. ¡Vamos, no te rindas!");
        vidasPlayer--;
    }

    alert("PUNTAJE \nTú: " + vidasPlayer + " Computer: " + vidasPc);

    if (vidasPlayer === 0 || vidasPc === 0) {
        if (vidasPlayer > vidasPc) {
            alert('Has ganado, bien hecho!🥳');
        } else if (vidasPlayer === vidasPc) {
            alert('Uff se dio un empate, la próxima será...');
        } else {
            alert('Lamentablemente perdiste 🙁');
        }

        // Resultado Final
        alert("Resultado Final \n" + "Tú: " + vidasPlayer + " Computer: " + vidasPc);

        vidasPlayer = 3;
        vidasPc = 3;
        ronda = 1;
        document.querySelector('.contenedorPersonajes').style.display = 'block';
        document.querySelector('.contenedorBotones').style.display = 'none';
    }
}

let ronda = 1;
const totalRondas = 5;

function jugarJuego(opcionJugador) {
    alert("Comenzó la ronda " + ronda);
    const computerSelection = getComputerChoice();
    jugarRonda(opcionJugador, computerSelection);
    ronda++;
}

function iniciarJuego() {
    alert("¡Bienvenido a Elemental Dominance! \n¡Demuestra todo tu potencial en la batalla!");
    mostrarTablaVentajas();
    alert("¡Mucha Suerte!");
}

const btnsPersonajes = document.querySelectorAll('.btn-personaje');

btnsPersonajes.forEach(btn => {
    btn.addEventListener('click', () => {
        personajeJugador = btn.getAttribute('data-personaje');
        personajePC = getComputerCharacter();
        alert(`Has elegido a ${personajeJugador} y el PC ha elegido a ${personajePC}`);

        document.querySelector('.contenedorPersonajes').style.display = 'none';
        document.querySelector('.contenedorBotones').style.display = 'block';

        // Esconder todos los botones de ataques
        document.querySelectorAll('.contenedorBotones .btn-choice').forEach(ataqueBtn => {
            ataqueBtn.style.display = 'none';
        });

        // Mostrar solo los ataques del personaje seleccionado
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

// Botón de reinicio
document.getElementById('reiniciar').addEventListener('click', () => {
    vidasPlayer = 3;
    vidasPc = 3;
    ronda = 1;
    personajeJugador = null;
    personajePC = null;
    document.querySelector('.contenedorPersonajes').style.display = 'block';
    document.querySelector('.contenedorBotones').style.display = 'none';
    alert("Juego reiniciado. ¡Empieza de nuevo!");
    iniciarJuego();
});

iniciarJuego();