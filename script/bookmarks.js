import { getDataFromLocalStorage, getGames } from "./data.js";
import { renderGameCards, setupBookmarks, scrollToTop } from "./app.js";

document.addEventListener("DOMContentLoaded", async () => {
  const bookmarks = await retrieveBookmarks();
  renderGameCards(bookmarks);

  setupBookmarks();
  updateBookmarkContainer();
  scrollToTop();
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
    });
  });
}
