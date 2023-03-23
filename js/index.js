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
            <button onclick = "displayCountryDetails('${cca3}')"> Details </button>
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
    displayQuantity += 100 ;
    if(displayQuantity >= allCountries.length){
        document.getElementById("showMoreBtn").style.display = 'none' ;
        document.getElementById("showLessBtn").style.display = 'inline-block' ;
    }
    displayCountry();
}
document.getElementById("showLessBtn").onclick = () => {
    displayQuantity -= 100 ;
    if(displayQuantity <= 6){
        displayQuantity = 6 ;
        document.getElementById("showMoreBtn").style.display = 'inline-block' ;
        document.getElementById("showLessBtn").style.display = 'none' ;
    }
    displayCountry();
}

document.getElementById('continent').onchange = () =>{
    const continentValue = document.getElementById('continent').value ;
    console.log(continentValue);
}

loadCountry() ;