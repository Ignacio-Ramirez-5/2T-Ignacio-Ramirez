//Añadir jugadores
let jugador = 1; 
let jugador1 = 0;
let jugador2 = 0;
let casillas = document.querySelectorAll(".casilla"); 
let tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ganador = false;
let combinaciones = [
  [0, 1, 2],
  [3, 4, 5], //Añadir combinaciones para que que se pueda ganar en la linea del medio
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function jugada(num) {
  if (!ganador && tablero[num - 1] === 0) {
    tablero[num - 1] = jugador;
    casillas[num - 1].classList.add("jugador" + jugador);
    if (comprobarGanador()) {
      alert("Jugador " + jugador + " ha ganado");
      ganador = true;
    } else if (comprobarEmpate()) {
      alert("Empate");
      ganador = true;
    } else {
      cambiarJugador();
    }
  }
}

//Cambiar funcion de cambiarJugador para que se actualice correctamente los marcadores y empiece el el ultimo en jugar
function cambiarJugador() {
  jugador = jugador === 1 ? 2 : 1; 
  document.getElementById("jugador1").innerHTML = jugador === 1 ? jugador1 : jugador2;
  document.getElementById("jugador2").innerHTML = jugador === 2 ? jugador1 : jugador2;
}

function comprobarGanador() {
  for (let i = 0; i < combinaciones.length; i++) {
    const combinacion = combinaciones[i];
    let ganador = true;
    for (let j = 0; j < combinacion.length; j++) {
      const casilla = combinacion[j];
      if (tablero[casilla] !== jugador) {
        ganador = false;
        break;
      }
    }
    if (ganador) {
      return true;
    }
  }
  return false;
}

function comprobarEmpate() {
  return !tablero.includes(0);
}

function reset() {
    tablero = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    ganador = false;
    casillas.forEach(casilla => {
        casilla.classList.remove("jugador1", "jugador2");
    });
}
function otra(){

}