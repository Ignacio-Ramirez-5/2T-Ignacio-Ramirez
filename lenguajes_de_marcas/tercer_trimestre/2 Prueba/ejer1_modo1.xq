declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare option output:method "xml";
declare option output:indent "yes";

let $pokemons := doc("pokedaw.xml")/pokeDAW/pokemon[@tipo = "agua" and genero = "Femenino"]

return (
   
    <etiqueta>
        {for $pokemon in $pokemons
        return
            <pokemon_agua_femeninos>
                <nombre>{$pokemon/nombre}</nombre>
                <estado>{$pokemon/estado/puntosVida}{$pokemon/estado/faseEvolucion}</estado>
            </pokemon_agua_femeninos>
        }
    </etiqueta>
)