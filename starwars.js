// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado

const DONE = 4;
const SUCCESS = 200;

let moviesEl = document.querySelector('#movies');
let introTextEl = document.querySelector('.flow > pre');

let SWFilmsList = [];
let epNumbers = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

let filmsRequest = new XMLHttpRequest();
XMLHttpRequest.responseType = 'json';
filmsRequest.onreadystatechange = function() {
    if (this.readyState === DONE) {
        if (this.status === SUCCESS) {
            let result = JSON.parse(this.response);
            for (let i in result.results) {
                let SWFilm = {};
                SWFilm.title = result.results[i].title;
                SWFilm.episode = result.results[i].episode_id;
                SWFilm.intro = result.results[i].opening_crawl;
                SWFilmsList.push(SWFilm);
            }
        } else {
            console.log('Erro ao receber lista de filmes. Código ' + 'da resposta HTTP: ' + this.status);
        }

        SWFilmsList.sort(compareEpisodes);

        for (let film of SWFilmsList) {
            let htmlEp = document.createElement('li');
            htmlEp.innerHTML = `Episode ${epNumbers[film.episode]}`;

            htmlEp.addEventListener('click', function(e) {
                introTextEl.innerHTML = `${htmlEp.innerHTML} \n ${film.title} \n\n ${film.intro}`;
                window.localStorage.setItem('intro-episode', introTextEl.innerHTML);
            });

            moviesEl.appendChild(htmlEp);
        }
    }
};

filmsRequest.open('GET', 'https://swapi.co/api/films', true);
filmsRequest.send();

window.onload = function() {
    if (localStorage.getItem('intro-episode') !== null) {
        introTextEl.innerHTML = localStorage.getItem('intro-episode');
    }
}

function compareEpisodes(a, b) {
    return a.episode > b.episode;
}
