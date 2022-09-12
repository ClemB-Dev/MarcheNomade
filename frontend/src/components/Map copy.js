import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import '../css/map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWItZGV2IiwiYSI6ImNsN3Vqd3VrNzAyaWIzd21nOWZld2VzOW0ifQ.HHUy82xozPgv0hbHWLxXEg'

function Map(props) {
  const mapContainer = useRef(null);
  
  const [lng, setLng] = useState(2.3522219);
  const [lat, setLat] = useState(48.856614);
  const [zoom, setZoom] = useState(2);
  console.log(props.markets)
  
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      projection: 'globe',
    });
    
    //   Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // map.on('style.load', () => {
    //     map.setFog({});
    // })
      
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
    );
  
    props.markets?.map(market => {
      var completeAdress = market.number === null ? `${market.address}, ${market.postcode}, ${market.city}` : `${market.number} ${market.address}, ${market.postcode}, ${market.city}`
      console.log(completeAdress)
      var popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: true, closeOnMove:true })
      .setHTML(
        `<h4>${market.name}</h4> 
        <p>${completeAdress}</p>`
        );

      var marker = new mapboxgl.Marker()
        .setLngLat([market.latitude, market.longitude])
        .setPopup(popup)
        .togglePopup(true)
        .addTo(map)
    })

    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
      })

    return () => map.remove();
  }, [props.markets]); 

  return(
      <div className='map-div2'>
          <div ref={mapContainer} className="map-container">
          </div>
      </div>
  )
}

export default Map