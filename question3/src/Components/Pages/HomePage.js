import { clearPage } from '../../utils/render';

const HomePage = async () => {
  try {
    clearPage();

    renderHomepage();
    const places = await getPlaces();
    addPlacesToList(places);

    const recommendedPlace = await getRecommendedPlace();
    addRecommendedPlace(recommendedPlace);
  } catch (err) {
    console.error('HomePage::error: ', err);
  }
};

async function renderHomepage() {
  const main = document.querySelector('main');

  const homepage = `
    <div class="places-container d-flex flex-column align-items-center">
      <h1>Lieux: </h1>
      <ul class="places-list">
      </ul>
      <p class="recommended-place"></p>
    </div>
    
  `;

  main.innerHTML = homepage;
}

function addPlacesToList(places) {
  const ul = document.querySelector('.places-list');
  places.forEach((element) => {
    const li = document.createElement('li');
    li.textContent = `${element.name}`;
    ul.appendChild(li);
  });
}

function addRecommendedPlace(place) {
  const p = document.querySelector('.recommended-place');
  p.innerHTML = `Lieu recommandé: ${place.name}`;
}

async function getPlaces() {
  try {
    const response = await fetch('https://places-exam-api.azurewebsites.net/places');

    if (!response.ok) {
      throw new Error(`getPlaces:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const places = await response.json();
    return places;
  } catch (err) {
    console.error('readPlaces::error: ', err);
    throw err;
  }
}

async function getRecommendedPlace() {
  try {
    const response = await fetch('https://places-exam-api.azurewebsites.net/recommended');

    if (!response.ok) {
      throw new Error(`getRecommanded:: fetch error : ${response.status} : ${response.statusText}`);
    }

    const recommandedPlace = await response.json();
    return recommandedPlace;
  } catch (err) {
    console.error('getRecommendedPlace::error: ', err);
    throw err;
  }
}

export default HomePage;
