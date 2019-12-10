const jokeServerAddress = "https://api.chucknorris.io/jokes/random";

function convertToJson(response) {
    console.log(response);
    return response.json();
}

function printJoke(joke) {
    console.log(joke);
}

function extractJoke(dataObject) {
    // debugger;
    // return dataObject.value;
    return "Knock knock. Who's there? Oakley."
}

function rendersJokeToPage(jokeString) {
    const h1 = document.createElement('h1');
    h1.textContent = jokeString;
    document.body.appendChild(h1);
}


const whatIsFetch = fetch(jokeServerAddress)
    // .then(r => r.json())       // Hipster version
    // .then(convertToJson)          // Named-function version
    // .then(extractJoke)
    // .then(rendersJokeToPage)
