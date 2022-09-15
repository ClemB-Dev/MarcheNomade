import React, {useState, useEffect} from 'react'
import useAxios from '../utils/useAxios'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map from '../components/Map'
import '../css/home.css'
import MarketIcon from '../assets/market.png'
import ReactTooltip from 'react-tooltip'


const HomePage = () => {
  let [markets, setMarket] = useState([])
  let [stands, setStands] = useState([])

  let api = useAxios()
  
  useEffect(() => {
    getMarkets()
    getStands()
  }, [])

  let getMarkets = async() => {
    let response = await axios.get('http://127.0.0.1:8000/marche_nomade/markets/')
    if(response.status === 200){
      setMarket(response.data)
    }
  }
  
  let getStands = async() => {
    let response = await axios.get('http://127.0.0.1:8000/marche_nomade/stands/')
    if(response.status === 200){
      setStands(response.data)
    }
  }
  
  const filterStands = (market, stands) => {
    let filteredStands = stands.filter(stand => stand.market === market.id)
    if (filteredStands.length > 0) {    
      return (
        <span
        data-tip
        data-for={`stand-list${market.id}`}
        className='dot'
        >
            {filteredStands.length}
            <ReactTooltip id={`stand-list${market.id}`}>
            <label className='stand-list-label'>Artisans:</label>
            <ul className='stand-list'>
            {filteredStands?.map(st => (
              <li className='stand-list-item' key={`${market.id}${st.id}`}>{st.name}</li>
              ))}
            </ul>
            </ReactTooltip>
          </span>
        )}
        else {
          return (
            <span className='dot'>
          {filteredStands.length}
        </span>
      )
    }
  }


  return (
    <div className='home'>
      <div className='map-div'>
        <Map markets={markets} stands={stands}>
        </Map>
      </div>
      <div className='market-list'>
        <ul className='list'>
          {markets.map(market => (
            <li className='market-item' key={market.id}>
              <img alt='market-icon' className='market-icon' src={MarketIcon}/>
              {filterStands(market, stands)}
              <div className='market-name'>{market.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HomePage
