let displayQuantity = 6 ;
let allCountries;
let allCountriesShow;


const loadCountry = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(json => {
        allCountries = json;
        allCountriesShow = json;
        console.log(allCountriesShow);
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
            <button class="details-button" onclick = "displayCountryDetails('${cca3}')"> Details </button>
        </div>`
    )

}

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
    if(displayQuantity <= 6){
        displayQuantity = 6 ;
        document.getElementById("showMoreBtn").style.display = 'inline-block' ;
        document.getElementById("showLessBtn").style.display = 'none' ;
    }
    displayCountry();
}

document.getElementById('continent').onchange = () =>{
    const continentValue = document.getElementById('continent').value ;
    allCountriesShow = allCountries.filter(singleCountry => singleCountry.continents[0] == continentValue);
    displayCountry();
}

loadCountry() ;