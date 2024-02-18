document.addEventListener("DOMContentLoaded", function () {
  const allEpisodes = getAllEpisodes();
  const rootElem = document.getElementById("root");
  const searchInput = document.getElementById("search");
  const selectEpisode = document.getElementById("select-episode");

  // Populate the episode selector drop-down
  allEpisodes.forEach(({ name, season, number }) => {
    const option = document.createElement("option");
    option.value = `${season}x${number}`;
    option.textContent = `S${padNumbers(season)}E${padNumbers(number)} - ${name}`;
    selectEpisode.appendChild(option);
  });

  // Event listener for search input
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase();
    let count = 0;

    allEpisodes.forEach(({ name, summary }) => {
      const episodeName = name.toLowerCase();
      const episodeSummary = summary.toLowerCase();
      const episodeElement = document.getElementById(`${name}-${season}-${number}`);

      if (episodeName.includes(searchTerm) || episodeSummary.includes(searchTerm)) {
        episodeElement.style.display = "block";
        count++;
      } else {
        episodeElement.style.display = "none";
      }
    });

    document.getElementById("episode-count").textContent = `Displaying ${count} episodes`;
  });

  // Event listener for episode selector
  selectEpisode.addEventListener("change", function () {
    const selectedEpisodeId = this.value;
    allEpisodes.forEach(({ season, number }) => {
      const episodeElement = document.getElementById(`${season}x${number}`);
      if (episodeElement.id === selectedEpisodeId) {
        episodeElement.style.display = "block";
      } else {
        episodeElement.style.display = "none";
      }
    });
  });

  // Display all episodes initially
  makePageForEpisodes(allEpisodes, rootElem);
});

function makePageForEpisodes(episodeList, rootElem) {
  episodeList.forEach(({ name, season, number, image, summary }) => {
    const card = document.createElement("section");
    card.id = `${season}x${number}`;
    card.classList.add("episode-card");
    card.innerHTML = `
      <section id="box-border">
        <section id="title-section">
          <h3>${name} -</h3>
          <p id="season-number">S${padNumbers(season)}E${padNumbers(number)}</p>
        </section>
      </section>
      <img src="${image.medium}" alt="${name}">
      <p>${summary}</p>
    `;
    rootElem.appendChild(card);
  });
}

function padNumbers(num) {
  return String(num).padStart(2, '0');
}
