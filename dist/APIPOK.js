"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getPokemonList = (n, pokemonType) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${n}&offset=0`;
    const response = yield fetch(url);
    const pokemonList = yield response.json();
    let pokemonData = yield Promise.all(pokemonList.results.map((element) => __awaiter(void 0, void 0, void 0, function* () {
        const rawResponse = yield fetch(element.url);
        const pokemonInfo = yield rawResponse.json();
        return {
            name: pokemonInfo.name,
            weight: pokemonInfo.weight,
            height: pokemonInfo.height,
            types: pokemonInfo.types.map((pokemonType) => {
                return pokemonType.type.name;
            })
        };
    })));
    let pokemonCount = pokemonData.length;
    let combinedWeight = 0;
    if (pokemonType) {
        const filteredPokemonData = pokemonData.filter(data => {
            return data.types.some((element) => element === pokemonType);
        });
        combinedWeight = filteredPokemonData.reduce((accumulatedWeight, pokemon) => {
            return accumulatedWeight + pokemon.weight;
        }, 0);
        pokemonCount = filteredPokemonData.length;
        pokemonData = filteredPokemonData;
    }
    else {
        console.log(pokemonData);
        combinedWeight = pokemonData.reduce((accumulatedWeight, pokemon) => {
            return accumulatedWeight + pokemon.weight;
        }, 0);
    }
    return {
        pokemonCount,
        combinedWeight,
        pokemonInfo: pokemonData
    };
});
getPokemonList(20, "bug").then(data => {
    console.log(data);
});
//# sourceMappingURL=APIPOK.js.map