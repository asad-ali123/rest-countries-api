const countryName = new URLSearchParams(location.search).get("name");
console.log(countryName);
const container = document.querySelector(".container");
const flagImg = document.querySelector(".container img");
const counName = document.querySelector(".country-name");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");

const topLevelDomain = document.querySelector(".top-level-domain");
const currencie = document.querySelector(".currencies");
const language = document.querySelector(".language");
const borderInfo = document.querySelector(".border-info ");
const backBtn = document.querySelector(".back-btn")
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => {
    return res.json();
  })
  .then(([country]) => {
    // console.log(country);
    flagImg.src = `${country.flags.svg}`;
    counName.innerHTML = `${country.name.common}`;

    if (country.name.nativeName) {
      nativeName.innerHTML = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerHTML = country.name.nativeName;
    }
    let popula = new Intl.NumberFormat().format(country.population);
    population.innerHTML = popula;
    region.innerHTML = country.region;
    if (country.subregion) {
      subRegion.innerHTML = country.subregion;
    } 

if(country.capital){
  capital.innerHTML = country.capital;
}

    topLevelDomain.innerHTML = country.tld.join(", ");

    if (country.currencies) {
      currencie.innerHTML = Object.values(country.currencies).map((currencie) => currencie.name) .join(", ");
    }

    language.innerHTML = Object.values(country.languages).join(", ");


    if(country.borders){
        country.borders.forEach((border)=>{
          fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) => {
            return res.json()
          }).then(([borderData])=>{
            console.log(borderData);
            const borderTag = document.createElement("a");
            borderTag.innerHTML = borderData.name.common;
            // console.log(borderTag);
          // borderTag.href =borderData.maps.googleMaps;
          borderTag.href =`country.html?name=${borderData.name.common}`;
            borderInfo.appendChild(borderTag);
            
            
          });
        });
        
    }

    backBtn.addEventListener("click" ,(e)=>{
    history.back();
    })
   

  });



// const countryDetails = document.createElement("div");
// container.classList.add("country-details")
// const htmlCountryTemp =  `
//   <h2 class="country-name">${country.name.common}</h2>
//               <div class="country-sub-details">
//                     <p><b>Native Name: </b><span></span></p>
//                     <p><b>Population: </b><span>Belgie</span></p>
//                     <p><b>Region: </b><span>Belgie</span></p>
//                     <p><b>Sub Region: </b><span>Belgie</span></p>
//                     <p><b>Capital: </b><span>Belgie</span></p>
//                     <br>
//                     <p><b>Top Level Domain: </b><span>Belgie</span></p>
//                     <p><b>Currencies: </b><span>Belgie</span></p>
//                     <p><b>Language: </b><span>Belgie</span></p>
//                 </div>
//                 <div class="border-info">
//                     <p><b>Border Countries: </b><a href="#">France</a> <a href="#">Germany</a><a href="#">ggg</a></p>
//                 </div>
//             </div> `;
//           countryDetails.innerHTML = htmlCountryTemp
//             container.append(countryDetails);

//         });
