
const MAX_INTENTOS = 7;

let numeroSecreto;
let intentos;
let juegoTerminado;

// ELEMENTOS DE LA PANTALLA

const entradaNumero = document.getElementById("numero");
const botonJugar = document.getElementById("botonJugar");
const botonReiniciar = document.getElementById("botonReiniciar");
const mensaje = document.getElementById("mensaje");
const textoIntentos = document.getElementById("intentos");

// FUNCIONES DEL JUEGO

function generarNumero() {
    return Math.floor(Math.random() * 100) + 1;
}

function iniciarJuego() {
    numeroSecreto = generarNumero();
    intentos = 0;
    juegoTerminado = false;

    entradaNumero.value = "";
    entradaNumero.disabled = false;
    botonJugar.disabled = false;

    mensaje.textContent = "";
    textoIntentos.textContent = "Intentos disponibles: 7";

    entradaNumero.focus();
}

function validarNumero(numero) {
    return Number.isInteger(numero) &&
           numero >= 1 &&
           numero <= 100;
}

function mostrarResultado(gano) {
    juegoTerminado = true;

    entradaNumero.disabled = true;
    botonJugar.disabled = true;

    if (gano) {
        mensaje.textContent =
            "¡Felicitaciones! Adivinaste en " +
            intentos + " intentos.";
    } else {
        mensaje.textContent =
            "Se terminaron los intentos. El número era " +
            numeroSecreto + ".";
    }
}

function jugarPartida() {

    if (juegoTerminado) {
        return;
    }

    const numero = Number(entradaNumero.value);

    if (entradaNumero.value.trim() === "" ||
        !validarNumero(numero)) {

        mensaje.textContent =
            "Ingresá un número entero entre 1 y 100.";

        return;
    }

    intentos++;

    if (numero === numeroSecreto) {

        mostrarResultado(true);

    } else if (intentos === MAX_INTENTOS) {

        mostrarResultado(false);

    } else {

        if (numero < numeroSecreto) {
            mensaje.textContent =
                "El número secreto es MAYOR.";
        } else {
            mensaje.textContent =
                "El número secreto es MENOR.";
        }
    }

    textoIntentos.textContent =
        "Intentos disponibles: " +
        (MAX_INTENTOS - intentos);

    entradaNumero.value = "";

    if (!juegoTerminado) {
        entradaNumero.focus();
    }
}

// ACCIONES DEL USUARIO

botonJugar.addEventListener("click", jugarPartida);

botonReiniciar.addEventListener("click", iniciarJuego);

// INICIO DEL PROGRAMA

iniciarJuego();