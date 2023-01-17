import places from '../../utils/places';

const HomePage = () => {
  renderHomepage();

  addListLines();
}

function renderHomepage() {
  const main = document.querySelector('main');

  const homePage = `
    <div class="homepage-container d-flex flex-column align-items-center">
      <h1>Places to visit</h1>
      <div class="places-list-container">
        <ul class="places-list list-group list-group-flush">
        </ul>
      </div>
    </div>
  `
  main.innerHTML = homePage;
}

function addListLines() {
  const placesList = document.querySelector(".places-list");

  places.forEach((place) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${place.name}`;
    placesList.appendChild(li);
  })
}

export default HomePage;
