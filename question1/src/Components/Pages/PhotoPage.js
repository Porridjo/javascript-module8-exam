import places from '../../utils/places';

import { clearPage } from '../../utils/render';

let photoIndex;

const PhotoPage = () => {
  clearPage();

  photoIndex = 2;

  renderPhotoPage();

  renderAllPhotos();

  renderEventListener();
};

function renderPhotoPage() {
  const main = document.querySelector('main');

  const homePage = `
  <div class="hompage-content d-flex flex-column align-items-center">
    <div class="photos">

    </div>
    <p class="nom-photo my-3">${places[photoIndex].name}</p>
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
      const photo = document.querySelector('.current-photo');
      const previousPhoto = photo.previousSibling;
      photo.classList.add('d-none');
      photo.classList.remove('current-photo', 'd-block');
      previousPhoto.classList.remove('d-none')
      previousPhoto.classList.add('d-block', 'current-photo');

      photoIndex -=1;
      const nom = document.querySelector('.nom-photo');
      nom.textContent = `${places[photoIndex].name}`;

     /*  const photos = document.querySelector('.photos');
      const nom = document.querySelector('.nom-photo');
      photoIndex -= 1;
      photo.innerHTML = '';
      renderPhotoImage(places[photoIndex].image);
      nom.textContent = `${places[photoIndex].name}`; */
    }
  });

  buttonNext.addEventListener('click', () => {
    if (photoIndex < places.length - 1) {
      const photo = document.querySelector('.current-photo');
      const nextPhoto = photo.nextSibling;
      photo.classList.add('d-none');
      photo.classList.remove('current-photo', 'd-block');
      nextPhoto.classList.remove('d-none')
      nextPhoto.classList.add('d-block', 'current-photo');

      photoIndex +=1;
      const nom = document.querySelector('.nom-photo');
      nom.textContent = `${places[photoIndex].name}`;

      /* const photo = document.querySelector('.photos');
      const nom = document.querySelector('.nom-photo');
      photoIndex += 1;
      photo.innerHTML = '';
      renderPhotoImage(places[photoIndex].image);
      nom.textContent = `${places[photoIndex].name}`; */
    }
  });
}

function renderAllPhotos() {
  places.forEach((place, i) => {
    renderPhotoImage(place.image, i);
  })
}

function renderPhotoImage(url, i) {
  const image = new Image();
  if (i===2) {
    image.className = 'photo current-photo d-block';
  } else {
    image.className = 'photo d-none';
  }
  image.src = url;
  image.height = 500;
  const photos = document.querySelector('.photos');
  photos.appendChild(image);
}

export default PhotoPage;
