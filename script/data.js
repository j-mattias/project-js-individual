import { apiKey } from "./apiKey.js";
const BASE_URL = "https://free-to-play-games-database.p.rapidapi.com/api/";

// Fetch the data from the API
async function fetchGameData(route) {
  // Setup fetch parameters
  const url = BASE_URL + route;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  // Make the request and handle errors
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch resource");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);

    // Forward the error so it can be caught when calling the function
    throw error;
  }
}

// Get games from API, unless already saved in localStorage
async function getGames() {
  let games = getDataFromLocalStorage("games");

  // If there are no games in localStorage
  if (games.length === 0) {
    // Catch and forward error so it can be caught when calling the function
    try {
      games = await fetchGameData("games");
    } catch (error) {
      throw error;
    }

    // Add a rating to each game object
    games = games.map((game) => {
      game.rating = 0;
      return game;
    });

    setDataInLocalStorage("games", games);
  }

  return games;
}

// Get data for specified key from localStorage
function getDataFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Set data for specified key in localStorage
function setDataInLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Uppdate the specified key in localStorage to include new item
function addToLocalStorage(key, id) {
  const data = getDataFromLocalStorage(key);

  // Only add the item if it's not already in the array
  if (!data.includes(id)) {
    data.push(id);
    setDataInLocalStorage(key, data);
  }
}

// Remove the specified item from the key in localStorage
function removeFromLocalStorage(key, id) {
  const data = getDataFromLocalStorage(key);
  setDataInLocalStorage(
    key,
    data.filter((d) => d !== id)
  );
}

export {
  getGames,
  getDataFromLocalStorage,
  setDataInLocalStorage,
  addToLocalStorage,
  removeFromLocalStorage,
  fetchGameData,
};
