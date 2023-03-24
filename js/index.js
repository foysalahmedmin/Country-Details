let displayQuantity = 9 ;
let allCountries;
let allCountriesShow;


const loadCountry = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(json => {
        allCountries = json;
        allCountriesShow = json;
        displayCountry();
    });
}

const displayCountry = () => {
    const countriesField = document.getElementById("allCountries")
    countriesField.innerHTML = allCountriesShow.map(country => singleCountry(country)).slice(0, displayQuantity).join(" ")
}

const singleCountry = ({name, capital, flags, cca3}) => {

    return (
        `<div class = "country">
            <div class = "flag-image"> <img src = "${flags.png}"> </div>
            <h3>
                ${name.common}
            </h3>
            <p> Capital: ${capital ? capital[0] : "No Capital"} </p>
            <button class="details-button" onclick = "showModal('${cca3}')"> Details </button>
        </div>`
    )

}
document.getElementById('searchBtn').onclick = () =>{
    const searchValue = document.getElementById('searchInput').value ;
    allCountriesShow = allCountries.filter(singleCountry => singleCountry.name.common.toLowerCase().includes(searchValue));
    displayCountry();
}

document.getElementById('continent').onchange = () =>{
    const continentValue = document.getElementById('continent').value ;
    allCountriesShow = allCountries.filter(singleCountry => singleCountry.continents[0] == continentValue);
    displayCountry();
}

// document.getElementById('continent').onchange = () =>{
//     const continentValue = document.getElementById('continent').value ;
//     allCountriesShow = allCountries.filter(singleCountry => singleCountry.continents[0] == continentValue);
//     displayCountry();
// }


const displayCountryDetails = data => {

    const detailsField = document.getElementById("details");
    const thisCountry = allCountries.filter(singleCountry => singleCountry.cca3 == data)[0] ;
    let {name, capital, flags} = thisCountry ;
    console.log(thisCountry);
    detailsField.innerHTML = `
    <div>
        <div class = "image"> <img src = "${flags.png}"> </div>
        <h3>
            Name: ${name.common};
        </h3>
        <p> Capital: ${capital ? capital[0] : "No Capital"} </p>
    </div>
    `

}

const modal = document.getElementById("detailsModal");
const modalClose = document.getElementById("close");

function showModal(data) {
    modal.style.display = "block";
    const detailsField = document.getElementById("details");
    const thisCountry = allCountries.filter(singleCountry => singleCountry.cca3 == data)[0] ;
    let {name, capital, flags, area, population, continents, languages, maps} = thisCountry ;
    console.log(thisCountry);
    detailsField.innerHTML = `
        <div>
            <div class = "image"> <img src = "${flags.png}"> </div>
            <h2>
                ${name.common}
            </h2><br>
            <p><strong>Capital:</strong> ${capital ? capital[0] : "No Capital"} </p>
            <div>
                <strong>Language:</strong>
                <div class="languages">
                    ${languagesDiv(languages)}
                </div>
            </div>
            <p><strong>Area:</strong> ${area}<sup>2</sup> Meter</p>
            <p><strong>Population:</strong> ${population} </p>
            <p><strong>Continent:</strong> ${continents[0]} </p>
            <a href="${maps.googleMaps}" target = "_black"><Button class="mapBtn"><i class="fa-solid fa-map-location-dot"></i></Button></a>
        </div>
    `
}
const languagesDiv = (languages) =>{
    console.log(languages);
    let div = '';
    for(let lang in languages){
        div += `<div>${languages[lang]}</div>`
    }
    console.log(div);
    return div ;
}
modalClose.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


document.getElementById("showMoreBtn").onclick = () => {
    displayQuantity += 9 ;
    if(displayQuantity >= allCountriesShow.length){
        document.getElementById("showMoreBtn").style.display = 'none' ;
        document.getElementById("showLessBtn").style.display = 'inline-block' ;
    }
    displayCountry();
}
document.getElementById("showLessBtn").onclick = () => {
    displayQuantity -= 9 ;
    if(displayQuantity <= 9){
        displayQuantity = 9 ;
        document.getElementById("showMoreBtn").style.display = 'inline-block' ;
        document.getElementById("showLessBtn").style.display = 'none' ;
    }
    displayCountry();
}

loadCountry() ;