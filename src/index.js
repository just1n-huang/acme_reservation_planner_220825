const { fetchJSON } = require("./apiHelpers");

let restaurants;
let users;

// webpack looks in src first for index.js
// index.js holds the client side code

const userList = document.querySelector("#users-list");
const restaurantsList = document.querySelector("#restaurants-list");

const renderUsers = () => {
  const id = window.location.hash.slice(1);
  const html = users
    .map((user) => {
      return ` 
      <li class =${id * 1 === user.id ? "selected" : ""}>
        <a href ='#${user.id}'> 
        ${user.name}
        </a>
      </li>
    `;
    })
    .join("");
  userList.innerHTML = html;
};

const renderRestaurants = () => {
  const html = restaurants
    .map((restaurant) => {
      const count = reservations.filter(
        (reservation) => reservation.restaurantId === restaurant.id
      ).length;

      return `
    <li>
      ${restaurant.name} (${count})
    </li>
  `;
    })
    .join("");
  restaurantsList.innerHTML = html;
};

const setup = async () => {
  // console.log("starting");
  // fetch is a restful web api

  users = await fetchJSON("/api/users");
  // separate out renderUser data and call it
  renderUsers();

  const id = window.location.hash.slice(1);
  if (id) {
    reservations = await fetchJSON(`/api/users/${id}/reservations`);
  }
  // console.log(reservations);

  restaurants = await fetchJSON("/api/restaurants");
  // separate out renderRestaurant data and call it
  renderRestaurants();
};

setup();

// notes
// in a client side application you will end up getting and rendering that data
// separate out the getting the data and rendering the data

window.addEventListener("hashchange", () => {
  renderUsers();
  renderRestaurants();
});
