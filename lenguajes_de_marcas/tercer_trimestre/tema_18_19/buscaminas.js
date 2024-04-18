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
    if(miEvento.type === "contextmenu"){
        console.log(miEvento);
        miEvento.stopPropagation();
        miEvento.preventDefault();
        let fila = casilla.dataset.fila;
        let columna = casilla.dataset.columna;

        if(fila >= 0 && columna >= 0 && fila < buscaminas.numFilas && columna < buscaminas.numColumnas){
            if(casilla.classList.contains("icon-bandera")){
                casilla.classList.remove("icon-bandera");
                casilla.classList.add("icon-duda");
                buscaminas.numMinasEncontradas--;
            } else if(casilla.classList.contains("icon-duda")){
                casilla.classList.remove("icon-duda");
            } else if(casilla.classList.legth == 0){
                casilla.classList.add("icon-bandera");
                buscaminas.numMinasEncontradas++;
                if(buscaminas.numMinasEncontradas == buscaminas.minasTotales){
                    buscaminas.resolverTablero(true);
                }
            }
        }
    }
}
function descubrir(miEvento){
    if(miEvento.type === "click"){
        let casilla = miEvento.currentTarget;
        let fila = casilla.dataset.fila;
        let columna = casilla.dataset.columna;
    }
}
function descubrirCasilla(fila, columna){
    console.log("destapamos la casilla con fila " + fila + " y columna " + columna);
    if(fila > -1 && fila < buscaminas.numFilas && columna > -1 && columna < buscaminas.numColumnas){
        let casilla = document.querySelector("#f" + fila + "_c" + columna);
        if(!casilla.classList.contains("destapado")){
            if(!casilla.classList.contains("icon-bandera")){
                casilla.classList.add("destapado");
                casilla.innerHTML = buscaminas.aCampoMinas[fila][columna];
                casilla.classList.add("c" + buscaminas.aCampoMinas[fila][columna]);
                if(buscaminas.aCampoMinas[fila][columna] !=="B"){
                    if(buscaminas.aCampoMinas[fila][columna] == 0){
                        descubrirCasilla(fila -1, columna -1);
                        descubrirCasilla(fila -1, columna);
                        descubrirCasilla(fila -1, columna +1);
                        descubrirCasilla(fila, columna -1);
                        descubrirCasilla(fila, columna +1);
                        descubrirCasilla(fila +1, columna -1);
                        descubrirCasilla(fila +1, columna);
                        descubrirCasilla(fila +1, columna +1);
                        casilla.innerHTML = "";
                    }
                } else if(buscaminas.aCampoMinas[fila][columna] == "B"){
                    casilla.innerHTML = "";
                    casilla.classList.add("icon-bomba");
                    casilla.classList.add("sinmarcar");
                    resolverTablero(false);
                }
            }
        }
    }
}