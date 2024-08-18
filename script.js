document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = '3adb2af39c51b652228e7aa1e442f021';
    const catalogElement = document.getElementById('movie-catalog');
    const searchInput = document.getElementById('movie-search');

    async function fetchPopularMovies() {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    }

    async function fetchMoviesByTitle(title) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}&language=pt-BR&page=1`;
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    }

    function displayMovies(movies) {
        catalogElement.innerHTML = '';

        if (movies.length === 0) {
            catalogElement.innerHTML = '<p>Nenhum filme encontrado.</p>';
            return;
        }

        movies.forEach(movie => {
            const posterUrl = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Image+Available';

            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');

            movieItem.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title} poster">
                <h3>${movie.title}</h3>
                <p>${movie.release_date}</p>
            `;

            catalogElement.appendChild(movieItem);
        });
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchMoviesByTitle(searchTerm);
        } else {
            fetchPopularMovies();
        }
    });

    fetchPopularMovies();
});
