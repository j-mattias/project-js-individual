import { fetchGameData, getGames } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  renderGameCards();
});

// getGames();
async function renderGameCards() {
  const games = await getGames();
  const gamesGrid = document.querySelector(".games-grid");

  games.forEach((game) => {
    // Main card container
    const gameCard = document.createElement("article");
    gameCard.classList.add("game-card", "border-radius-8");
    gameCard.dataset.id = game.id;

    // Card figure elements
    const cardFigure = document.createElement("figure");
    cardFigure.classList.add("game-card__fig");

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-regular", "fa-heart");
    cardFigure.appendChild(heartIcon);

    const img = document.createElement("img");
    img.src = game.thumbnail;
    img.alt = `${game.title} cover art`;
    cardFigure.appendChild(img);

    // Append figure to card
    gameCard.appendChild(cardFigure);

    // Card details elements
    const cardDetails = document.createElement("div");
    cardDetails.classList.add("game-card__details");

    // Card heading elements
    const cardHeadingWrapper = document.createElement("div");
    cardHeadingWrapper.classList.add("game-card__heading");

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("game-card__title");
    cardTitle.textContent = game.title;
    cardHeadingWrapper.appendChild(cardTitle);

    const cardDate = document.createElement("p");
    cardDate.classList.add("game-card__date");
    cardDate.textContent = game.release_date;
    cardHeadingWrapper.appendChild(cardDate);

    cardDetails.appendChild(cardHeadingWrapper);

    // Card description element
    const cardDescription = document.createElement("p");
    cardDescription.classList.add("game-card__description");
    cardDescription.textContent = game.short_description;

    cardDetails.appendChild(cardDescription);

    // Card types elements
    const cardTypesWrapper = document.createElement("div");
    cardTypesWrapper.classList.add("game-card__types");

    const cardGenre = document.createElement("p");
    cardGenre.classList.add("game-card__genre");
    cardGenre.textContent = game.genre;

    cardTypesWrapper.appendChild(cardGenre);

    const gamePlatform = document.createElement("p");
    gamePlatform.classList.add("game-card__platform");
    gamePlatform.textContent = game.platform;

    cardTypesWrapper.appendChild(gamePlatform);

    cardDetails.appendChild(cardTypesWrapper);

    // Append details wrapper to card
    gameCard.appendChild(cardDetails);

    // Append to grid
    gamesGrid.appendChild(gameCard);
  });
}
