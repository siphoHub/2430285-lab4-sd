async function getCountryInfo() {
    const countryName = document.getElementById('nameCountry').value;

    const countryInfoSection = document.getElementById('country-info');
    const borderingCountriesSection = document.getElementById('bordering-countries');

    countryInfoSection.innerHTML = '';
    borderingCountriesSection.innerHTML = '';

    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const country = data[0];
            const countryInfo = `
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital[0]}</p>
                <p>Population: ${country.population}</p>
                <img src="${country.flags[0]}" alt="Flag of ${country.name.common}" width="100">
            `;
            document.getElementById('country-info').innerHTML = countryInfo;
        })
        .catch(error => {
            console.error(error);
            // Show an error message if something goes wrong
            document.getElementById('country-info').innerHTML = '<p>Country not found. Please try again.</p>';
        });
  }  

document.getElementById('button').addEventListener('click', getCountryInfo());
