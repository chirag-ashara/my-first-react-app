function SidebarComponent({recentSearchData, handlePastSearch}) {
  return (
    <div className="sidebar">
       <h2>Weather App</h2>
       <div className="recent-searches">
           <h3>Recent Searches</h3>
           <ul id="recentSearches">
           {recentSearchData.map((item, index) => (
               <li key={index} onClick={() => handlePastSearch(item)}>
                 {item}
               </li>
             ))}
           </ul>
       </div>
    </div>
  )
}

export default SidebarComponent
