declare namespace output = "http://www.w3.org/2010/xslt-xquery-serialization";
declare option output:method "xml";
declare option output:indent "yes";

let $pokemons := doc("pokedaw.xml")/pokeDAW/pokemon[@tipo = "agua" and genero = "Femenino"]

return (

    <atributo>
        {for $pokemon in $pokemons
        return
            <pokemon_agua_femeninos>
                <nombre numeroPokedex="{$pokemon/nombre/@numeroPokedex}" nombre="{$pokemon/nombre}"/>
                <estado>{$pokemon/estado/faseEvolucion}</estado>
                <vida>{$pokemon/estado/puntosVida}</vida>
            </pokemon_agua_femeninos>
        }
    </atributo>
)