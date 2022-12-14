import './css/App.css';
import './css/Media.css'
import Sunshine from './img/sunshine.svg'
import Square from './img/Square.svg'
import Termometer from './img/Temp-2.svg'
import Wind from './img/Wind.svg'
import axios from "axios"
import Mist from "./img/Mist.svg"
import CountryIcon from "./img/Country.svg"
import VectorIcon from "./img/Vector down.svg"
import HistoryIcon from "./img/history-icon.svg"
import clist from "countries-list"



import React, { Component } from 'react'

var openedCity = undefined

var CMenuOpened = false
var HMenuOpened = false

const countries = [                     
    
]
const HIstoryRender = ()=>{
  let data = JSON.parse(localStorage.getItem("fav"))
  for(let i in data){
    document.querySelector(".history-body").innerHTML+=`<span>${data[i]}</span>`
  }
}

const OpenCities = (id, cityName)=>{

  let data = JSON.parse(localStorage.getItem("fav")) 

  if(openedCity !== undefined){
      let ocity = document.querySelectorAll(".cities")[openedCity]
      ocity.style=""
  }
  let city = document.querySelectorAll('.cities')[id]
  if(!data.includes(cityName))
  data.push(cityName)
  localStorage.setItem("fav", JSON.stringify(data))
  console.log(data)

  city.style="height: fit-content"
  openedCity = id 
  HIstoryRender()
}

var b = 0

const HistoryMenu = ()=>{
  if(HMenuOpened){
      document.querySelector(".HistoryMenu").style="top: -100vh"
      HMenuOpened = false
  }else{
      document.querySelector(".HistoryMenu").style="top: 0px"
      HMenuOpened = true
      CMenuOpened = true
      CountryMenu()
  }
}

const CountryMenu = ()=>{
  if(CMenuOpened){
      document.querySelector(".CountryMenu").style="top: -100vh"
      CMenuOpened = false
  }else{
      document.querySelector(".CountryMenu").style="top: 0px"
      CMenuOpened = true
      HMenuOpened = true
      HistoryMenu()
  }
}

export default class App extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    cityName: "Tashkent",
    lang: "ru",
    appid: "cdd0a30c0406003dac069e2019bfcfe2",
    wind_speed: <div className="loader md"></div>,
    humidity: <div className="loader md"></div>,
    feels_like: <div className="loader md"></div>,
    mainDegrees: <div className="loader xl"></div>,
    maxDegrees: <div className="loader md"></div>,
    minDegrees: <div className="loader md"></div>,
    mainIcon: <div className="loader maxsize"></div>,
    weather: undefined
  }
  componentDidMount() {
    HIstoryRender()
    for(let i in clist.countries){
      let j = b
      countries.push(<ul key={j} className="country-ul">
      <div className="country-name"  onClick={()=>{OpenCities(j, clist.countries[i].capital )}}>{clist.countries[i].name}</div>
      <div className="cities">
          {clist.countries[i].capital !=="" ? <li onClick={()=>{GetLocation(clist.countries[i].capital)}} className='city-name'>{clist.countries[i].capital}</li>: ""}
              
      </div>
  </ul>)
  b++ 
  }
    const GetWeather = () => {
      axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: this.state.lat,
          lon: this.state.lon,
          lang: this.state.lang,
          appid: this.state.appid
        }
      }).then(res => {
        this.setState({ mainDegrees: Math.round(res.data.main.temp - 273) })
        this.setState({ maxDegrees: Math.round(res.data.main.temp_max - 273) })
        this.setState({ minDegrees: Math.round(res.data.main.temp_min - 273) })  
        this.setState({weather: res.data.weather[0].description.substr(0,1).toUpperCase() + res.data.weather[0].description.substr(1)})

        SetIcon(res.data.weather[0].icon)
        console.log(res.data.weather[0].icon)
      }).catch(err=>{
        console.log(err)
      })
    }
    const GetLocation = city => {
      this.setState({cityName: city}, ()=>{
      axios.get("http://api.openweathermap.org/geo/1.0/direct", {
        params: {
          q: city,
          appid: this.state.appid,
          limit: 5
        }
      }).then(res => {
        if (res.data[0].name === this.state.cityName) {
            this.setState({ lon: res.data[0].lon, lat: res.data[0].lat }, ()=>{
            GetWeather()})
        }
      }).catch(err => {
        console.log(err)
      })
    })
    }
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position=> {
        this.setState({lat: position.coords.latitude, lon: position.coords.longitude}, ()=>{
          GetWeather()
        })
      });
    } else {
      GetLocation(this.state.cityName)
    }

    const SetIcon = (code) => {
      if ((code ==="50n") || (code === "50d")) {
        this.setState({ mainIcon: <img src={Mist} alt="Mist" /> })
      }
    }
    
  }
  render() {
    return (
      <div>
        <nav className='Nav'>
                <div className='CountryMenu'>
                    <div className="MenuNavbar">
                    <button onClick={()=>{CountryMenu()}}>
                            <img src={VectorIcon} alt="Open" className='VectorDown Close' />
                        </button>
                    </div>
                    <div className="countries">
                        {countries}
                    </div>
                </div>
                <div className='HistoryMenu'>
                <div className="MenuNavbar H">
                    <button onClick={()=>{HistoryMenu()}}>
                            <img src={VectorIcon} alt="Open" className='VectorDown CloseH' />
                        </button>
                    </div>
                    <div className="history-body">
                      
                    </div>
                </div>
                <div className='container'>
                    <div className='country'>
                        <img src={CountryIcon} alt="Country" />
                        <p>{this.state.cityName}</p>
                        <button onClick={()=>{CountryMenu()}}>
                            <img src={VectorIcon} alt="Open" className='VectorDown' />
                        </button>
                    </div>
                    <h1 className='logo'>
                        <span>w</span>
                        <span>e</span>
                        <span>a</span>
                        <span>t</span>
                        <span>h</span>
                        <span>e</span>
                        <span>r</span>
                    </h1>
                    <button onClick={()=>{HistoryMenu()}} className='history'>
                        <img src={HistoryIcon} alt="HistoryIcon" className='HistoryIcon'/>
                    </button>
                </div>
            </nav>
        <main>
          <section className="section-short-info">
            <div className="Weather-icon">
              {this.state.mainIcon}
            </div>
            <div className="degrees">{this.state.mainDegrees}℃</div>
            <div className="degrees-info">
              <p>{this.state.weather}</p>
              <div>
                <span className="max-degree">Max: {this.state.maxDegrees}℃</span>
                <span className="min-degree">Min: {this.state.minDegrees}℃</span>
              </div>
            </div>
          </section>
          <section className='wts'>
            <div className="container">
              <div className="square">
                <img src={Square} alt="grdsfg" />
                {this.state.humidity}%
              </div>
              <div className="term">
                <img src={Termometer} alt="sdgds" />
                {this.state.feels_like}℃
              </div>
              <div className="wind">
                <img src={Wind} alt="gsd" />
                {this.state.wind_speed}m/s
              </div>
            </div>
          </section>
          <section className="Hourly-weather">
            <div className="container">
              <div className="section-header">
                <div className="day">Today</div>
                <div className="date">March, 9</div>
              </div>
              <div className="section-body">
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
              </div>
            </div>
          </section>
          <section className="Hourly-weather">
            <div className="container">
              <div className="section-header">
                <div className="day">Today</div>
                <div className="date">March, 9</div>
              </div>
              <div className="section-body">
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
                <div className="mini-card">
                  <p>29℃</p>
                  <span><img src={Sunshine} alt="bfcdghrhx" /></span>
                  <p>15:00</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

// export default App;