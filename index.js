//Create movie app
const moviePicker = {};
moviePicker.apiKey = `7b4ee228270013c7be42d484778165ef`;

//Base url for api endpoint
moviePicker.baseURL = "https://api.themoviedb.org/3/"

//Select form element for method use
const form = document.querySelector('form');

/***Event Listeners****/
//Event Listener to listen for submit button to be clicked by user.
//*******Need to add error message in case user does not submit correct input*********
form.addEventListener('submit', function (event) {
  //Prevents page from refreshing
  event.preventDefault();
  //Get actor input from user
  const actorInput = document.querySelector("input[type=text]").value;
  //Get genre option selected by user
  const genreInput = document.querySelector("select");
  const changeHeight = document.querySelector("body");
  changeHeight.style.height = "100%";
  //Call method to get the actor id of the actor searched for by user
  moviePicker.getActorId(actorInput, genreInput.selectedOptions[0].value);
});

/****API Method Calls****/
//Method to retrieve actor id from api 
moviePicker.getActorId = (name, genre) => {
  //Api Endpoint to append to base url
  const endpoint = "search/person";
  //Url Constructor
  const url = new URL(moviePicker.baseURL + endpoint);
  //Url Parameters
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
    //Query: name of actor
    query: name,
  })

  //Fetch data from api endpoint
  fetch(url)
    //Parse response into JSON and return response so it can be used
    .then((response) => {
      return response.json();
    })
    //Parse JSON promise response
    .then((jsonResponse) => {
      console.log(jsonResponse);
      //Pass actor id found from api call and genre passed to method to search for movies with both preferences
      moviePicker.getFilteredMovies(jsonResponse.results[0].id, genre);
      //Error Handler
    }).catch((error) => {
      console.log('Error Has Occured', error);
      alert('Please Select Your Favourite Actor Name And Genre');
    })
};

//Method to call api with user input preferences
moviePicker.getFilteredMovies = (actorId, genre) => {
  //Api endpoint to append to base url
  const endpoint = "discover/movie";
  //Url Constructor
  const url = new URL(moviePicker.baseURL + endpoint);
  //Url Parameters
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
    with_cast: actorId,
    with_genres: genre,
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
      moviePicker.loadMovies(jsonResponse.results, genre);
      //Error Handler
    }).catch((error) => {
      console.log('Error Has Occured', error);
      alert('Please Select Actor Name and Genre From Dropdown Menu 🙂🤘🏾');
    })
};

//Method to call genre api and fetch data to put into form select
moviePicker.getGenre = () => {
  //Api Endpoint to append to base url
  const endpoint = "genre/movie/list";
  //Url constructor to add api key
  const url = new URL(moviePicker.baseURL + endpoint);
  //Search Parameters
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
  });

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
      //Error Handler
    }).catch((error) => {
      console.log('Error Has Occured', error);
      alert('Error Has Occured');
    })
};

/****Methods to load data to html****/

//Method to load results to Html page and contains an event listener for when an image is clicked
moviePicker.loadMovies = (movies, genre) => {
  //Select div element that we want to dynamically change
  const results = document.querySelector('.results');
  // Clears the container before appending results to it
  results.innerHTML = '';
  //Loop through each movie item we got from API
  movies.forEach((movie) => {
    //Object Destructuring
    const { title, id, poster_path, vote_average } = movie;
    // if (movie.src) {
    // Create a div element to wrap each movie
    const movieDiv = document.createElement('div');
    //Add movie class to div
    movieDiv.classList.add('movie');

    //Image path retrieved from api
    const url = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    // Create an img element
    const image = document.createElement('img');
    //Add image path to image src attribute
    image.src = url;
    //Add movie title image description to alt attribute
    image.alt = title + ' movie poster';
    //Set image id to movie id
    image.id = id;

    //Create an h2 element for the title
    const movieTitle = document.createElement('h3');
    //Update the text of h2 with the movie.title
    movieTitle.textContent = title;

    //Get data for movie popularity
    const moviePopularity = document.createElement('p');
    //Add movie average to p element
    moviePopularity.textContent = (vote_average * 10) + '%';

    //Append image, title and popularity to div
    movieDiv.append(image, movieTitle, moviePopularity);
    //Append div to results div
    results.append(movieDiv);
  });

  //Create an image element
  const img = document.createElement('img');
  //Add image path to the img created
  img.src = movies[0].poster_path;
  //Add alt attribute to img created
  img.alt = "";
  //Append element to Html
  results.appendChild(img);

  //For each image on page, add an event listener for user click
  document.querySelectorAll('img').forEach(movieImage => {
    movieImage.addEventListener('click', function (event) {
      //Prevent page from refreshing
      event.preventDefault();
      //Store movie id
      const movieId = movieImage.id;
      //Redirect page to movie-info page and pass movie id
      window.location.href = "./movie-info.html" + '?' + movieId;
    })
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
    //Destructuring Object
    const { id, name } = genre;
    //Set value of option to genre id
    option.value = id;
    //Set inner html to genre name
    option.innerHTML = name;
    //Append option to select element
    selectForm.appendChild(option);
  });
};

/****Initialize Method****/
moviePicker.init = () => {
  //Genre api call to load genre data to form
  moviePicker.getGenre();
};

//Method to start app
moviePicker.init();
