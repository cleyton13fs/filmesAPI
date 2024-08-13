document.getElementById('movie-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const movieTitle = document.getElementById('movie-title').value;
    const apiKey = '3adb2af39c51b652228e7aa1e442f021'; 
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.results.length > 0) {
            const movie = data.results[0];
            displayMovieDetails(movie);
            console.log('Detalhes do filme:', movie); 
        } else {
            document.getElementById('movie-details').innerHTML = 'Nenhum filme encontrado.';
            console.log('Nenhum filme encontrado.');
        }
    } catch (error) {
        document.getElementById('movie-details').innerHTML = 'Ocorreu um erro ao buscar os detalhes do filme.';
        console.error('Erro ao buscar detalhes do filme:', error);
    }
});

function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
        <p><strong>Sinopse:</strong> ${movie.overview}</p>
        <p><strong>Nota:</strong> ${movie.vote_average}</p>
        <p><strong>Popularidade:</strong> ${movie.popularity}</p>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    `;
}
