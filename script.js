    // get elements from html file and save to variables
let result = document.getElementById("result");
let searchbutton = document.getElementById("searchbutton");
let city = document.getElementById("city");

    // function to get weather data from api
let getWeather = () => {
    let cityValue = city.value;
    let url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityValue}`;

        // check if city is empty
    if (cityValue == "") {
        //alert("Please enter a city name"); //alerts browser
        result.innerHTML = `<h3 class="errormsg">Please enter a city name</h3>`;
    }
    else{
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.current.temp_c);
            console.log(data.current.condition.text);
            console.log(data.current.condition.icon);
            console.log(data.location.localtime);
            let roundedTemp = Math.round(data.current.temp_c);
            let parsedTime = data.location.localtime.split(" ");

            result.innerHTML = `
            <h2 id="locname">${data.location.name}</h2>
            <h3 id="condtext">${data.current.condition.text}</h3>
            <img id=condimg src=${data.current.condition.icon}></img>
            <h1 id="tempnumber">${roundedTemp}°C</h1>
            <h2 id="loctime">local time: ${parsedTime[1]}</h2>
            `
        })
            // catch error if data was not found
        .catch((error) => {
            console.log("error");
            result.innerHTML = `<h3 class="errormsg">City not found</h3>`;
        });
}
};
searchbutton.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);

    // allow user to press enter to search
city.addEventListener("keydown", function (event){
    if (event.key == "Enter"){
        event.preventDefault();
        getWeather();
    }
});