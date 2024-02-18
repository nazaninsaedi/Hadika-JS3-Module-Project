function makePageForEpisodes(allEpisodes) {
  const episodeCardsContainer = document.getElementById("episodeCards");

  allEpisodes.forEach((episode) => {
    // Clone the template content
    const template = document.getElementById("film-card");
    const templateContent = template.content.cloneNode(true);

    // Update the content of the cloned template
    const episodeTitle = templateContent.querySelector("#title-section h3");
    const episodeSeasonNumber = templateContent.querySelector("#season-number");
    const episodeSummary = templateContent.querySelector("#summary");
    const episodeMediumImg = templateContent.querySelector("#medium-img");

    episodeTitle.textContent = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}: ${episode.name}`;
    episodeSeasonNumber.textContent = `Season ${episode.season.toString().padStart(2, "0")} | Episode ${episode.number.toString().padStart(2, "0")}`;
    episodeSummary.textContent = episode.summary;
    episodeMediumImg.src = episode.image.medium;
    episodeMediumImg.alt = episode.name;

    // Create a card container and append the cloned template
    const episodeCard = document.createElement("div");
    episodeCard.classList.add("episode-card");
    episodeCard.appendChild(templateContent);

    // Append the card to the container
    episodeCardsContainer.appendChild(episodeCard);
  });

  // Update the episode counter
  const episodeCounter = document.getElementById("episodeCounter");
  episodeCounter.textContent = `Displaying ${allEpisodes.length}/73 episode(s)`;
}

window.onload = function () {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
};
