import { fetchGameData, getGames, setDataInLocalStorage } from "./data.js";

document.addEventListener("DOMContentLoaded", async () => {
  const gameId = getUrlId();
  const gameData = await fetchGameData(`game?id=${gameId}`);
  populateGameInfo(gameData);

  setupRating(gameId);
});

// Get id from the url
function getUrlId() {
  const searchParams = window.location.search;
  const urlParam = new URLSearchParams(searchParams);
  const id = urlParam.get("id");

  return id;
}

function populateGameInfo(gameObj) {
  // Set window title
  document.querySelector("title").textContent = gameObj.title;

  // Set cover art
  const gameImg = document.querySelector(".game-cover-art > img");
  gameImg.src = gameObj.thumbnail;
  gameImg.alt = `${gameObj.title} cover art`;

  // Set info fields
  document.querySelector(".game-info--platform").textContent = gameObj.platform;
  document.querySelector(".game-info--genre").textContent = gameObj.genre;
  document.querySelector(".game-info--date").textContent = gameObj.release_date;
  document.querySelector(".game-info--publisher").textContent = gameObj.publisher;
  document.querySelector(".game-info--developer").textContent = gameObj.developer;

  // Set system requirements fields
  if (gameObj.minimum_system_requirements) {
    document.querySelector(".game-sys-req--os").textContent =
      gameObj.minimum_system_requirements.os;
    document.querySelector(".game-sys-req--processor").textContent =
      gameObj.minimum_system_requirements.processor;
    document.querySelector(".game-sys-req--memory").textContent =
      gameObj.minimum_system_requirements.memory;
    document.querySelector(".game-sys-req--graphics").textContent =
      gameObj.minimum_system_requirements.graphics;
    document.querySelector(".game-sys-req--storage").textContent =
      gameObj.minimum_system_requirements.storage;
  }

  // Set description fields
  document.querySelector(".game-description__title").textContent = gameObj.title;
  document.querySelector(".game-description__text").innerHTML = replaceBreakLines(
    gameObj.description
  );
  document.querySelector(".game-description__link").href = gameObj.game_url;

  // Populate screenshot container with screenshots
  const screenshotsFig = document.querySelector(".game-screenshots__fig");

  gameObj.screenshots.forEach((screenshot, index) => {
    const img = document.createElement("img");
    img.src = screenshot.image;
    img.alt = `Screenshot ${index + 1} from ${gameObj.title}`;
    screenshotsFig.appendChild(img);
  });
}

// Convert escape sequence from API description to break line tags
function replaceBreakLines(text) {
  return text.replace("\r\n\r\n", "<br /><br />");
}

// Setup rating to display current rating and enable updating rating
async function setupRating(id) {
  // Get all games from API or localStorage if it's already saved
  const games = await getGames();

  // Check that the game exists in the list
  const isValidGame = games.some((game) => String(game.id) === id);

  if (isValidGame) {
    // Find the game with id of current page
    const findGame = games.find((game) => String(game.id) === id);

    // Display the current rating, and enable updating the rating by clicking star
    displayRating(findGame.rating);
    updateRating(findGame, games);
  }
}

// Update rating when clicking on star
function updateRating(game, games) {
  const stars = document.querySelectorAll(".fa-star");
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      // Get the id of the star to determine rating, and update it on the game object
      const newRating = star.dataset.starId;
      game.rating = newRating;

      // Find the index of the game in the games list, and update it with the new game object
      const index = games.findIndex((g) => g.id === game.id);
      games.splice(index, 1, game);

      // Store the updated games list in localStorage and display the new rating on the page
      setDataInLocalStorage("games", games);
      displayRating(newRating);
    });
  });
}

// Display the rating by displaying empty/filled stars
function displayRating(rating) {
  const stars = document.querySelectorAll(".fa-star");

  stars.forEach((star) => {
    // If the starId <= the games current rating fill the star
    if (star.dataset.starId <= rating) {
      star.classList.add("fa-solid");
      star.classList.remove("fa-regular");

      // Else empty the star
    } else {
      star.classList.add("fa-regular");
      star.classList.remove("fa-solid");
    }
  });
}
