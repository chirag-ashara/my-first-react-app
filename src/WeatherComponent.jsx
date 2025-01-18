import React, { useState , useEffect} from 'react';
import axios from 'axios';
import ResultComponent from './ResultComponent';
import Loader from './Loader';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WeatherComponent({ addDataToRecent,cityName }) {

    const [loading, setLoading] = useState(false);
    const [searchData, setLocation] = useState({
      city: '',
      latitude: '',
      longitude: '',
      weatherdata: '',
      weather: '',
      sys: '',
      name: ''
  });


    useEffect(() => {
      if (cityName) {
        searchPastData(cityName);
      }
    }, [cityName]);

    const searchPastData = (cityName) => {
        setLoading(true);

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid={}`)
          .then(response => {
            setLocation(prevState => ({
              ...prevState,
              weatherData: response.data.main,
              weather: response.data.weather,
              sys: response.data.sys,
              name: response.data.name
            }));

            setLoading(false);
            //addDataToRecent(response.data.name);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          });
      }

    const changeHandler = (e) => {
      const { name, value } = e.target;

      if(name == 'city'){
        setLocation((prevState) => ({
           ...prevState,
           city: value
         }));
      }else if(name == 'latitude'){
        setLocation((prevState) => ({
           ...prevState,
           latitude: value
         }));
      }else if(name == 'longitude'){
        setLocation((prevState) => ({
           ...prevState,
           longitude: value
         }));
      }
  }

  // const addDataToRecent = (e) => {
  //   let pastData = searchData.recentSearchData;
  //   recentSearchData.push(searchData.name);
  // }

  const getWeatherData = (e) => {
    setLocation({
          city: '',
          latitude: '',
          longitude: '',
          weatherdata: '',
          weather: '',
          sys: ''
    });
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          setLoading(true);
          setTimeout(() => {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={}`)
          .then(response => {

            setLocation(prevState => ({
              ...prevState,  // Spread the previous state
              city: '',
              latitude: '',
              longitude: '',
              weatherData: response.data.main,
              weather: response.data.weather,
              sys: response.data.sys,
              name: response.data.name
            }));
            setLoading(false);
            addDataToRecent(response.data.name);
          })

          .catch(error => {
            console.error(error);
          });
        },1000)
      }, function(error) {
             console.error("Error occurred. Error code: " + error.code);
      });
      } else {
             console.log("Geolocation is not supported by this browser.");
      }
  }

    const isCityValid = (input) => /^[a-zA-Z\s]+$/.test(input);

    const isLatitudeValid = (input) => {
     const lat = parseFloat(input);
     return !isNaN(lat) && lat >= -90 && lat <= 90;
   };

   const isLongitudeValid = (input) => {
    const lng = parseFloat(input);
    return !isNaN(lng) && lng >= -180 && lng <= 180;
  };

    const searchHandler = (e) => {
        e.preventDefault();

        if (searchData.city && (searchData.latitude || searchData.longitude)) {
           toast.error("Please search by either City OR Latitude/Longitude, not both.");
           return;
        }

        if (searchData.city) {
          if (!isCityValid(searchData.city)) {
              toast.error("Please enter a valid city name.");
              return;
          }
        } else if (searchData.latitude && searchData.longitude) {
            if (!isLatitudeValid(searchData.latitude) && !isLongitudeValid(searchData.longitude)) {
                toast.error("Please enter valid Latitude or Longitude.");
                return;
            }
        } else {
            toast.error("Please enter either a valid city or Latitude/Longitude.");
            return;
          }

        if(searchData.city != ''){
          setLoading(true);
          setTimeout(() => {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchData.city}&appid={}`)
          .then(response => {

          setLocation(prevState => ({
              ...prevState,  // Spread the previous state
              city: '',
              latitude: '',
              longitude: '',
              weatherData: response.data.main,
              weather: response.data.weather,
              sys: response.data.sys,
              name: response.data.name
            }));
              setLoading(false)
              addDataToRecent(response.data.name)
          })

          .catch(error => {
            console.error(error);
          });
  },1000)
        }else{
          setLoading(true);
          setTimeout(() => {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${searchData.latitude}&lon=${searchData.longitude}&appid={}`)
          .then(response => {

          setLocation(prevState => ({
              ...prevState,  // Spread the previous state
              city: '',
              latitude: '',
              longitude: '',
              weatherData: response.data.main,
              weather: response.data.weather,
              sys: response.data.sys,
              name: response.data.name
            }));
            setLoading(false)
            addDataToRecent(response.data.name)
          })
          .catch(error => {
            console.error(error);
          });
        },1000);
        }
  }

  return (
    <>
    <div className="search-bar">
        <input type="text" id="city" name="city" onChange={changeHandler} value={searchData.city} placeholder="Enter city" />
        <div className="or-text">OR</div>
        <input type="text" id="latitude" name="latitude" onChange={changeHandler} value={searchData.latitude} placeholder="Enter latitude" />
        <input type="text" id="longitude" name="longitude" onChange={changeHandler} value={searchData.longitude} placeholder="Enter longitude" />
        <button type="button" onClick={searchHandler}>Search</button>
    </div>

    <div className="search-bar">
        <button onClick={getWeatherData} type="button">Search Using GPS</button>
    </div>
    <div className="table-container">
        {loading ? (
               <Loader />
             ) : (
        <ResultComponent weatherData={searchData.weatherData} weather={searchData.weather} city={searchData.name} sys={searchData.sys}/>
        )}
    </div>
    <ToastContainer />
    </>
  )
}

export default WeatherComponent
