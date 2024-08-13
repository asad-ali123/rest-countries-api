const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".drop-menu-container");
const searchField = document.querySelector(".search-field");
const darkMode = document.querySelector(".dark-mode")
const lightMode = document.querySelector(".light-mode")
let allCountriesData;

//All countries
fetch("https://restcountries.com/v3.1/all")
.then((res) => {
  return res.json();
  
})
.then((data) => {
  countriesData(data);
  allCountriesData = data;
  
  
});

// Search by region
filterByRegion.addEventListener("change", (e) => {
  countriesContainer.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      countriesData(data);
    });
});
//Rendering data
function countriesData(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    let population = new Intl.NumberFormat().format(country.population);
    const htmlCard = ` <img src="${country.flags.svg}" alt="flag">
                       <div class="card-text">
                        <h2 class="card-title">${country.name.common}</h2>
                        <p><b>Population : </b>${population}</p>
                        <p><b>Region : </b>${country.region}</p>
                        <p><b>Capital : </b>${country.capital}</p>
                       </div>`;
    countryCard.innerHTML = htmlCard;
    countriesContainer.appendChild(countryCard);
  });
}

//Search by name

searchField.addEventListener("input", (e) => {
  const filterData = allCountriesData.filter((country) => {
  return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
  });
  countriesData(filterData);
  // console.log(filterData);
});

 darkMode.addEventListener("click" , (e)=>{
document.body.classList.toggle("dark");
  })
  lightMode.addEventListener("click" , (e)=>{
document.body.classList.toggle("dark")

  })









