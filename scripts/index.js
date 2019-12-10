const jokeServerAddress = "https://api.chucknorris.io/jokes/random";

// Contaier for our joke(s) and buttons.
// We'll assign it later
let jokeContainer;
let jokeButton;

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
    jokeContainer.textContent = '';
    jokeContainer.appendChild(h1);
}

function fetchJoke() {
    fetch(jokeServerAddress)
    .then(r => r.json())       // Hipster version
    // .then(convertToJson)          // Named-function version
    .then(extractJoke)
    .then(rendersJokeToPage)
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

jokeContainer = createJokeContainer();
jokeButton = createJokeButton();
jokeButton.addEventListener('click', fetchJoke);