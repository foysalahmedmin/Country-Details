let displayQuantity = 6 ;
let allCountries;


const loadCountry = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(json => {
        allCountries = json;
        displayCountry();
    });
}

const displayCountry = () => {
    const countriesField = document.getElementById("allCountries")
    countriesField.innerHTML = allCountries.map(country => singleCountry(country)).slice(0, displayQuantity).join(" ")
}

const singleCountry = ({name, capital, flags, cca3}) => {

    return (
        `<div class = "country">
            <div class = "image"> <img src = "${flags.png}"> </div>
            <h3>
                Name: ${name.common};
            </h3>
            <p> Capital: ${capital ? capital[0] : "No Capital"} </p>
            <button onclick = "loadCountryDetails('${cca3}')"> Details </button>
        </div>`
    )

}
const loadCountryDetails = code =>{
    const url = `https://restcountries.com/v2/alpha/${code}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayCountryDetails(data)) ;
}

const displayCountryDetails = data => {

    const detailsField = document.getElementById("details");
    console.log(data);

    detailsField.innerHTML = `
    
    <h2>Name: ${data.name}</h2>
    <img src = ${data.flags.png}>
    
    `

}

loadCountry() ;