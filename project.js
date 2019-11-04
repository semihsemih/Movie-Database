const form = document.getElementById('film-form');
const titleElement = document.getElementById('title');
const directorElement = document.getElementById('director');
const urlElement = document.getElementById('url');
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clear = document.getElementById('clear-films');

eventListeners();

function eventListeners() {
  form.addEventListener('submit', addFilm);
  document.addEventListener('DOMContentLoaded', function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });
  secondCardBody.addEventListener('click', deleteFilm);
  clear.addEventListener('click', clearAllFilms);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === '' || director === '' || url === '') {
    UI.displayMessages('Please fill in all fields...', 'danger');
  } else {
    const newFilm = new Film(title, director, url);

    UI.addFilmToUI(newFilm);
    Storage.addFilmToStorage(newFilm);
    UI.displayMessages('Movie successfully added', 'success');

    UI.clearInputs(titleElement, directorElement, urlElement);
  }

  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === 'delete-film') {
    UI.deleteFilmFromUI(e.target);
    Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

    UI.displayMessages('Movie successfully added', 'success');
  }
}

function clearAllFilms() {
  if (confirm('This operation cannot be reversed. Are you sure?')) {
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  }
}