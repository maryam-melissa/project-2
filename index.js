//Create an Movie app
const moviePicker = {};
moviePicker.apiKey = `7b4ee228270013c7be42d484778165ef`;

//Get Genre List form API call
moviePicker.apiGenrelUrl = "https://api.themoviedb.org/3/genre/movie/list";
//Get Movies with Actor from API call
moviePicker.apiActorUrl = "https://api.themoviedb.org/3/search/person";

moviePicker.apiFilteredMovies = "https://api.themoviedb.org/3/discover/movie";

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  //prevents page from refreshing
  event.preventDefault();

  //todo
  //get actor input
  const actorInput = document.querySelector("input[type=text]");
  // console.log(actorInput.value);
  //get genre option
  const genreInput = document.querySelector("select");
  // console.log(genreInput.selectedOptions[0].value);

  //api call
  moviePicker.getActorId(actorInput.value, genreInput.selectedOptions[0].value);
 
});

moviePicker.getActorId = (name, genre) => {
  const url = new URL(moviePicker.apiActorUrl);
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
    query: name
  })
  fetch(url)
  //parse response into JSON and return response so it can be used
  .then((response) => {
    return response.json();
  })
  //parse JSON promise response
  .then((jsonResponse) => {
    console.log(jsonResponse.results[0].id); 
   moviePicker.getFilteredMovies(jsonResponse.results[0].id, genre);
  })
}

//method to call api filtered with user input
moviePicker.getFilteredMovies = (actorId, genre) => {
  console.log(actorId, genre);

}

//method to call genre api and fetch data
moviePicker.getGenre = () => {
  //URL constructor to add api key
  const url = new URL(moviePicker.apiGenrelUrl);
  //add api key to url
  url.search = new URLSearchParams({
    api_key: moviePicker.apiKey,
  })
  //request to API genre endpoint
  fetch(url)
    //parse response into JSON and return response so it can be used
    .then((response) => {
      return response.json();
    })
    //parse JSON promise response
    .then((jsonResponse) => {
      // console.log(jsonResponse); 

      //use the data to load into genre dropdown
      moviePicker.loadGenreData(jsonResponse.genres);
    })
};

//method to add genre data to select in html
moviePicker.loadGenreData = (genres) => {
  //find the dropdown selector
  const selectForm = document.querySelector('select');

  //for each genre in genres array
  genres.forEach(genre => {
    //creation option element
    const option = document.createElement('option');
    //set value of option to genre id
    option.value = genre.id;
    //set inner html to genre name
    option.innerHTML = genre.name;
    //append option to select element
    selectForm.appendChild(option);
  });
}



//app initialize method
moviePicker.init = () => {
  //genre api call to load genre data to form
  moviePicker.getGenre();

}

//method call to start app
moviePicker.init();
