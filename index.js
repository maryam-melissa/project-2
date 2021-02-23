//Create an Movie app
const moviePicker = {};
moviePicker.apiKey = `7b4ee228270013c7be42d484778165ef`;

//Base url for api endpoint
moviePicker.baseURL = "https://api.themoviedb.org/3/"

//Get Genre List form API call
moviePicker.apiGenrelUrl = "https://api.themoviedb.org/3/genre/movie/list";
//Get Movies with Actor from API call
moviePicker.apiActorUrl = "https://api.themoviedb.org/3/search/person";
//Get Movies Filtered with Actor ID and Genre
moviePicker.apiFilteredMovies = "https://api.themoviedb.org/3/discover/movie";

//Select form element for method use
const form = document.querySelector('form');

//Event Listener to listen for submit button to be clicked by user.
//*******Need to add error message in case user does not submit correct input*********
form.addEventListener('submit', function (event) {
  //Prevents page from refreshing
  event.preventDefault();

  //Get actor input from user
  const actorInput = document.querySelector("input[type=text]");

  //Get genre option selected by user
  const genreInput = document.querySelector("select");

  //Call method to get the actor id of the actor searched for by user
  moviePicker.getActorId(actorInput.value, genreInput.selectedOptions[0].value);
});


//Method to retrieve actor id from api 
moviePicker.getActorId = (name, genre) => {
  //Url Constructor
  const url = new URL(moviePicker.apiActorUrl);
  //Url Parameters
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
    //Query: name of actor
    query: name
  })

  //Fetch data from api endpoint
  fetch(url)
    //Parse response into JSON and return response so it can be used
    .then((response) => {
      return response.json();
    })
    //Parse JSON promise response
    .then((jsonResponse) => {
      //Pass actor id found from api call and genre passed to method to search for movies with both preferences
      moviePicker.getFilteredMovies(jsonResponse.results[0].id, genre);
    })
}

//Method to call api with user input preferences
moviePicker.getFilteredMovies = (actorId, genre) => {
  //Url Constructor
  const url = new URL(moviePicker.apiFilteredMovies);
  //Url Parameters
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
    with_cast: actorId,
    with_genre: genre,
  })

  //Fetch data from api endpoint
  fetch(url)
    //Parse response into JSON and return response so it can be used
    .then((response) => {
      return response.json();
    })
    //Parse JSON promise response
    .then((jsonResponse) => {
      //Call method to load results to Html page
      console.log(jsonResponse.results);
      moviePicker.loadMovies(jsonResponse.results);
    })
}

//Method to load results to Html page
moviePicker.loadMovies = (movies) => {
  //Select div element that we want to dynamically change
  const results = document.querySelector('.results');
  // Clears the container before appending results to it
  results.innerHTML = '';
  //Loop through each movie item we got from API
  movies.forEach((movie) => {
    // console.log(movie)
    // Create a div element to wrap all the information in

    // const movieDiv = document.createElement('div');
    // movieDiv.classList.add('movie');

    //image path that we recieved from api call
    const url = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    // Create a img element for the art img
    const image = document.createElement('img');
    image.src = url;
    image.alt = movie.title;

    //Create an h2 element for the title
    const title = document.createElement('h2');

    //Update the text of h2 with the movie.title
    title.textContent = movie.title;
    console.log(title)

    //Get data for movie popularity
    const moviePopularity = document.createElement('p');
    // moviePopularity.

  })

  //Create an image element
  const img = document.createElement('img');
  //Add image path to the img created
  img.src = movies[0].poster_path;
  //Add alt attribute to img created
  img.alt = "";
  //Append element to Html
  results.appendChild(img);
}

//Method to call genre api and fetch data to put into form select
moviePicker.getGenre = () => {
  //Url constructor to add api key
  const url = new URL(moviePicker.apiGenrelUrl);
  //Search Parameters
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
  })
  //Request to API genre endpoint
  fetch(url)
    //Parse response into JSON and return response so it can be used
    .then((response) => {
      return response.json();
    })
    //Parse JSON promise response
    .then((jsonResponse) => {
      //Call method to load data into form select
      moviePicker.loadGenreData(jsonResponse.genres);
    })
};

//Method to add genre data to select in Html
moviePicker.loadGenreData = (genres) => {
  //Find the dropdown selector
  const selectForm = document.querySelector('select');

  //For each genre in genres array
  genres.forEach(genre => {
    //Create option element
    const option = document.createElement('option');
    //Set value of option to genre id
    option.value = genre.id;
    //Set inner html to genre name
    option.innerHTML = genre.name;
    //Append option to select element
    selectForm.appendChild(option);
  });
}

//Method to initialize app
moviePicker.init = () => {
  //Genre api call to load genre data to form
  moviePicker.getGenre();
}

//Method to start app
moviePicker.init();
