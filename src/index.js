const { fetchJSON } = require("./apiHelpers");

let restaurants;
let users;

// webpack looks in src first for index.js
// index.js holds the client side code

const userList = document.querySelector("#users-list");
const restaurantsList = document.querySelector("#restaurants-list");

const setup = async () => {
  // console.log("starting");
  // fetch is a web api
  // a restful api
  users = await fetchJSON("/api/users");
  const htmlUsers = users
    .map((user) => {
      return `
    <li>${user.name}</li>
    `;
    })
    .join("");
  userList.innerHTML = htmlUsers;

  restaurants = await fetchJSON("/api/restaurants");

  const htmlRestaurants = restaurants
    .map((restaurant) => {
      return `
      <li>
        ${restaurant.name}
      </li>
    `;
    })
    .join("");
  restaurantsList.innerHTML = htmlRestaurants;
  console.log(htmlRestaurants);
};

setup();
