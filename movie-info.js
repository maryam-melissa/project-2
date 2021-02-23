//Create app object
const movieInfo = {};
movieInfo.apiKey = `7b4ee228270013c7be42d484778165ef`;

//Base url for api endpoint
movieInfo.baseURL = "https://api.themoviedb.org/3/";
//Get movie id value from url passed from index page and remove search parameter
const movieId = (window.location.search).replace("?", "");

//Create a method To get single movie info
movieInfo.getMovieInfo = () => {
  //API End point with the movie Id
  const endPoint = "movie/" + "4922";
  console.log(endPoint)
  const url = new URL(movieInfo.baseURL + endPoint);
  url.search = new URLSearchParams({
    api_key: movieInfo.apiKey,
  })
  console.log(url);
  //Fetch data from api endpoint
  fetch(url)
    //Parse response into JSON and return response so it can be used
    .then((response) => {
      return response.json();
    })
    //Parse JSON promise response
    .then((jsonResponse) => {
      //Pass actor id found from api call and genre passed to method to search for movies with both preferences
      console.log(jsonResponse)
      movieInfo.displayInfo(jsonResponse);
    })
}
movieInfo.displayInfo = (info) => {
  //Query Selector element from movie info page
  const movieInfoContainer = document.querySelector('.movieInfoContainer');
  // Create a div element to wrap each movie
  const imageContainer = document.querySelector('.imgContainer');
  //Add movie class to div
  imageContainer.classList.add('movie');
  //Image path retrieved from api
  const url = `https://image.tmdb.org/t/p/w500/${info.poster_path}`;
  // Create an img element
  const image = document.createElement('img');
  //Add image path to image src attribute
  image.src = url;
  //Add movie title image description to alt attribute
  image.alt = info.title;
  imageContainer.appendChild(image);
  const textContainer = document.querySelector('.textContainer');
  const movieTitle = document.createElement('h2');
  movieTitle.textContent = info.title;
  const movieOverview = document.createElement('p');
  movieOverview.textContent = info.overview;
  const movieReleaseDate = document.createElement('p');
  movieReleaseDate.textContent = info.release_date;
  const movieRunTime = document.createElement('p');
  movieRunTime.textContent = info.runtime;
  textContainer.append(movieTitle, movieOverview, movieReleaseDate, movieRunTime);


  movieInfoContainer.appendChild(imageContainer);



}

movieInfo.init = () => {
  movieInfo.getMovieInfo()
}

movieInfo.init()
