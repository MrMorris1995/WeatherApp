import apiKeyExtern from './key.js';

var tempRealTimeCelcius = 0;
var tempRealTimeFahrenheit = 0;
const apiKey = apiKeyExtern;

async function fetchData() {

    const city = "Stade";
    const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + city;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      tempRealTimeCelcius = data.current.temp_c;
      tempRealTimeFahrenheit = data.current.temp_f;
      let textTemp = "Die Temparatur beträgt aktuell " + tempRealTimeCelcius + "°C";
      document.getElementById("temp").innerHTML = textTemp;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  // Aufruf der Funktion
  fetchData();

  function changeTempUnit() {
    let temp = document.getElementById("temp");
    let tempUnit = temp.classList;
    let tempUnitConverted = tempUnit.toString();

    switch (tempUnitConverted) {
        case "fahrenheit":
            var tempConverted = ((tempRealTimeFahrenheit - 32) * 5/9).toFixed(1);
            temp.classList.remove("fahrenheit");
            temp.classList.add("celcius");
            var CelciusText = "Die Temparatur beträgt aktuell " + tempConverted + "°C";
            temp.innerHTML = CelciusText;
            break;
        case "celcius":
            var tempConverted = ((tempRealTimeCelcius * 9/5) + 32).toFixed(1);
            temp.classList.remove("celcius");
            temp.classList.add("fahrenheit");
            var FahrenheitText = "Die Temparatur beträgt aktuell " + tempConverted + "°F";
            temp.innerHTML = FahrenheitText;
            break;
    }
  }

  document.getElementById("startChangeUnit").addEventListener("click", changeTempUnit);