function marcar(evento){}
function descubrir(evento){}
function dibujarTablero(numFilas, numColumnas){
    let tablero = document.querySelector("#tablero");

    document.querySelector("html").style.setProperty("--num-filas", numFilas);
    document.querySelector("html").style.setProperty("--num-columnas", numColumnas);

    for(let f = 0; f < numFilas; f++){
        for(let c = 0; c < numColumnas; c++){
            let newDiv = document.createElement("div");
                newDiv.setAttribute("id","f" + f + "_c" + c);
                newDiv.dataset.fila = f;
                newDiv.dataset.columna = c;
                newDiv.addEventListener("contextmenu",marcar);
                newDiv.addEventListener("click",descubrir);

                tablero.appendChild(newDiv);

                while(tablero.firstChild){
                    tablero.firstChild.removeEventListener("contextmenu",marcar);
                    tablero.firstChild.removeEventListener("click",descubrir);

                    tablero.removeChild(tablero.firstChild);
                }
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