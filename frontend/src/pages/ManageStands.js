import React, { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import axios from 'axios'
import '../css/manageStand.css'


const UpdateStand = () => {
  let [stands, setStands] = useState([])
  let [markets, setMarket] = useState([])
  let [singleStand, setSingleStand] = useState([])
  let [categories, setCategories] = useState([])
  let api = useAxios()

  useEffect(() => {
    getStands()
    getMarkets()
    getCategories()
  }, [])

  let getStands = async() => {
    let response = await api.get('http://127.0.0.1:8000/marche_nomade/user/stands/')
    if(response.status == 200){
      setStands(response.data)
    }
  }

  let getSingleStand = async(id) => {
    let response = await axios.get(`http://127.0.0.1:8000/marche_nomade/stands/${id}`)
    if(response.status === 200){
      setSingleStand(response.data)
    }
  }


  let getMarkets = async() => {
    let response = await axios.get('http://127.0.0.1:8000/marche_nomade/markets/')
    if(response.status === 200){
      setMarket(response.data)
    }
  }

  let getCategories = async() => {
    let response = await axios.get('http://127.0.0.1:8000/marche_nomade/categories/')
    if(response.status === 200){
      setCategories(response.data)
    }
  }

  return (
    <div className='stand-managing'>
      <label htmlFor='stand-select'>Mes stands<br></br></label>
      <select name='stands' id='stand-select'>
        <option defaultValue> -- select an option -- </option>
        {stands?.map(stand => (
              <option key={stand.id} value={stand.id}>{stand.name}</option>
          )
          )}
      </select>
      <div>
        <label htmlFor='stand-name'>Nom du stand</label><br></br>
        <input
            className='stand-name'
            type='text'
            name='stand-name'
        />
      <br></br>
      <label htmlFor='market-select'>Mon marché</label>
      <select name='markets' id='market-select'>
        {markets?.map(market => (
              <option key={market.id} value={market.name}>{market.name}</option>
          )
          )}
      </select>
      <br></br>
      <label htmlFor="phone">Téléphone</label>
      <input type="tel" id="phone" name="phone"
            pattern="0[67][0-9]{4}">
      </input>
      <br></br>
      <label htmlFor='days'>Jours d'ouverture</label>
      <fieldset id='days'>
          <legend>Sélectionner au moins l'un d'entre eux</legend>
          <input type="checkbox" name="weekdays" id="Lundi" value="Lundi" /><label htmlFor="Lundi">Lundi</label><br />
          <input type="checkbox" name="weekdays" id="Mardi" value="Mardi" /><label htmlFor="Mardi">Mardi</label><br />
          <input type="checkbox" name="weekdays" id="Mercredi" value="Mercredi" /><label htmlFor="Mercredi">Mercredi</label><br />
          <input type="checkbox" name="weekdays" id="Jeudi" value="Jeudi" /><label htmlFor="Jeudi">Jeudi</label><br />
          <input type="checkbox" name="weekdays" id="Vendredi" value="Vendredi" /><label htmlFor="Vendredi">Vendredi</label><br />
          <input type="checkbox" name="weekdays" id="Samedi" value="Samedi" /><label htmlFor="Samedi">Samedi</label><br />
          <input type="checkbox" name="weekdays" id="Dimanche" value="Dimanche" /><label htmlFor="Dimanche">Dimanche</label><br />
      </fieldset>
      <label htmlFor='opening'>Heure d'ouverture</label>
      <input type="time" id="opening" name="opening" min="05:00" max="21:00" required></input>
      <label htmlFor='closing'>Heure de fermeture</label>
      <input type="time" id="closing" name="closing" min="05:00" max="21:00" required></input>
      <br></br>
      <label htmlFor='email'>Email</label>
      <input type='email' name='email'></input>
      <br></br>
      <label htmlFor='url'>Votre site internet</label>
      <input type='url' name='url'></input>
      <br></br>
      <label htmlFor='logo'>Votre logo</label>
      <input type="file" id="logo" name="logo" accept="image/png, image/jpeg"></input>
      <br></br>
      <label htmlFor='category-select'>Type de stand</label>
      <select name='categories' id='category-select'>
        {categories?.map(category => (
              
              <option key={category.id} value={category.name}>{category.name}</option>
          )
          )}
      </select>
      <br></br>
      <label htmlFor='description'>Description de votre stand</label>
      <br></br>
      <textarea maxLength='250'></textarea>
      </div>
    </div>
  )
}

export default UpdateStand
