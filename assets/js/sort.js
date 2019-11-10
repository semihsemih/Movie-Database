class Sort {
  static sortTitlesAtoZ() {
    let films = Storage.getFilmsFromStorage();
    films.sort((a, b) => {
      return a.title > b.title ? 1 : -1;
    });

    UI.clearAllFilmsFromUI();
    UI.loadAllFilms(films);
  }

  static sortTitlesZtoA() {
    let films = Storage.getFilmsFromStorage();
    films.sort((a, b) => {
      return a.title < b.title ? 1 : -1;
    });

    UI.clearAllFilmsFromUI();
    UI.loadAllFilms(films);
  }

  static sortDirectorsAtoZ() {
    let films = Storage.getFilmsFromStorage();
    films.sort((a, b) => {
      return a.director > b.director ? 1 : -1;
    });

    UI.clearAllFilmsFromUI();
    UI.loadAllFilms(films);
  }

  static sortDirectorsZtoA() {
    let films = Storage.getFilmsFromStorage();
    films.sort((a, b) => {
      return a.director < b.director ? 1 : -1;
    });

    UI.clearAllFilmsFromUI();
    UI.loadAllFilms(films);
  }
}
