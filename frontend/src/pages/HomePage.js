import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import ReactMapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from '../components/Map'
import '../css/home.css'
import MarketIcon from '../assets/market.png'

const HomePage = () => {
  let [market, setMarket] = useState([])
  let {authTokens, logoutUser} = useContext(AuthContext)

  // let api = useAxios()


  useEffect(() => {
    getMarkets()
  }, [])

  let getMarkets = async() => {
    let response = await axios.get('http://127.0.0.1:8000/marche_nomade/markets/')

    if(response.status === 200){
      setMarket(response.data)
    }
}

  return (
    <div className='home'>
      <div className='map-div'>
        <Map></Map>
      </div>      
      <div className='market-list'>
        <ul className='list'>
          {market.map(market => (
            <li className='market-item' key={market.id}><img className='market-icon' src={MarketIcon}/>{market.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
