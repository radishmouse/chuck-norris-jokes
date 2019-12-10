const jokeServerAddress = "https://api.chucknorris.io/jokes/random";

// Contaier for our joke(s) and buttons.
// We'll assign it later
let jokeContainer;
let jokeButton;
let multiJokeButton;

function convertToJson(response) {
    console.log(response);
    return response.json();
}

function printJoke(joke) {
    console.log(joke);
}

function extractJoke(dataObject) {
    // debugger;
    // console.log(dataObject.value);
    return dataObject.value;
    // return "Knock knock. Who's there? Oakley."
}

function rendersJokeToPage(jokeString) {
    const h1 = document.createElement('h1');
    h1.textContent = jokeString;
    // document.body.appendChild(h1);
    jokeContainer.appendChild(h1);
}

function clearJokeContainer() {
    jokeContainer.textContent = '';
}

function fetchJoke() {
    fetch(jokeServerAddress)
    .then(r => r.json())       // Hipster version
    // .then(convertToJson)          // Named-function version
    .then(extractJoke)
    .then(rendersJokeToPage)
}

function fetchMultipleJokes(howMany=5) {
    let count = 0;
    while (count < howMany) {
        fetchJoke();
        count += 1;
    }
}

// const whatIsFetch = fetch(jokeServerAddress)
function createJokeContainer() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
}

function createJokeButton() {
    const button = document.createElement('button');
    button.textContent = 'Tell me a joke!';
    document.body.appendChild(button);
    return button;    
}

function createMultipleJokeButton() {
    const button = document.createElement('button');
    button.textContent = 'Tell me A LOT of jokes!';
    document.body.appendChild(button);
    return button;    
}

jokeContainer = createJokeContainer();
jokeButton = createJokeButton();
jokeButton.addEventListener('click', () => {
    clearJokeContainer();
    fetchJoke();
});

multiJokeButton = createMultipleJokeButton();
multiJokeButton.addEventListener('click', () => {
    clearJokeContainer();
    fetchMultipleJokes();
})