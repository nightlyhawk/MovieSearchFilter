const search = document.querySelector("#search");
const glassbtn = document.querySelector("#glass");
const fits = document.querySelectorAll(".fits");
const checks = document.querySelectorAll(".checks");
const genre = document.querySelector("#genre");
const keywords = document.querySelector("#keywords");
const companies = document.querySelector("#companies");
const countries = document.querySelector("#countries");
const filter = document.getElementsByClassName('filter');
const date = document.querySelector("#year");
const result_btn = document.querySelector("#result");
const open = document.getElementsByClassName('open_filter');


const submit = (name, input) => {
    filters[name] = input.value 
};


checks.onclick = function add() {
    for(let i = 0; i < checks.length; i++){
        if(checks[i].checked = True && checks[i] === e.target){
            filters.Type.push(checks[i].name)
        }
        if(checks[i].checked = False){
            filters.Type.pop(checks[i].name)
        } 
        
    }
};

window.onload = function yearsPrinter() {
    let initial = 1999
    let final = 2023
    const years = []
    years.push(initial)
    if(initial>= final) {
        console.log(years)
        years.forEach((year) => {
            let option = document.createElement('option')
            option.innerText = year
            option.value = year
            date.appendChild(option)
        },)
    } else {
        initial++
    }
};


(function loop(){
const fits = document.querySelectorAll("fits");
fits.forEach(fit => {
    fit.addEventListener("change", function() {
      submit(this.name, this.value)
    });
})
})();








const apiKey = "8927507f";
const filters = {
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

fits.onchange = () => {
const queryString = Object.entries(filters)
.map(([key, value]) => `${key}=${encodedURIComponent(value)}`)
.join('&');


fetch(`http://www.omdbapi.com/?apikey=${apiKey}&${queryString}`)
.then(response => response.json())
.then(data => {
   if (data.Response === 'True') {
    const movies = data.Search;
    ShowResults(movies);
    movies.forEach(movie => {
        console.log(movie.Title);
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
    movies.forEach((movie) => {
        let div = document.createElement('div');
        div.id = "result_container"
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



        section.appendChild(div)
        

    });
  }
//   https://www.omdbapi.com/?apikey=8927507f&type=genre/movie/list 

let genre_url = "https://api.themoviedb.org/3/genre/movie/list?&api_key=bc947b785453ddc6ebb17ccafc21f33d"
addData(genre_url, genre);

let countries_url = "https://restcountries.com/v3.1/all"
addData(countries_url, countries);




function addData(url, section){
  fetch(url)
  .then(res => {
    if(!res.ok){
        throw Error("could not fetch data for that resource")
    } return res.json
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


function deploy(data, section){
    data.forEach((item) => {
        let option = document.createElement('option')
        option.innerText = item
    
        section.appendChild(option)
    });
};

result_btn.onclick = () => {
    filter.style.display = 'none';
};

open.onclick = () => {
    if(filter.style.display = 'none'){
        filter.style.display = 'flex';
        open.style.border.left = '3px solid yellow';
    } else {
        filter.style.display = 'none';
        open.style.border.left = 'none';
    }
};

