import { getDataFromLocalStorage, addToLocalStorage, removeFromLocalStorage } from "./data.js";

const SHORT_DESC_MAX_LEN = 100;

// Render cards with game information
function renderGameCards(games) {
  const gamesGrid = document.querySelector(".games-grid");

  games.forEach((game) => {
    // Main card container
    const gameCard = document.createElement("article");
    gameCard.classList.add("game-card", "border-radius-8");
    gameCard.dataset.id = game.id;

    // Card figure elements
    const cardFigure = document.createElement("figure");
    cardFigure.classList.add("game-card__fig");

    const bookmarkIcon = document.createElement("i");
    bookmarkIcon.classList.add("fa-regular", "fa-bookmark");
    bookmarkIcon.id = game.id;

    // Set the styling for the icon to reflect if game is bookmarked or not
    updateBookmark(bookmarkIcon);

    cardFigure.appendChild(bookmarkIcon);

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
    const descriptionText = shortenDescription(game.short_description);
    cardDescription.textContent = descriptionText;

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

    // Add click listener to redirect user to gameInfo page
    addRedirect(gameCard, game.id);

    // Append to grid
    gamesGrid.appendChild(gameCard);
  });
}

// Add event listener to bookmark icons for adding/removing bookmarks
function setupBookmarks() {
  const bookmarkIcons = document.querySelectorAll(".fa-bookmark");

  bookmarkIcons.forEach((bookmark) => {
    bookmark.addEventListener("click", () => {
      // If game is not bookmarked, add to bookmarks
      if (bookmark.classList.contains("fa-regular")) {
        addToLocalStorage("bookmarks", bookmark.id);
        updateBookmark(bookmark);

        // If game is bookmarked, remove from bookmarks
      } else if (bookmark.classList.contains("fa-solid")) {
        removeFromLocalStorage("bookmarks", bookmark.id);
        updateBookmark(bookmark);
      }
    });
  });
}

// Update the bookmark icon to reflect if game is bookmarked or not
function updateBookmark(bookmark) {
  const bookmarks = getDataFromLocalStorage("bookmarks");

  if (bookmarks.includes(bookmark.id)) {
    bookmark.classList.remove("fa-regular");
    bookmark.classList.add("fa-solid");
  } else {
    bookmark.classList.add("fa-regular");
    bookmark.classList.remove("fa-solid");
  }
}

// Shorten the description, helps prevent cards being too tall
function shortenDescription(desc) {
  if (desc.length > SHORT_DESC_MAX_LEN) {
    return desc.slice(0, SHORT_DESC_MAX_LEN - 3).trim() + "...";
  }
  return desc;
}

// Add redirect when clicking on card
function addRedirect(element, id) {
  element.addEventListener("click", (e) => {
    // Only redirect if user DOESN'T click on the bookmark icon
    if (!e.target.classList.contains("fa-bookmark")) {
      window.location.href = `./gameInfo.html?id=${id}`;
    }
  });
}

export { renderGameCards, setupBookmarks };
