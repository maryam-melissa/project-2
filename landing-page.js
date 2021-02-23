//Create app object
const landingPage = {};

//Store button to add event listener to
const button = document.querySelector('.start-btn');

//Event listener to listen for button click
button.addEventListener('click', function (event) {
//Prevents page from refreshing
event.preventDefault();

 //Redirect page to index
window.location.href = "./index.html";
});
