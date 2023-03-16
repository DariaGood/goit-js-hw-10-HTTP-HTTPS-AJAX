const url = 'https://restcountries.com';
function fetchCountries(name) {
  return fetch(`${url}/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
    response => {
      if (response.status === 404) {
        return Promise.reject('Oops, there is no country with that name.');
      }
      return response.json();
    }
  );
};

export { fetchCountries };



  
