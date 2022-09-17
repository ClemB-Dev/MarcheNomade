import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../css/home.css'
import Map from '../components/Map'
import MarketList from '../components/MarketList'


const HomePage = () => {
  let [markets, setMarket] = useState([])

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
      <MarketList markets={markets}></MarketList>
    </div>
  )
}

export default HomePage
