import { getGames } from "./data.js";
import { renderGameCards, setupBookmarks, scrollToTop } from "./app.js";

document.addEventListener("DOMContentLoaded", async () => {
  const games = await getGames();
  renderGameCards(games);
  setupBookmarks();
  scrollToTop();
});
