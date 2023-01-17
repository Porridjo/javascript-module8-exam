import places from '../../utils/places';

import { clearPage } from '../../utils/render';

let photoIndex = 2;

const PhotoPage = () => {
  clearPage();
  renderPhotoPage();

  renderPhotoImage(places[photoIndex].image);

  renderEventListener();
};

function renderPhotoPage() {
  const main = document.querySelector('main');

  const homePage = `
  <div class="hompage-content d-flex flex-column align-items-center">
    <div class="photos">

    </div>
    <div class="nom-photo my-3">
      ${places[photoIndex].name}
    </div>
    <div>
      <button type="button" class="btn btn-secondary me-3 prev-btn">Previous</button>
      <button type="button" class="btn btn-dark ms-3 next-btn">Next</button>
    </div>
  </div>`;

  main.innerHTML = homePage;
}

function renderEventListener() {
  const buttonPrev = document.querySelector('.prev-btn');
  const buttonNext = document.querySelector('.next-btn');

  buttonPrev.addEventListener('click', () => {
    if (photoIndex > 0) {
      const photo = document.querySelector('.photos');
      const nom = document.querySelector('.nom-photo');
      photoIndex -= 1;
      photo.innerHTML = '';
      renderPhotoImage(places[photoIndex].image);
      nom.innerHTML = `${places[photoIndex].name}`;
    }
  });

  buttonNext.addEventListener('click', () => {
    if (photoIndex < places.length - 1) {
      const photo = document.querySelector('.photos');
      const nom = document.querySelector('.nom-photo');
      photoIndex += 1;
      photo.innerHTML = '';
      renderPhotoImage(places[photoIndex].image);
      nom.innerHTML = `${places[photoIndex].name}`;
    }
  });
}

function renderPhotoImage(url) {
  const image = new Image();
  image.class = 'photo';
  image.src = url;
  image.height = 500;
  const photos = document.querySelector('.photos');
  photos.appendChild(image);
}

export default PhotoPage;
