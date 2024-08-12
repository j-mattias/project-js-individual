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

export { fetchGameData, getGames, getDataFromLocalStorage, setDataInLocalStorage };
