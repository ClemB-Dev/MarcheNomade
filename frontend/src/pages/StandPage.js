import React, { useState, useEffect } from 'react'
import Room3D from '../components/Room3D'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'


const StandPage = () => {
  const {standID} = useParams()
  let [stand, setStand] = useState([])

  useEffect(() => {
    getSingleStand()
  }, [])


  let getSingleStand = async() => {
    let response = await axios.get(`http://127.0.0.1:8000/marche_nomade/stands/${standID}`)
    if(response.status === 200){
      setStand(response.data)
    }
  }

  return (
    <div className='home'>
      <h1>{stand.name}</h1>
      <Room3D stand={stand}>
      </Room3D>
    </div>
  )
}

export default StandPage
