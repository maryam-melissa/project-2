//create app object
const landingPage = {};

//store button to add event listener to
const button = document.querySelector('.start-btn');

//event listener to listen for button click
button.addEventListener('click', function (event) {
  //prevents page from refreshing
  event.preventDefault();

  //redirect page to index
  /* NEED TO CHANGE WHEN LIVE */
  window.location.replace("http://127.0.0.1:5501/index.html");
});
