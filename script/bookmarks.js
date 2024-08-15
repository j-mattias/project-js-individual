import { getDataFromLocalStorage, getGames } from "./data.js";
import { renderGameCards, setupBookmarks, scrollToTop, renderEmpty } from "./app.js";

const BOOKMARK_MSG = "No bookmarks stored yet";

document.addEventListener("DOMContentLoaded", async () => {
  scrollToTop();
  const bookmarks = await retrieveBookmarks();

  // If there are bookmarks display them, otherwise show message
  if (bookmarks.length !== 0) {
    renderGameCards(bookmarks);
  } else {
    renderEmpty(BOOKMARK_MSG);
  }

  setupBookmarks();
  updateBookmarkContainer();
});

// Get the bookmarks and get the games with corresponding id
async function retrieveBookmarks() {
  const bookmarks = getDataFromLocalStorage("bookmarks");
  const games = await getGames();

  // Return only games whose id were stored in bookmarks
  return games.filter((game) => bookmarks.includes(String(game.id)));
}

// Remove card from the displayed bookmarks when clicking to unbookmark
function updateBookmarkContainer() {
  const bookmarkedGames = document.querySelectorAll(".fa-bookmark");
  const cardGrid = document.querySelector(".games-grid");

  // Add click listener to each bookmark icon to remove the related card from the DOM on click
  bookmarkedGames.forEach((bookmark) => {
    bookmark.addEventListener("click", () => {
      // Select the card with the same id as the bookmark
      const gameCard = document.querySelector(`[data-id="${bookmark.id}"]`);
      cardGrid.removeChild(gameCard);

      // If there are no nodes in the container, render a message instead
      if (cardGrid.childNodes.length === 0) {
        renderEmpty(BOOKMARK_MSG);
      }
    });
  });
}
