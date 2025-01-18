function ResultComponent(props) {
  const { weather, weatherData, city , sys} = props;

  function convertToCelsiusFromKelvin(kelvin) {
    let celsius = kelvin - 273.15;
    return celsius.toFixed(2); // Returning the result rounded to 2 decimal places
  }

  function covertDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString();
  }

  if(weather !== ''){
    return (
      <>
        <table id="weatherTable">
            <thead>
                <tr>
                    <td>City</td>
                    <td>{city}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Temperature (°C)</td>
                    <td>{convertToCelsiusFromKelvin(weatherData.temp)} °C</td>
                </tr>
                <tr>
                    <td>Min Temperature (°C)</td>
                    <td>{convertToCelsiusFromKelvin(weatherData.temp_min)} °C</td>
                </tr>
                <tr>
                    <td>Max Temperature (°C)</td>
                    <td>{convertToCelsiusFromKelvin(weatherData.temp_max)} °C</td>
                </tr>
                <tr>
                    <td>Weather</td>
                    <td>{weather[0].main} <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} /></td>
                </tr>
                <tr>
                    <td>Humidity (%)</td>
                    <td>{weatherData.humidity} %</td>
                </tr>
                <tr>
                    <td>Sunrise</td>
                    <td>{covertDate(sys.sunrise)}</td>
                </tr>
                <tr>
                    <td>Sunset</td>
                    <td>{covertDate(sys.sunset)}</td>
                </tr>
            </tbody>
        </table>
      </>
    )
  }
}
export default ResultComponent
