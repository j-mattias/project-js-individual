import { apiKey } from "./apiKey.js";

// Fetch the data from the API
async function fetchGameData() {
  // Setup fetch parameters
  const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
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
      throw new Error("Request not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Get games from API, unless already saved in localStorage
async function getGames() {
  let games = getDataFromLocalStorage("games");

  console.log(games);
  if (games.length === 0) {
    games = await fetchGameData();
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
};
