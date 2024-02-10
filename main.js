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
    const movieGenreWrapper = document.createElement('div');

    
    movieRatingWrapper.append(ratingIcon, movieRating);
    movieInfo.append(movieTitle, movieRatingWrapper,movieGenreWrapper);
    movieContainer.append(moviePoster, movieInfo);

    //class names
    movieContainer.classList.add('movie-container');
    moviePoster.classList.add('movie-poster');
    movieInfo.classList.add('movie-information');
    movieTitle.classList.add('movie-title');
    movieRatingWrapper.classList.add('movie-rating-wrapper');
    movieRating.classList.add('movie-rating')
    movieGenreWrapper.classList.add('movie-genre');

    
    moviePoster.style.background = `url('https://image.tmdb.org/t/p/w500${movieData.poster_path}') center center/cover`

    
    movieTitle.innerHTML = `${movieData.original_title}`;
    movieRating.innerHTML += `${movieData.vote_average}/10 IMDb`;

    fetch('genres.json')
    .then(res => res.json())
    .then(data => {
        movieData.genre_ids.forEach(id => {
            data.genres.forEach(genre => {
                if (genre.id === id) {
                    const movieGenre = document.createElement('div');
                    movieGenre.classList.add('genre');
                    movieGenre.innerHTML = genre.name;
                    movieGenreWrapper.appendChild(movieGenre);
                };
            });
        });
    });
    
    movieContainer.addEventListener('click', () => {
        sessionStorage.setItem('movieID', movieData.id);
        window.location = 'booking.html'
    })

    
    movieList.appendChild(movieContainer);
};

loadMovies();

//for dropdown
 function dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
 //sort by ratings
 const movieTitle = document.querySelector(".movie-title");
const movieRating = document.querySelector(".movie-rating");
const ratingsbtn = document.querySelector(".btn");

let movieStorage = [];
console.log();



function sendMovie() {
    if(event.keyCode == 13) {
        if(movieTitle.value != "" && movieRating.value != "") {
            const title = movieTitle.value;
            const rating = parseInt(movieRating.value);

            movieStorage.push({
                title: title,
                rating: rating
            });

            // If rating of a is bigger than rating of b return 1, if not return -1
            movieStorage.sort((a, b) => (a.rating > b.rating) ? -1 : 1);
            console.log(movieStorage);

            addMovieToList();

            movieTitle.value = "";
            movieRating.value = "";
        } else {
            console.log("Fields missing");
        }
    }
}

function addMovieToList() {
movieList.innerHTML="";
movieStorage.forEach(movie =>{


    const div = document.createElement("div");
    div.className = "list-items";

    div.innerHTML = `
    <div class="item-title">
        <p>${movie.title}</p>
    </div>

    <div class="item-rating">
        <p>${movie.rating}</p>
    </div>

    <div class="item-delete">
        <i class="fa fa-trash trash-icon delete"></i>
    </div>
    `;

    movieList.appendChild(div);
});
}