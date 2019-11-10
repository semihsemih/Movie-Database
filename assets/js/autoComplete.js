class AutoComplete {
  static createAutoCompleteList(list) {
    if (list !== undefined && list !== null) {
      const inputElement = document.getElementById("searchTitle");
      const autoCompleteList = document.createElement("div");
      autoCompleteList.className = "autocomplete-items form-control";

      list.forEach(function(movie) {
        autoCompleteList.innerHTML += `<div class="movie-title">${movie.Title}</div>`;
      });

      autoCompleteList.addEventListener("click", function(e) {
        if (e.target.className === "movie-title") {
          SearchMovie.selectMovies(e.target.textContent);
        }
      });

      inputElement.appendChild(autoCompleteList);
    }
  }

  static checkExistList() {
    const list = document.querySelector(".autocomplete-items");

    if (typeof list !== "undefined" && list !== null) {
      return true;
    } else {
      return false;
    }
  }

  static removeList() {
    if (this.checkExistList()) {
      const list = document.querySelector(".autocomplete-items");
      list.remove();
    }
  }
}
