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
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital[0]}</p>
                <p>Population: ${country.population}</p>
                <img src="${country.flags[0]}" alt="Flag of ${country.name.common}" width="100">
            `;
            document.getElementById('country-info').innerHTML = countryInfo;

            if (country.borders) {
                let borders = country.borders;
                let borderInfo = "<h3>Bordering Countries:</h3><ul>";

                // Loop through each border and fetch its name and flag
                borders.forEach(borderCode => {
                    fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
                        .then(response => response.json())
                        .then(borderData => {
                            const border = borderData[0];
                            borderInfo += `
                                <li>
                                    <img src="${border.flags[0]}" alt="Flag of ${border.name.common}" width="30">
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
