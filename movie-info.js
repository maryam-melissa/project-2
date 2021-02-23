//Create app object
const movieInfo = {};

//Get movie id value from url passed from index page and remove search parameter
const movieId = (window.location.search).replace("?", "");

console.log(movieId); 