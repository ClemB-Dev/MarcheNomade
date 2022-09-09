import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import ReactMapGl from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from '../components/Map'

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
    <div>
      <p>Markets</p>
      <ul>
        {market.map(market => (
          <li key={market.id}>{market.name}</li>
        ))}
      </ul>
      <Map></Map>
    </div>
  )
}

export default HomePage
