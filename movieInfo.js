//Create app object
const movieInfo = {};

//API key
movieInfo.apiKey = `7b4ee228270013c7be42d484778165ef`;

//Base url for api endpoint
movieInfo.baseURL = "https://api.themoviedb.org/3/";

//Get movie id value from url passed from index page and remove search parameter
const movieId = (window.location.search).replace("?", "");

//Create a method To get single movie info
movieInfo.getMovieInfo = () => {
  //API End point with the movie Id
  const endPoint = "movie/" + movieId; //REMOVE HARD CODED ID WHEN SUBMITTING
  // URL Constructor
  const url = new URL(movieInfo.baseURL + endPoint);
  //URL Parameter
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
      //Call the Method for displayInfo
      movieInfo.displayInfo(jsonResponse);
      //Error Handler
    }).catch((error) => {
      alert('Error Has Occured');
    })
}

//Create the Method for displayInfo
movieInfo.displayInfo = (info) => {
  // Call method to set title of document
  movieInfo.setTitle(info.title);
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
  image.alt = info.title + " movie poster";
  //Append image to image container
  imageContainer.appendChild(image);
  //Select text Container from Dom
  const textContainer = document.querySelector('.textContainer');
  //Create h2 heading for Title
  const movieTitle = document.createElement('h2');
  //update title inside h2
  movieTitle.textContent = info.title;

  //Create h3 heading for movie Release Date
  const movieReleaseDate = document.createElement('h3');
  //update movie release date info
  movieReleaseDate.textContent = info.release_date;
  //Create h4 heading for movie run time info
  const movieRunTime = document.createElement('h4');
  //update movie run time info into p tag
  movieRunTime.textContent = info.runtime + " m";
  //Create p tag for movie overview
  const movieOverview = document.createElement('p');
  //update text inside p
  movieOverview.textContent = info.overview;

  //append elements to document
  textContainer.append(movieTitle, movieReleaseDate, movieRunTime, movieOverview);
  movieInfoContainer.appendChild(imageContainer);
}

//Find i on page and store in variable
const heart = document.querySelector('i');

//Function for heart toggle
const toggle = () => {
  //Clickable Hearts to toggle
  const whiteHeart = 'fas fa-heart';
  const blackHeart = 'far fa-heart';

  const like = heart.className;
  //If the class name of the heart is black
  if (like === blackHeart) {
    //Set class name of the heart to white
    heart.className = whiteHeart;
  } else {
    //Else set class name of the heart to black
    heart.className = blackHeart;
  }
}

//Event listener for heart click
heart.addEventListener('click', toggle);

//Method to set title of document to movie title
movieInfo.setTitle = (movieTitle) => {
  const title = document.querySelector('title');
  title.textContent = movieTitle + " Info";
}

//Store button to add event listener to
const button = document.querySelector('.backBtn');

//Event listener to listen for button click
button.addEventListener('click', function (event) {
  //Prevents page from refreshing
  event.preventDefault();
  //Redirect page to index
  window.location.href = "./index.html";
});

//Init Function
movieInfo.init = () => {
  movieInfo.getMovieInfo();
  toggle();

}

//Kick start app
movieInfo.init();