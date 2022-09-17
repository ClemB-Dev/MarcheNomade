import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '../css/map.css'
import { useNavigate } from 'react-router-dom'


mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWItZGV2IiwiYSI6ImNsN3Vqd3VrNzAyaWIzd21nOWZld2VzOW0ifQ.HHUy82xozPgv0hbHWLxXEg'

function Map(props) {
  const mapContainer = useRef(null)
  const navigate = useNavigate()
  const lng = 2.3522219
  const lat = 48.856614
  const zoom = 2

  const filterStands = (market) => {
    let stands = market.stands
    let filteredStands = stands.filter(stand => stand.market === market.id)
    let standLists = filteredStands.map(st => (
      `<li key=${st.id}>${st.name}</li>`
    ))
    if (filteredStands.length > 0){
      return (
        `<div>
          <p>${filteredStands.length} stands</p>
          <ul style='list-style-type: none' className='stand-list-map'>
            ${standLists.join('')}
          </ul>
        </div>`
      )
    }
    else{
      return (
        `<div>
          <p>${filteredStands.length} stands</p>
        </div>`
      )
    }
  } 
  
  let features = props.markets?.map(market => {
    let title = `<h4 className='popup-market-name'>${market.name}</h4>`
    let img = market.image === null ? '' : `<img alt='market-icon' className='market-logo' src='http://localhost:8000${market.image}'/>`
    let completeAdress = market.number === null ? `<p>${market.address}, ${market.postcode}, ${market.city}</p>` : `<p>${market.number} ${market.address}, ${market.postcode}, ${market.city}</p>`
    let stands = filterStands(market)

    let description = title + img + completeAdress + stands 

    return {
      'type': 'Feature',
      'properties': {
        // 'title': `<p style='font-weight: bold'>${market.name}</p><p style='font-weight: lighter'>${completeAdress}</p>`,
        'title': `${market.name} \n\n
                  ${market.address}, ${market.postcode}, ${market.city}`,
        // 'title': `${market.name}`,
        'description': description,
        'url': `market/${market.id}`
      },
      'geometry': {
        'type': 'Point',
        'coordinates': [market.latitude, market.longitude]
      }
    }
  })
  
  let geoJsonData =  {
    'type': 'FeatureCollection',
    'features': features}

  function forwardGeocoder(query) {
    const matchingFeatures = [];
    for (const feature of geoJsonData.features) {
      if (
        feature.properties.title
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
          feature['place_name'] = feature.properties.title;
          feature['center'] = feature.geometry.coordinates;
          feature['place_type'] = ['market'];
          matchingFeatures.push(feature);
      }
    }
    return matchingFeatures;
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      projection: 'globe',
    })
      
      
    map.on('load', () => {
      map.loadImage(
        'https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-market-vegan-and-vegetarian-flaticons-flat-flat-icons.png', // Path to your image here
        (error, image) => {
          if (error) throw error
          map.addImage('market', image)
        })

      map.addSource('markets', {
        type: 'geojson',
        data: geoJsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'markets',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
            'step',
            ['get', 'point_count'],
            '#fff',
            3,
            '#fff',
            4,
            '#fff'
            ],
        'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            2,
            30,
            4,
            40
        ]
      }
      })
      

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'markets',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    })
        
    map.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: 'markets',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': 'market', // The name has to match with the image loaded
        'icon-size': 0.85,
        "icon-allow-overlap": false // This can be 'true' if you want to display all the markers 
        },
    })

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
      })        

      map.on('mouseenter', 'unclustered-point', (e) => {
        map.getCanvas().style.cursor = 'pointer'
          
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description
          
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }
          
        popup.setLngLat(coordinates).setHTML(description).addTo(map)
        })
           
        map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = ''
        popup.remove()
        })
      
        map.on('click', 'unclustered-point', (e) => {
          map.getCanvas().style.cursor = 'pointer'
          const link = e.features[0].properties.url
          navigate(link)
        })
  })

  map.touchZoomRotate.disableRotation()

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    localGeocoder: forwardGeocoder,
    placeholder: 'Recherchez un marché ou une adresse',
  })

  map.addControl(geocoder)

  map.addControl(
    new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
    })
  )
  
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })
       
    map.on('mouseenter', 'markets', (e) => {
      map.getCanvas().style.cursor = 'pointer'
        
      const coordinates = e.features[0].geometry.coordinates.slice()
      const description = e.features[0].properties.description
        
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }
        
      popup.setLngLat(coordinates).setHTML(description).addTo(map)
    })
      
    map.on('mouseleave', 'markets', () => {
      map.getCanvas().style.cursor = ''
      popup.remove()
    })

    map.on('style.load', () => {
      map.setFog({}) // Set the default atmosphere style
      })

    return () => map.remove()
  }, [geoJsonData]) 

  return(
    <div className='map-div2'>
      <div ref={mapContainer} className="map-container">
      </div>
    </div>
  )
}

export default Map