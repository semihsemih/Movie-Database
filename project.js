const form = document.getElementById('film-form');
const titleElement = document.getElementById('title');
const directorElement = document.getElementById('director');
const urlElement = document.getElementById('url');

const ui = new UI();
const storage = new Storage();

eventListeners();

function eventListeners() {
  form.addEventListener('submit', addFilm);
  document.addEventListener('DOMContentLoaded', function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  })
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === '' || director === '' || url === '') {
    ui.displayMessages('Please fill in all fields...', 'danger');
  }  else {
    const newFilm = new Film(title, director, url);

    ui.addFilmToUI(newFilm);
    storage.addFilmToStorage(newFilm);
    ui.displayMessages('Movie successfully added', 'success');

    ui.clearInputs(titleElement, directorElement, urlElement);
  }

  e.preventDefault();
}