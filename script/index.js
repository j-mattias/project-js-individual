import { getGames } from "./data.js";
import { renderGameCards, setupBookmarks, scrollToTop, displayAlert } from "./app.js";

document.addEventListener("DOMContentLoaded", async () => {
  scrollToTop();

  try {
    const games = await getGames();
    renderGameCards(games);
    setupBookmarks();
  } catch (error) {
    displayAlert(error);
  }
});
