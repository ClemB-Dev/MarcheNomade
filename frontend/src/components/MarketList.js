import React from 'react'
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import MarketIcon from '../assets/market.png'


const MarketList = (props) => {

    const filterStands = (market) => {
        let stands = market.stands
        if (stands.length > 0) {    
            return (
            <span
            data-tip
            data-for={`stand-list${market.id}`}
            className='dot'
            >
                {stands.length}
                <ReactTooltip id={`stand-list${market.id}`}>
                <label className='stand-list-label'>Artisans:</label>
                <ul className='stand-list'>
                {stands?.map(st => (
                    <li className='stand-list-item' key={`${market.id}${st.id}`}>{st.name}</li>
                    ))}
                </ul>
                </ReactTooltip>
                </span>
            )}
            else {
                return (
                <span className='dot'>
                {stands.length}
            </span>
            )
        }
        }

  return (
    <div className='market-list'>
    <ul className='list'>
      {props.markets.map(market => (
        <li className='market-item' key={market.id}>
          <Link to={`/market/${market.id}`}>
          <img alt='market-icon' className='market-icon' src={MarketIcon}/>
          {filterStands(market)}
          <div className='market-name'>{market.name}</div>
          </Link>
        </li>
      ))}
     </ul>
    </div>
  )
}

export default MarketList
