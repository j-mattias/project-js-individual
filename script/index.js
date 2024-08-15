import { getGames, fetchGameData } from "./data.js";
import { renderGameCards, setupBookmarks, scrollToTop, displayAlert, renderEmpty } from "./app.js";
import { TAGS } from "./variables.js";

document.addEventListener("DOMContentLoaded", async () => {
  scrollToTop();

  try {
    const games = await getGames();
    renderGameCards(games);
    setupBookmarks();
    renderFilterBoxes(TAGS);
    setupFiltering(games);
  } catch (error) {
    displayAlert(error);
  }
});

// Setup filter button functionality
function setupFiltering(games) {
  const filterButtons = document.querySelectorAll(".filter__checkbox");
  const gamesGrid = document.querySelector(".games-grid");

  // Add click listener for filter (tag) buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      // Convert nodeList to array, filter out unchecked checkboxes,
      // extract the name of the button in the array, join them with .
      const filters = [...filterButtons]
        .filter((b) => b.checked)
        .map((b) => b.name)
        .join(".");

      // If filters have been selected request data with those tags
      if (filters) {
        const filterData = await fetchGameData(`filter?tag=${filters}`);
        gamesGrid.innerHTML = "";

        // If no games were found with those combined tags, display message to user
        if (filterData.status === 0) {
          renderEmpty("Could not find any games :(");

          // Display the filtered games and setup bookmarks
        } else {
          renderGameCards(filterData);
          setupBookmarks();
        }

        // If no filters, display all games
      } else {
        gamesGrid.innerHTML = "";
        renderGameCards(games);
        setupBookmarks();
      }
    });
  });

  // Add clear filter functionality to clear button
  const clearButton = document.querySelector(".filters__clear");
  clearButton.addEventListener("click", () => {
    // Clear all filters
    filterButtons.forEach((button) => {
      button.checked = false;
    });

    // Display default state (all games)
    gamesGrid.innerHTML = "";
    renderGameCards(games);
  });
}

// Add filter buttons for each tag available
function renderFilterBoxes(tags) {
  const filterContainer = document.querySelector(".filters");

  tags.forEach((tag) => {
    // Create checkboxes (will be hidden)
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `filter-${tag}`;
    input.classList.add("filter__checkbox");
    input.name = tag;

    // Create labels to use as buttons, append after checkboxes for easier CSS styling
    filterContainer.appendChild(input);
    const label = document.createElement("label");
    label.htmlFor = `filter-${tag}`;
    label.textContent = tag.toUpperCase();
    label.classList.add("filter__label");
    filterContainer.appendChild(label);
  });
}
