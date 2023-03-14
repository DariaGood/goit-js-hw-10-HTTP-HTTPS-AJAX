import './css/styles.css';
//import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

const inputText = document.querySelector('#search-box');
const listContries = document.querySelector('.country-list');
const dataContry = document.querySelector('.country-info');


inputText.addEventListener('input', ()=> {
    fetchCountries()
    .then(renderCountriesList)
    .catch((error) => console.log(error));
});

//function getCountries () {
    
//}

function fetchCountries() {
    return fetch("https://restcountries.com/v2/all?fields=flags,name,capital,population,flags.svg,languages").then(
        (response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        }
      );
}

function renderCountriesList(name) {
    const markup = name
      .map((country) => {
        return `<ul class="country-list">
        <p>${country.flags} ${country.name}</p>
        </ul>
       `;
      })
      .join("");
      listContries.innerHTML = markup;
  }

//   <p><b>Name</b>: ${country.name.official}</p>
//   <p><b>Capital</b>: ${country.capital}</p>
//   <p><b>Population</b>: ${country.population}</p>
//   <p><b>Flags</b>: ${country.flags.svg}</p>
//   <p><b>Language</b>: ${country.language}</p>
// <div class="country-info"></div>