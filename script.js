const repoList = document.querySelector("#repo-list");
const repoCount = document.querySelector("#repo-count");

const formatStars = (stars) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(stars);

const renderRepositories = (repositories) => {
  repoCount.textContent = `${repositories.length} repositories tracked`;
  repoList.innerHTML = repositories
    .map(
      (repository) => `
    <li class="repo-card">
      <div>
        <h2 class="repo-name">
          <a href="${repository.url}" target="_blank" rel="noreferrer">${repository.repo}</a>
        </h2>
        <p class="repo-description">${repository.description}</p>
        <div class="repo-meta">
          <span class="repo-language">${repository.language}</span>
          <span>starred repository</span>
        </div>
      </div>
      <span class="repo-stars" aria-label="${repository.stars} stars">&#9733; ${formatStars(repository.stars)}</span>
    </li>
  `,
    )
    .join("");
};

const showError = () => {
  repoCount.textContent = "Unable to load repositories";
  repoList.innerHTML =
    '<li class="status">The repository list could not be loaded right now.</li>';
};

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch(showError);
