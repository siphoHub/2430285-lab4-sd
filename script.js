document.getElementById('button').addEventListener('click', async function getCountryInfo() {
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
                <h1>
                    ${country.name.common}
                </h1>
                <p>
                    Capital: ${country.capital[0]}
                </p>
                <p>
                    Population: ${country.population}
                </p>
                <img src="${country.flags.png}" width="300" height="200">
            `;
            document.getElementById('country-info').innerHTML = countryInfo;

            if (country.borders) {
                let borders = country.borders;
                let borderInfo = "<h4>Bordering Countries:</h4><ul>";

                borders.forEach(borderName => {
                    fetch(`https://restcountries.com/v3.1/alpha/${borderName}`)
                        .then(response => response.json())
                        .then(borderData => {
                            const border = borderData[0];
                            borderInfo += `
                                <li>
                                    <img src="${border.flags.png}" width="50">
                                    ${border.name.common}
                                </li>
                            `;
                            document.getElementById('bordering-countries').innerHTML = borderInfo + "</ul>";
                        })
                        .catch(error => console.error("Error fetching border:", error));
                });
            }
            
        })
        .catch(error => {
            console.error(error);});


  }  );
