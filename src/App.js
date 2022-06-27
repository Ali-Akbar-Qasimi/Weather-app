import React from 'react'
import searchIcon from "./search-interface-symbol.png"

function App() {

    const API_KEY = 'e629d7e763c3c298a4490e06575c9e27'
    const [weather, setWeather] = React.useState()
    const [city, setCity] = React.useState()
    const [spinner, setSpinner] = React.useState(true)
    const [error, setError] = React.useState(false)
    const [countryList,setCountryList] = React.useState()
    

    async function getWeather() {
        setSpinner(true)
        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        let data = await response.json()

        if(data.cod === '404' || data.cod === '400'){
            setCity('')
            setSpinner(false)
            setError(true)
            console.log('notfound')
            return
        }

        setCity('')
        setWeather(data)
        setSpinner(false)
        setError(false)
        console.log(data)

    }


    React.useEffect(() => {
        setSpinner(true)
        fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then(data =>{
            setSpinner(false)
            setCountryList(
                data
            )
        })
    },[])
        
    window.addEventListener('keypress',(e)=>{
        if(e.key !== "Enter") return
        
        getWeather()
    })

  return (
    <div className='App'>
        { spinner === false &&
            <div className="top">
                <div className="input-container">
                    <input list='cities' type='text' id='input' placeholder='city...' value={city} onChange={e => setCity(e.target.value)}  />
                    <datalist id="cities">
                        { countryList && 
                        countryList.map(country => <option key={country.name.common} value={country.name.common}/>)}
                    </datalist>
                    
                    <div className="searchIcon-container" onClick={getWeather}>
                        <img className="searchIcon" src={ searchIcon } alt="search" />
                    </div>
                </div>
            </div>
        }

        { error === false ?
            weather &&
                <div className="description">
                    <p className="card">City: { weather.name } , {weather.sys.country}</p>
                    <p className="card">Feels like: { weather.main.feels_like }&deg;C</p>
                    <p className="card">Temperature: { Math.round(weather.main.temp) }&deg;C</p>
                    <p className="card">Max Temperature: { Math.round(weather.main.temp_max) }&deg;C</p>
                    <p className="card">Min Temperature: { Math.round(weather.main.temp_min) }&deg;C</p>
                    <p className="card">Status: { weather.weather[0].main }</p>
                    <p className="card">Wind speed: { weather.wind.speed }</p>
                    <p className="card">Wind direction: { weather.wind.deg }</p>
                    <p className="card">Cloudiness: { weather.clouds.all }%</p>
                    <p className="card">Timezone: { weather.timezone }</p>
                    <p className="card">Humidity: { weather.main.humidity }%</p>
                    <p className="card">Pressure: { weather.main.pressure }</p>
                    <p className="card">Longitude: { weather.coord.lon }</p>
                    <p className="card">latitude: { weather.coord.lat }</p>
                </div>
            :
            <h1>the city you entered not found , please enter a proper city or country name</h1>
        }

        { spinner === true && <div className="spinner"></div> }
    </div>
  )
}

export default App