const movieList = document.querySelector('.movies-list');
const apiKey = '2740e842a158d82dfdb0a83d87b2a1a8';


const loadMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=2740e842a158d82dfdb0a83d87b2a1a8`)
        .then(res => res.json())
        .then(data => {
            data.results.forEach(movie => {
                createMovieContainer(movie);
            })
        });
};

const createMovieContainer = (movieData) => {
    
    const movieContainer = document.createElement('div');
    const moviePoster = document.createElement('div');
    const movieInfo = document.createElement('div');
    const movieTitle = document.createElement('h2');
    const movieRatingWrapper = document.createElement('div');
    const movieRating = document.createElement('p');
    const ratingIcon = document.createElement('i');
   

    
    movieRatingWrapper.append(ratingIcon, movieRating);
    movieInfo.append(movieTitle, movieRatingWrapper);
    movieContainer.append(moviePoster, movieInfo);

    //class names
    movieContainer.classList.add('movie-container');
    moviePoster.classList.add('movie-poster');
    movieInfo.classList.add('movie-information');
    movieTitle.classList.add('movie-title');
    movieRatingWrapper.classList.add('movie-rating-wrapper');
    movieRating.classList.add('movie-rating')
    

    
    moviePoster.style.background = `url('https://image.tmdb.org/t/p/w500${movieData.poster_path}') center center/cover`

    
    movieTitle.innerHTML = `${movieData.original_title}`;
    movieRating.innerHTML += `${movieData.vote_average}/10 IMDb`;


    
    movieContainer.addEventListener('click', () => {
        sessionStorage.setItem('movieID', movieData.id);
        window.location = 'booking.html'
    })

    
    movieList.appendChild(movieContainer);
};

loadMovies();