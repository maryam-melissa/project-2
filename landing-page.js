//Create app object
const landingPage = {};
//Api Key 
landingPage.key = `7b4ee228270013c7be42d484778165ef`;
//Popular movies Url for fetch API call
landingPage.url = `https://api.themoviedb.org/3/movie/popular`;
//Get Popular Movies Data from fetch Api Call
landingPage.getPopularMovies = () => {
  const url = new URL(landingPage.url);
  //URL Params
  url.search = new URLSearchParams({
    api_key: landingPage.key,
    page: 1,

  })
  fetch(url)
    .then((response) => {
      return response.json();
    }).then((jsonResponse) => {
      //calling (landingPage.displayPopularMovies) method 
      landingPage.displayPopularMovies(jsonResponse.results);
    }).catch((error) => {
      console.log('error');
      alert('404 ERROR')
    })
}
//Display Images on page
landingPage.displayPopularMovies = (popularMovies) => {
  popularMovies.forEach(movie => {
    //Destructuring objects
    const { poster_path, title } = movie;
    //Image URL
    const url = `https://image.tmdb.org/t/p/w154/${poster_path}`;
    //Create image
    const image = document.createElement('img');
    //Add class to an image
    image.classList.add('movieImage');
    //Append url to an image
    image.src = url;
    //Alt Attribute for an image
    image.alt = title;
    //Select div from Dom
    const imageDiv = document.querySelector('.popularMoviesDisplay');
    //Append image to an div 
    imageDiv.appendChild(image);
  });
}

//Store button to add event listener to
const button = document.querySelector('.start-btn');

//Event listener to listen for button click
button.addEventListener('click', function (event) {
  //Prevents page from refreshing
  event.preventDefault();
  //Redirect page to index
  window.location.href = "./index.html";
});
//Init Function
landingPage.init = () => {
  landingPage.getPopularMovies();
}
//Calling Init Function
landingPage.init();