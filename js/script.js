const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')
const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext= document.querySelector('.btn-next')
let searchPokemon = 1;
let maxPokemons = 0;

const fecthPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
    const data = await APIResponse.json();
   return data;
}
}

const fetchPokemonCount = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/');
    const data = await response.json();
    maxPokemons = data.count;
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
    
    if (pokemon < 1) {
        pokemon = 1;
    }
    
    const data = await fecthPokemon(pokemon);
if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
    searchPokemon = data.id;

    if (data.id === 1) {
        buttonPrev.disabled = true;
    } else {
        buttonPrev.disabled = false;
    }

    if (data.id === maxPokemons) {
        buttonNext.disabled = true;
    } else {
        buttonNext.disabled = false;
    }
} else {
    pokemonName.innerHTML = 'Not found :[';
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';
}
    input.value = '';
}

const initialize = async () => {
    await fetchPokemonCount();
    renderPokemon(searchPokemon);
}

initialize();

form.addEventListener('submit', (event) => {

     event.preventDefault();
     renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', () => {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})
