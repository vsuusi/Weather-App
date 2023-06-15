let result = document.getElementById("result");
let searchbutton = document.getElementById("searchbutton");
let city = document.getElementById("city");


let getWeather = () => {
    let cityValue = city.value;
    let url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityValue}`;

    if (cityValue == "") {
        //alert("Please enter a city name");
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
            <h4 id="condtext">${data.current.condition.text}</h4>
            <img src=${data.current.condition.icon}></img>
            <h1 id="tempnumber">${roundedTemp}°C</h1>
            <h2 id="loctime">${parsedTime[1]}</h2>
            `
        })
        .catch((error) => {
            console.log("error");
            result.innerHTML = `<h3 class="errormsg">City not found</h3>`;
        });
}
};
searchbutton.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);