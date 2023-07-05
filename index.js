const search = document.getElementById("search");
const glassbtn = document.getElementById("glass");
const fits = document.querySelectorAll(".fits");
const count = document.getElementById('found');
const checks = document.querySelectorAll(".checks");
const genre = document.getElementById("genre");
const keywords = document.getElementById("keywords");
const companies = document.getElementById("companies");
const countries = document.getElementById("countries");
const filter = document.getElementsByClassName('filter')[0];
const date = document.getElementById("year");
const res_cont = document.getElementById("result_container");
const result_btn = document.getElementById("result");
const open = document.getElementById('tab');
const apiKey = "8927507f";
let filters = {
    Title: '',
    Year: null,
    Type: [],
    Rating: '',
    Certificates: [],
    Genre: '',
    Countries: '',
    Keywords: '',
    Companies: '',

}

function checkStatus (name){
    for(let i = 0; i < checks.length; i++){
        const index = filters[name].indexOf(checks[i])
    if(checks[i].checked == false && index !== -1)
        filters[name].splice(index, 1)
        console.log(filters[name].indexOf(checks[i]))
    } 
}

const submit = (name, input) => {
    // checkStatus(name)
    if(Array.isArray(filters[name])){
        filters[name].push(input)
        console.log(filters[name].indexOf(checks[i]))
    }else {
        filters[name] = input
    }  
    console.log(filters)
    searchQuery();
};

function yearsPrinter(initial, final){
const years = []
for( initial; initial <= final; initial++){
    years.push(initial)
    } 
    years.forEach(year => {
        let option = document.createElement('option')
        option.innerText = year
        option.value = year
        date.appendChild(option)
    },)
}
yearsPrinter(1999, 2023);


function loop(){
fits.forEach( fit => {
    fit.addEventListener("change", function() {
      submit(this.name, this.value)
    });
})
};

loop();

function searchQuery(){
const queryString = Object.entries(filters)
.map(([key, value]) => `${key}=${encodedURIComponent(value)}`)
.join('&');


fetch(`http://www.omdbapi.com/?apikey=${apiKey}&${queryString}`)
.then(response => response.json())
.then(data => {
   if (data.Response === 'True') {
    const movies = data.Search;
    count.innerText = movies.length
    movies.forEach( movie => {
        console.log(movie.Title);
        filters = {
            Title: '',
            Year: null,
            Type: [],
            Rating: '',
            Certificates: [],
            Genre: '',
            Countries: '',
            Keywords: '',
            Companies: '',
        
        }
    });
   } else {
    console.log('No movies found!');
   }
})
.catch(error => {
    console.log("Error:", error);
    });
}

  function ShowResults  (movies){
    movies.forEach(movie => {
        let div = document.createElement('div');
        div.id = "result_container"
        div.style.display = "flex";
        div.style.flexWrap = "wrap";
        div.style.width = "80%";
        let img = documnet.createElement('img');
        img.src = movie.Poster;
        let h4 = document.createElement('h4');
        h4.textContent = movie.Title;
        let year = document.createElement('p');
        year.textContent = movie.Year;
        let rated = document.createElement('strong');
        rated.textContent = movie.Rated;
        let runtime = document.createElement('p');
        runtime.textContent = movie.Runtime;
        let genre = document.createElement('p');
        genre.textContent = movie.Genre;
        let director = document.createElement('p');
        director.textContent = movie.Director;
        let writer = document.createElement('p');
        writer.textContent = movie.Writer;
        let actors = document.createElement('p');
        actors.textContent = movie.Actors;
        let plot = document.createElement('p');
        plot.textContent = movie.PLot;
        let language = document.createElement('p');
        language.textContent = movie.Language;
        let country = document.createElement('p');
        country.textContent = movie.Country;
        let awards = document.createElement('p');
        awards.textContent = movie.Awards;
        let type = document.createElement('p');
        type.textContent = movie.Type;
        production = document.createElement('p');
        production.textContent = movie.Production;

        let section = document.getElementsByClassName('container');
        
        div.appendChild(img);
        div.appendChild(h4);
        div.appendChild(year);
        div.appendChild(rated);
        div.appendChild(runtime);
        div.appendChild(genre);
        div.appendChild(director);
        div.appendChild(writer);
        div.appendChild(actors);
        div.appendChild(plot);
        div.appendChild(language);
        div.appendChild(country);
        div.appendChild(awards);
        div.appendChild(type);
        div.appendChild(production);



        section.appendChild(div);
        

    });
  }
//   https://www.omdbapi.com/?apikey=8927507f&type=genre/movie/list
function deploy(data, section){
    data.forEach(item => {
        let option = document.createElement('option')
        option.innerText = item;
        option.value = item;
        section.appendChild(option);
    });
};

function addData(url, section){
  fetch(url)
  .then(response => {
     response.json()
}) 
    .then(data => {
        const store = data
        deploy(store, section);
    }
   )
   .catch(error => {
    console.log("Error:", error);
    });
};
let genre_url = "https://api.themoviedb.org/3/genre/movie/list?&api_key=bc947b785453ddc6ebb17ccafc21f33d"
addData(genre_url, genre);

let countries_url = "https://restcountries.com/v3.1/all"
addData(countries_url, countries);

result_btn.onclick = () => {
    filter.style.display = 'none';
    open.classList.remove('active-tab')
    ShowResults(movies);
};

open.onclick = () => {
    if(filter.style.display = 'none'){
        filter.style.display = 'flex';
        open.classList.add('active-tab')
        if(res_cont){
        res_cont.style.display = "none";};
    } else {
        filter.style.display = 'none';
        open.classList.remove('active-tab')
        if(res_cont){
            res_cont.style.display = "flex";};
    }
};

