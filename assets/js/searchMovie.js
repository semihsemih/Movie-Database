class SearchMovie {

  static getMovies(title, callback) {
    const titleUri = encodeURI(title.trim());

    const xhr = new XMLHttpRequest();

    xhr.open('GET',`https://www.omdbapi.com/?s=${titleUri}&apikey=9da6724f`);

    xhr.onload = function() {
      if (xhr.status === 200) {
        callback(null, xhr.responseText);
      } else {
        callback('error', null)
      }
    };

    xhr.send();
  }

  static selectMovies(title) {
    const titleElement = document.getElementById('title');
    titleElement.value = title;
    AutoComplete.removeList();
    this.getDirectorAndPoster(title);
  }

  static getDirectorAndPoster(title) {
    const xhr = new XMLHttpRequest();
    const titleUri = encodeURI(title.trim());

    xhr.open('GET',`https://www.omdbapi.com/?t=${titleUri}&apikey=9da6724f`);

    xhr.onload = function() {
      if (xhr.status === 200) {
        const movie = JSON.parse(xhr.responseText);
        const directorElement = document.getElementById('director');
        const urlElement = document.getElementById('url');
        directorElement.value = movie.Director;
        if (movie.Poster !== 'N/A') {
          urlElement.value = movie.Poster;
        } else {
          urlElement.value = 'https://pixel.nymag.com/imgs/fashion/daily/2018/11/02/2-empty-movie-theatre.w700.h700.jpg';
        }
      } else {
        console.log('error')
      }
    };

    xhr.send();
  }
}