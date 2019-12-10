const jokeServerAddress = "https://api.chucknorris.io/jokes/random";
const categoryServerAddress = "https://api.chucknorris.io/jokes/categories";

// Contaier for our joke(s) and buttons.
// We'll assign it later
let categoryContainer;
let categoryHeader;
let currentCategory;
let jokeContainer;
let jokeButton;
let multiJokeButton;

function addressForCurrentCategory() {
    if (currentCategory) {
        return `${jokeServerAddress}?category=${currentCategory}`;
    } else {
        return jokeServerAddress;
    }
    
}

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

function categoriesToListItems(categoryArray) {
    return categoryArray.map(cat => {
        const el = document.createElement('li');
        el.textContent = cat;
        return el;
    })
}

function setCategory(category) {
    currentCategory = category;
    updateCategoryHeader(category);
    console.log(`you clicked ${category}`)
}

function addCategoryClickHandler(categoryListItems) {
    categoryListItems.forEach(item => {
        item.addEventListener('click', () => {
            setCategory(item.textContent);
            
        })
    });

    return categoryListItems;
}

function renderCategories(categoryListItems) {
    categoryListItems.forEach(item => {
        categoryContainer.appendChild(item);
    });
}

function fetchCategories() {
    fetch(categoryServerAddress)
        .then(r => r.json())
        .then(categoriesToListItems)
        .then(addCategoryClickHandler)
        .then(renderCategories)
}

function fetchJoke() {
    fetch(addressForCurrentCategory())
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

function updateCategoryHeader(cat) {
    categoryHeader.textContent = `Current category: ${cat}`;
}

function createCategoryHeader() {
    const categoryHeader = document.createElement('h2');
    document.body.appendChild(categoryHeader);
    return categoryHeader;    
}

function createCategoryContainer() {
    const container = document.createElement('ul');
    document.body.appendChild(container);
    return container;    
}

jokeContainer = createJokeContainer();
categoryContainer = createCategoryContainer();
categoryHeader = createCategoryHeader();

jokeButton = createJokeButton();
jokeButton.addEventListener('click', () => {
    clearJokeContainer();
    fetchJoke();
});

multiJokeButton = createMultipleJokeButton();
multiJokeButton.addEventListener('click', () => {
    clearJokeContainer();
    fetchMultipleJokes();
});

fetchCategories();