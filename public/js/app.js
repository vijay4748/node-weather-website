console.log("client side js file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch(
//   "https://api.weatherapi.com/v1/current.json?key=c4768481c77c478fb3c63902240405&q=ranchi"
// ).then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.current);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "from javascript";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=c4768481c77c478fb3c63902240405&q=" +
      location
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error.message;
      } else {
        messageOne.textContent = data.location.name;
        messageTwo.textContent = `It is currently ${data.current.temp_c} degrees out. There is a ${data.current.precip_mm}% chance of rain.`;
      }
    });
  });
});
