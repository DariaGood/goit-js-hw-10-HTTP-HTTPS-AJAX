import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputText = document.querySelector('#search-box');
const listContries = document.querySelector('.country-list');
const detailsCountry = document.querySelector('.country-info');

inputText.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (e) {
    const inputCurrent = e.target.value.trim();
    // if(!inputCurrent) {
    //   clearTemplate();
    // return;
    // }

      fetchCountries(inputCurrent)
      .then(someCountries =>  {
        if (someCountries.length > 10) {
          Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.");
          clearTemplate();
    return;
      }
      renderCountriesList(someCountries);
      })
      .catch((error) => {
        Notiflix.Notify.failure(`Try again! ${error}`)
      clearTemplate()
})
}

function renderCountriesList(countries) {
  let info = '';
  let refsTemplate = '';
  clearTemplate();
  if (countries.length === 1) {
    info = getElemCountry(countries);
    refsTemplate = detailsCountry;
  } else {
    info = createTemplateItemList(countries);
    refsTemplate = detailsCountry;
  }
makeElemsContries(refsTemplate, info)

  //   const markup = countries
  //     .map((country) => {
  //       return `
  //       <img
  // src="${country.flag}"
  // width="40"
  // height="30"
  // alt="${country.name}"/img>
  //       <p>${country.name}</p>
  //      `;
  //     })
  //     .join("");
  //     listContries.innerHTML = markup;
  }

function getElemCountry(country) {
  return country.map(
    ({ name, capital, population, flags, languages }) =>
      `
      <img
        src="${flags.svg}" 
        alt="${name.official}" 
        width="120" 
        height="80">
      <p>${name.official}</p>
      <ul>
          <li>
          <span>Capital:</span>
        ${capital}
          </li>
          <li>
          <span>Population:</span>
          ${population}
          </li>
          <li>
          <span>Languages:</span>
          ${Object.values(languages)}
          </li>
      </ul>
  `
  );
}

function createTemplateItemList(contries) {
  return contries
    .map(
      ({ name, flags }) => `
      <li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="60" 
          height="40">
        ${name.official}
      </li>`
    )
    .join('');
}

function clearTemplate() {
  detailsCountry.innerHTML = '';
  listContries.innerHTML = '';
}

function makeElemsContries(refs, markup) {
  refs.innerHTML = markup;
}