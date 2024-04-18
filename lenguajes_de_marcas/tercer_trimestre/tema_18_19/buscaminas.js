function marcar(evento){}
function descubrir(evento){}
function dibujarTablero(numFilas, numColumnas){
    let tablero = document.querySelector("#tablero");

    document.querySelector("html").style.setProperty("--num-filas", numFilas);
    document.querySelector("html").style.setProperty("--num-columnas", numColumnas);

    for(let f = 0; f < buscaminas.numFilas; f++){
        for(let c = 0; c < buscaminas.numColumnas; c++){
            let newDiv = document.createElement("div");
                newDiv.setAttribute("id","f" + f + "_c" + c);
                newDiv.dataset.fila = f;
                newDiv.dataset.columna = c;
                newDiv.addEventListener("contextmenu",marcar);
                newDiv.addEventListener("click",descubrir);

                tablero.appendChild(newDiv);

                }
            }
        }
    const buscaminas = {
        minasTotales: 30,
        numMinasEncontradas: 0,
        numFilas: 15,
        numColumnas: 15,
        aCampoMinas: []
    }
function generarCampoMinasVacio(){
    //generamos el campo de minas en el objeto buscaminas
    buscaminas.aCampoMinas = new Array(buscaminas.numFilas);
    for(let fila = 0; fila < buscaminas.numFilas; fila++){
        buscaminas.aCampoMinas[fila] = new Array(buscaminas.numColumnas);
    }
}
function esparcirMinas(){
    //repartimos de forma aleatoria las minas
    let numMinaEsparcidas = 0;

    while(numMinaEsparcidas < buscaminas.minasTotales){
        //numero aleatorio en el intervalo [0,numFilas - 1]
        let fila = Math.floor(Math.random() * buscaminas.numFilas);
        //numero aleatorio en el intervalo [0,numColumnas - 1]
        let columna = Math.floor(Math.random() * buscaminas.numColumnas);

        //si no hay bomba en esa posicion
        if(buscaminas.aCampoMinas[fila][columna] != "B"){
            //la ponemos
            buscaminas.aCampoMinas[fila][columna] = "B";
            //y sumamos 1 a las bombas esparcidas
            numMinaEsparcidas++;
        }
    }
}
function contarMinasCasilla(fila,columna){
    let numeroMinasAlrededor = 0;
    //de la fila anterior a la posterior
    for(let zFila = fila - 1; zFila <= fila +1; zFila++){
        //de la columna anterior a la posterior
        for(let zColumna = columna - 1; zColumna <= columna + 1; zColumna++){
            //si la casilla ace dentro del tablero
            if(zFila > -1 && zFila <buscaminas.numFilas && zColumna > -1 && zColumna<buscaminas.numColumnas){
                //miramos si en esa posicion hay bomba
                if(buscaminas.aCampoMinas[zFila][zColumna] == "B"){
                    //y sumamos 1 al numero de minas que hay alrededor de esa casilla
                    numeroMinasAlrededor++;
                }
            }
        }
    }

    //y guardamos cuantas minas hay en esa posicion
    buscaminas.aCampoMinas[fila][columna] = numeroMinasAlrededor;
}
function contarMinas(){
    //contamos cuantas minas hay alrededor de cada casilla
    for(let fila = 0; fila<buscaminas.numFilas; fila++){
        for(let columna = 0; columna<buscaminas.numColumnas; columna++){
            //solo contamos si es distinto de bomba
            if(buscaminas.aCampoMinas[fila][columna] != "B"){
                contarMinasCasilla(fila,columna);
            }
        }
    }
}
function inicio(){
    buscaminas.numFilas = 10;
    buscaminas.numColumnas = 10;
    buscaminas.minasTotales = 12;
    dibujarTablero();
    generarCampoMinasVacio();
    esparcirMinas();
    contarMinas();
}
window.onload = inicio;
function marcar(miEvento){
    if(miEvento.type == "contextmenu"){
        console.log(miEvento);
        miEvento.stopPropagation();
        miEvento.preventDefault();
    }
}
