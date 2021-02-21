//Create an Movie app
const moviePicker = {};
moviePicker.apiKey = `7b4ee228270013c7be42d484778165ef`;

//Get Genre List form API call
moviePicker.apiGenrelUrl = "https://api.themoviedb.org/3/genre/movie/list";
moviePicker.getGenre = () => {
  //URL constructor to add api key
  const url = new URL(moviePicker.apiGenrelUrl);
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
      console.log(jsonResponse);
      //todo
    })
};

moviePicker.init = () => {
  moviePicker.getGenre();
}

moviePicker.init();
