// Registering the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}

const addTab = document.getElementById('add-tab');
const listTab = document.getElementById('list-tab');
const addMovieSection = document.getElementById('add-movie');
const movieListSection = document.getElementById('movie-list');
const saveButton = document.getElementById('save-button');
const moviesContainer = document.getElementById('movies-container');

addTab.addEventListener('click', () => {
    addTab.classList.add('active');
    listTab.classList.remove('active');
    addMovieSection.classList.remove('hidden');
    movieListSection.classList.add('hidden');
});

listTab.addEventListener('click', () => {
    listTab.classList.add('active');
    addTab.classList.remove('active');
    movieListSection.classList.remove('hidden');
    addMovieSection.classList.add('hidden');
    displayMovies();
});

// Ukládání filmu do localStorage
saveButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const rating = document.getElementById('rating').value;

    if (title && description && rating) {
        const movie = { title, description, rating };
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));

        alert('Film byl uložen!');
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('rating').value = '';
    } else {
        alert('Vyplňte všechna pole!');
    }
});

// Zobrazení filmů
function displayMovies() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    moviesContainer.innerHTML = '';

    if (movies.length === 0) {
        moviesContainer.innerHTML = '<p>Žádné filmy nejsou uložené.</p>';
        return;
    }

    movies.forEach((movie) => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <p><strong>Hodnocení:</strong> ${movie.rating}/10</p>
        `;
        moviesContainer.appendChild(movieElement);
    });
}
