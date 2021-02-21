const landingPage = {};
const button = document.querySelector('.start-btn');
button.addEventListener('click', function (event) {
  event.preventDefault();
  // Simulate an HTTP redirect:
  window.location.replace("http://127.0.0.1:5501/index.html");
});
