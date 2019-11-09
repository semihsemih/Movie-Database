class SearchMovie {

  static getMovies(title) {
    const titleUri = encodeURI(title.trim());
    const apiKey = '9da6724f';

    return new Promise((resolve, reject) => {
      fetch(`https://www.omdbapi.com/?s=${titleUri}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(err => console.error(err))
    })
  }

  static selectMovies(title) {
    const titleElement = document.getElementById('title');
    titleElement.value = title;
    AutoComplete.removeList();
    this.getDirectorAndPoster(title);
  }

  static getDirectorAndPoster(title) {
    const titleUri = encodeURI(title.trim());
    const apiKey = '9da6724f';

    fetch(`https://www.omdbapi.com/?t=${titleUri}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const directorElement = document.getElementById('director');
        const urlElement = document.getElementById('url');
        directorElement.value = data.Director;
        if (data.Poster !== 'N/A') {
          urlElement.value = data.Poster;
        } else {
          urlElement.value = 'https://pixel.nymag.com/imgs/fashion/daily/2018/11/02/2-empty-movie-theatre.w700.h700.jpg';
        }
      })
      .catch(err => console.error(err));
  }
}