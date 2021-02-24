//Create app object
const movieInfo = {};
movieInfo.apiKey = `7b4ee228270013c7be42d484778165ef`;
//Base url for api endpoint
movieInfo.baseURL = "https://api.themoviedb.org/3/";
//Get movie id value from url passed from index page and remove search parameter
// const movieId = (window.location.search).replace("?", "");
const movieId = "4922";
//Create a method To get single movie info
movieInfo.getMovieInfo = () => {
  //API End point with the movie Id
  const endPoint = "movie/" + movieId;
  const url = new URL(movieInfo.baseURL + endPoint);
  url.search = new URLSearchParams({
    api_key: movieInfo.apiKey,
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
      console.log(jsonResponse)
    })
}
movieInfo.init = () => {
  movieInfo.getMovieInfo()
}
movieInfo.init();