import React, {useState, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import '../css/market.css'
import ReactTooltip from 'react-tooltip'


const MarketPage = () => {
  const {marketID} = useParams()
  let [market, setMarket] = useState([])

  useEffect(() => {
    getSingleMarket()
  }, [])


  let getSingleMarket = async() => {
    let response = await axios.get(`http://127.0.0.1:8000/marche_nomade/markets/${marketID}`)
    if(response.status === 200){
      setMarket(response.data)
    }
  }
  let stands = market.stands
  return (
    <div className='market-home'>
      <h1>
          Mon marché: {market.name}
      </h1>
      <h2>Les stands</h2>
      <ul>
        {stands?.map(stand => 
        (
          <li key={stand.id} data-tip data-for={`marker-stand-${stand.id}`}>
          <Link to={`/stand/${stand.id}`}>
            <img src="https://img.icons8.com/color/48/000000/marker--v1.png"/>
            <ReactTooltip id={`marker-stand-${stand.id}`}>
              <h1>{stand.name}</h1>
            </ReactTooltip>
          </Link>
          </li>
        )
        )}
      </ul>
    </div>
    
  )
}

export default MarketPage
