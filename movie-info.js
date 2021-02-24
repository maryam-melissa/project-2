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
  const endPoint = "movie/" + "4922";
  // URL Constructor
  const url = new URL(movieInfo.baseURL + endPoint);
  //URL Parameter
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
      //Call the Method for displayInfo
      movieInfo.displayInfo(jsonResponse);
    })
}

//Create the Method for displayInfo
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
  //Append image to image container
  imageContainer.appendChild(image);
  //Select text Container from Dom
  const textContainer = document.querySelector('.textContainer');
  //Create h2 heading for Title
  const movieTitle = document.createElement('h2');
  //update title inside h2
  movieTitle.textContent = info.title;
  //Create p tag for movie overview
  const movieOverview = document.createElement('p');
  //update text inside p
  movieOverview.textContent = info.overview;
  //Create h3 heading for movie Release Date
  const movieReleaseDate = document.createElement('h3');
  //update movie release date info
  movieReleaseDate.textContent = info.release_date;
  //Create h4 heading for movie run time info
  const movieRunTime = document.createElement('h4');
  //update movie run time info into p tag
  movieRunTime.textContent = info.runtime;
  //Create p tags element for genre Name and Id to show it onto the page
  const genreName = document.createElement('p');
  const genreId = document.createElement('p');
  //Put genre array details into variable
  const genresDetails = info.genres;
  //Loop through the array to get access to its properties
  genresDetails.forEach((movie) => {
    //destructuring Array
    const { name, id } = movie;
    //update genre details (Name, Id)
    genreName.textContent = name;
    genreId.textContent = id;
    //Select div from Dom 
    const genreInfo = document.querySelector('.genreInfo');
    //Append genres(Name, Id) to the div
    genreInfo.append(name, id);
  });
  //Create p tag element to show production companies
  const productionCompanyEl = document.createElement('div');
  //Create variable to save company details init
  const productionCompanyDetails = info.production_companies;
  //Loop through productionCompanyDetails variable
  productionCompanyDetails.forEach((company) => {
    //destructuring the array to get details
    const { id, logo_path, name, origin_country } = company;
    //Image URL
    const url = `https://image.tmdb.org/t/p/w200/${company.logo_path}`;
    //Create img element
    const logoPath = document.createElement('img');
    ////Add image path to image src attribute
    logoPath.src = url;
    //alt attribute for image
    logoPath.alt = name;
    //Create p element for company name
    const companyName = document.createElement('p');
    //update the company name
    companyName.textContent = name;
    //Create p element for company id
    const companyId = document.createElement('p');
    //update the company id
    companyId.textContent = id;
    //Create p element for country origin
    const originCountry = document.createElement('p');
    //update the company origin country
    originCountry.textContent = origin_country;
    //append the all elements to div called productionCompanyEl
    productionCompanyEl.append(logoPath, companyName, companyId, originCountry);
    //div query selected from Dom
    const productionsCompanies = document.querySelector('.productions_companies');
    //div called productionsCompanies append with productionCompanyEl
    productionsCompanies.prepend(productionCompanyEl)
  })
  //append all details about movie which are selected and updated on top 
  textContainer.append(movieTitle, movieOverview, movieReleaseDate, movieRunTime);
  movieInfoContainer.appendChild(imageContainer);
}
// Code For Clickable Heart
const whiteHeart = '\u2661';
const blackHeart = '\u2665';
const button = document.querySelector('button');
//Function for heart Toggle
const toggle = () => {
  const like = button.textContent;
  if (like === whiteHeart) {
    button.textContent = blackHeart;
  } else {
    button.textContent = whiteHeart;
  }
}
button.addEventListener('click', toggle)
//Init Function
movieInfo.init = () => {
  movieInfo.getMovieInfo();
  toggle();
}
movieInfo.init();