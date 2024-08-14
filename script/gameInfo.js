import { fetchGameData } from "./data.js";

document.addEventListener("DOMContentLoaded", async () => {
  const gameId = getUrlId();
  const gameData = await fetchGameData(`game?id=${gameId}`);
  populateGameInfo(gameData);
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
