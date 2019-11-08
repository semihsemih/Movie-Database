const form = document.getElementById('film-form');
const titleElement = document.getElementById('title');
const directorElement = document.getElementById('director');
const urlElement = document.getElementById('url');
const secondCardBody = document.querySelectorAll('.card-body')[1];
const clear = document.getElementById('clear-films');
const sortTitleButton = document.getElementById('sort-title');
const sortDirectorButton = document.getElementById('sort-director');

eventListeners();

function eventListeners() {
  form.addEventListener('submit', addFilm);
  document.addEventListener('DOMContentLoaded', function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });
  secondCardBody.addEventListener('click', deleteFilm);
  clear.addEventListener('click', clearAllFilms);
  sortTitleButton.addEventListener('click', sortTitles);
  sortDirectorButton.addEventListener('click', sortDirectors);
  titleElement.addEventListener('keyup', searchMovies);
  /*titleElement.addEventListener('blur', function () {
    if (titleElement.value !== '') {
      AutoComplete.removeList();
    }
  });*/
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

let titleCount = 0;

function sortTitles() {

  if (titleCount % 2 === 0) {
    Sort.sortTitlesAtoZ();
  } else if (titleCount % 2 === 1) {
    Sort.sortTitlesZtoA();
  }
  titleCount += 1;
}

let directorCount = 0;

function sortDirectors() {

  if (directorCount % 2 === 0) {
    Sort.sortDirectorsAtoZ();
  } else if (directorCount % 2 === 1) {
    Sort.sortDirectorsZtoA();
  }
  directorCount += 1;
}

function searchMovies(e) {
  SearchMovie.getMovies(e.target.value, function (err, response) {
    if (AutoComplete.checkExistList()) {
      AutoComplete.removeList();
    }
    const movies = JSON.parse(response).Search;
    AutoComplete.createAutoCompleteList(movies);
  });
}