import axios from 'axios'
import React, {useState, useEffect} from 'react'
import useAxios from '../utils/useAxios'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from '../components/Map'
import '../css/home.css'
import MarketIcon from '../assets/market.png'

const HomePage = () => {
  let [markets, setMarket] = useState([])

  let api = useAxios()


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
        <Map markets={markets}>
        </Map>
      </div>
      <div className='market-list'>
        <ul className='list'>
          {markets.map(market => (
            <li className='market-item' key={market.id}><img alt='market-icon' className='market-icon' src={MarketIcon}/><div className='market-name'>{market.name}</div></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
