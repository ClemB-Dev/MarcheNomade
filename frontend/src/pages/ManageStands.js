import React, { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import axios from 'axios'
import '../css/manageStand.css'


const UpdateStand = () => {
  let [stands, setStands] = useState([])
  let [markets, setMarket] = useState([])
  let [categories, setCategories] = useState([])
  let [selectedStand, setSelectedStand] = useState(
    {
    'id': null,
    'name': '',
    'market': '',
    'category':'',
    'email': '',
    'opening_days': '',
    'opening_hour': '',
    'closing_hour': '',
    'phone_number': '',
    'description': '',
    'photo': '',
    'website': ''})
    let api = useAxios()
    
    useEffect(() => {
      getStands()
      getMarkets()
      getCategories()
    }, [])

  const handleChange = (e) => {
    setSelectedStand({ ...selectedStand, [e.target.name]: e.target.value });
    }

  let fillForm = (e) => {
    let id = e.target.value
    let selected = stands.filter(
      stand => id.includes(stand.id)
    )[0]
    setSelectedStand(selected)
  }

  let updateStand = async (e) => {
    let response = await axios.put(`http://127.0.0.1:8000/marche_nomade/stands/${selectedStand.id}/`, selectedStand)
    if (response.status === 200){
      alert('Votre stand a été mis à jour')
    }
    else {
      console.log('Modifications not done')
    }
}

  let getStands = async() => {
    let response = await api.get('http://127.0.0.1:8000/marche_nomade/user/stands/')
    if(response.status === 200){
      setStands(response.data)
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
  console.log(selectedStand)

  return (
    <form onSubmit={updateStand}>
      <div className='stand-managing'>
        <label htmlFor='stand-select'>Mes stands<br></br></label>
        <select name='stands' id='stand-select' onChange={fillForm}>
          <option id='null-value' disabled defaultValue> -- select an option -- </option>
          {stands?.map(stand => (
                <option key={stand.id} value={stand.id}>{stand.name}</option>
            )
            )}
        </select>
        <div>
          <label htmlFor='stand-name'>Nom du stand</label>
          <input
              className='stand-name'
              type='text'
              name='name'
              value={selectedStand.name}
              onChange={handleChange}
              required
          />
        <br></br>
        <label htmlFor='market-select'>Mon marché</label>
        <select name='market' id='market-select' required value={selectedStand.market} onChange={handleChange}>
          {markets?.map(market => (
                <option key={market.id} value={market.id}>{market.name}</option>
            )
            )}
        </select>
        <br></br>
        <label htmlFor="phone">Téléphone</label>
        <input type="tel" id="phone" name="phone_number" required
              value={selectedStand.phone_number} onChange={handleChange}>
        </input>
        <br></br>
        <label htmlFor='days'>Jours d'ouverture</label>
        <fieldset id='days' name='opening_days' onChange={handleChange} required>
            <legend>Sélectionner au moins l'un d'entre eux</legend>
            <input type="checkbox" name="weekdays" id="Lundi" value="Lundi" defaultChecked={selectedStand.opening_days.includes('Lundi')}/><label htmlFor="Lundi">Lundi</label><br />
            <input type="checkbox" name="weekdays" id="Mardi" value="Mardi" defaultChecked={selectedStand.opening_days.includes('Mardi')}/><label htmlFor="Mardi">Mardi</label><br />
            <input type="checkbox" name="weekdays" id="Mercredi" value="Mercredi" defaultChecked={selectedStand.opening_days.includes('Mercredi')}/><label htmlFor="Mercredi">Mercredi</label><br />
            <input type="checkbox" name="weekdays" id="Jeudi" value="Jeudi" defaultChecked={selectedStand.opening_days.includes('Jeudi')}/><label htmlFor="Jeudi">Jeudi</label><br />
            <input type="checkbox" name="weekdays" id="Vendredi" value="Vendredi" defaultChecked={selectedStand.opening_days.includes('Vendredi')}/><label htmlFor="Vendredi">Vendredi</label><br />
            <input type="checkbox" name="weekdays" id="Samedi" value="Samedi" defaultChecked={selectedStand.opening_days.includes('Samedi')}/><label htmlFor="Samedi">Samedi</label><br />
            <input type="checkbox" name="weekdays" id="Dimanche" value="Dimanche" defaultChecked={selectedStand.opening_days.includes('Dimanche')}/><label htmlFor="Dimanche">Dimanche</label><br />
        </fieldset>
        <label htmlFor='opening'>Heure d'ouverture</label>
        <input type="time" id="opening" name="opening_hour" value={selectedStand.opening_hour.substring(0, 5)} required onChange={handleChange}></input>
        <label htmlFor='closing'>Heure de fermeture</label>
        <input type="time" id="closing" name="closing_hour" min="05:00" max="21:00" required value={selectedStand.closing_hour.substring(0, 5)} onChange={handleChange}></input>
        <br></br>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' required value={selectedStand.email} onChange={handleChange}></input>
        <br></br>
        <label htmlFor='url'>Votre site internet</label>
        <input type='url' name='website' required value={selectedStand.website} onChange={handleChange}></input>
        <br></br>
        <label htmlFor='logo'>Votre logo</label>
        <input type="file" id="logo" name="photo" accept="image/png, image/jpeg"></input>
        <br></br>
        <label htmlFor='category-select'>Type de stand</label>
        <select name='category' id='category-select' required value={selectedStand.category} onChange={handleChange}>
          {categories?.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
            )
            )}
        </select>
        <br></br>
        <label htmlFor='description'>Description de votre stand</label>
        <br></br>
        <textarea required maxLength='250' name='description' value={selectedStand.description} onChange={handleChange}></textarea>
        </div>
        <div className='update_div'>
              <input
                  id='update_btn'
                  className='update_btn'
                  type='submit'
                  value="Modifier"
                  disabled={!selectedStand.id}
                />
        </div>
      </div>
    </form>
  )
}

export default UpdateStand
