import React, { Component } from 'react'
import CountryIcon from "../img/Country.svg"
import VectorIcon from "../img/Vector down.svg"
import HistoryIcon from "../img/history-icon.svg"
import clist from "countries-list"

var CMenuOpened = false
var HMenuOpened = false

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

var openedCity = undefined

const countries = [                     
    
]

const OpenCities = (id)=>{
    if(openedCity !== undefined){
        let ocity = document.querySelectorAll(".cities")[openedCity]
        ocity.style=""
    }
    let city = document.querySelectorAll('.cities')[id]
    city.style="height: fit-content"
    openedCity = id 
}
var b = 0
export default class Nav extends Component {
    componentDidMount(){
            for(let i in clist.countries){
                let j = b
                countries.push(<ul key={j} className="country-ul">
                <div className="country-name"  onClick={()=>{OpenCities(j)}}>{clist.countries[i].name}</div>
                <div className="cities">
                    {clist.countries[i].capital !=="" ? <li className='city-name'>{clist.countries[i].capital}</li>: ""}
                        
                </div>
            </ul>)
            b++ 
            }
    }
    render() {
        return (
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
                </div>
                <div className='container'>
                    <div className='country'>
                        <img src={CountryIcon} alt="Country" />
                        <p>Tashkent</p>
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
        )
    }
}
