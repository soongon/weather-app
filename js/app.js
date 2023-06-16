const apiKey = '5df3f1b99c9227bb6bb15d61c2b5bf9b';
const url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=metric&q=';

const inputTag = document.querySelector('.search input');
const weatherIconTag = document.querySelector('.weather-icon');

document.querySelector('.search button').addEventListener(
  'click', () => {
    checkWeather(inputTag.value);
  }
);

async function checkWeather(city) {
  const result = await fetch(url + city);
  const json = await result.json();

  console.log(json);

  if (result.status === 404) {
    document.querySelector('.weather').style.display = 'none';
    document.querySelector('.error').style.display = 'block';
  } else {
    // 온도, 도시명, 습도, 바람세기, 날씨텍스트
    const temp = json.main.temp;
    const cityName = json.name;
    const humidity = json.main.humidity;
    const wind = json.wind.speed;
    const condition = json.weather[0].main;
    console.log(temp, cityName, humidity, wind);

    // 해당 DOM 에 바인딩
    document.querySelector('.weather h1').innerHTML = Math.round(temp) + '°C';
    document.querySelector('.weather h2').innerHTML = cityName;
    document.querySelector('.humidity').innerHTML = humidity + '%';
    document.querySelector('.wind').innerHTML = Math.round(wind) + ' km/h'; 

    if (condition === 'Clear') {
      weatherIconTag.src = '../images/clear.png';
    } else if (condition === 'Clouds') {
      weatherIconTag.src = '../images/clouds.png';
    } else if (condition === 'Drizzle') {
      weatherIconTag.src = '../images/drizzle.png';
    } else if (condition === 'Mist') {
      weatherIconTag.src = '../images/mist.png';
    } else if (condition === 'Rain') {
      weatherIconTag.src = '../images/rain.png';
    } else if (condition === 'Snow') {
      weatherIconTag.src = '../images/snow.png'
    }
    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }

  
}