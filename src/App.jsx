import React, { useState, useEffect } from 'react';
import WeatherComponent from './WeatherComponent';
import SidebarComponent from './SidebarComponent';

function App() {
  const [recentSearchData, setRecentSearchData] = useState([]);
  const [cityName, setCityName] = useState(null);
  const addDataToRecent = (newSearch) => {
      setRecentSearchData((prevData) => {
        const updatedData = [...prevData.filter((item) => item !== newSearch), newSearch];
        return updatedData;
      });
    };


    const handlePastSearch = (city) => {
      setCityName(city)
    }

    useEffect(() => {
    const savedSearchData = JSON.parse(localStorage.getItem('recentSearchData')) || [];
    setRecentSearchData(savedSearchData);
  }, []);

  useEffect(() => {
   if (recentSearchData.length > 0) {
     localStorage.setItem('recentSearchData', JSON.stringify(recentSearchData));
   }
 }, [recentSearchData]);

return (
  <div className="container">
      <SidebarComponent recentSearchData={recentSearchData} handlePastSearch={handlePastSearch}/>
    <div className="main-content">
      <WeatherComponent addDataToRecent={addDataToRecent} cityName={cityName}/>
    </div>
  </div>
  )
}

export default App
