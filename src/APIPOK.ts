type PokemonType = {
    slot: number;
    "type": {
        name: string;
        url: string;
    };
}
type PokemonData = {
    name: string,
    weight: number,
    height: number,
    types: PokemonType[],
}

type PokemonList = {
    pokemonCount: number,
    combinedWeight: number,
    pokemonInfo: PokemonData[]
}
const getPokemonList = async (n: number, pokemonType?: string): Promise<PokemonList> => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${n}&offset=0`;
    const response = await fetch(url);
    const pokemonList = await response.json();
    let pokemonData = await Promise.all(pokemonList.results.map(
        async (element: {name:  string, url: string}) => {
        const rawResponse = await fetch(element.url);
        const pokemonInfo = await rawResponse.json();
        return {
            name: pokemonInfo.name,
            weight: pokemonInfo.weight,
            height: pokemonInfo.height,
            types: pokemonInfo.types.map( (pokemonType:PokemonType)=> {
                return pokemonType.type.name;
            })
        };
    }));
    let pokemonCount = pokemonData.length;
    let combinedWeight = 0;
    if(pokemonType) {
        const filteredPokemonData = pokemonData.filter(data => {
            return data.types.some( 
                (element: string) => element === pokemonType);
        });
        combinedWeight = filteredPokemonData.reduce(
            (accumulatedWeight, pokemon) => {
                return accumulatedWeight + pokemon.weight
            }, 0
        );
        pokemonCount = filteredPokemonData.length;
        pokemonData = filteredPokemonData;

    } else {
        console.log(pokemonData);
        combinedWeight = pokemonData.reduce(
            (accumulatedWeight, pokemon) => {
                return accumulatedWeight + pokemon.weight
            }, 0
        );
    }
    return {
        pokemonCount,
        combinedWeight,
        pokemonInfo: pokemonData
    };
}

getPokemonList(20, "bug").then(data => {
    console.log(data);
});