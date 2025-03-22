const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonNumber = document.querySelector('.pokemon_number');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let currentPokemonId = 1; // Controla qual Pokémon está sendo exibido

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        return APIResponse.ok ? await APIResponse.json() : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    
    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = `#${data.id}`;
        
        const sprite = data.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
                       data.sprites?.front_default;

        pokemonImage.src = sprite || "";
        pokemonImage.style.display = sprite ? "block" : "none";

        currentPokemonId = data.id; // Atualiza o ID atual
    } else {
        pokemonName.innerHTML = "Not found ;c";
        pokemonNumber.innerHTML = "";
        pokemonImage.style.display = "none";
    }
};

// Busca Pokémon pelo nome ou número ao enviar o formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.trim().toLowerCase());
    input.value = '';
});

// Botão "Anterior"
buttonPrev.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        renderPokemon(--currentPokemonId);
    }
});

// Botão "Próximo"
buttonNext.addEventListener('click', () => {
    renderPokemon(++currentPokemonId);
});

// Renderiza o primeiro Pokémon ao carregar a página
renderPokemon(currentPokemonId);
