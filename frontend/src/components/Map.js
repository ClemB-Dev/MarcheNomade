import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../css/map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWItZGV2IiwiYSI6ImNsN3Vqd3VrNzAyaWIzd21nOWZld2VzOW0ifQ.HHUy82xozPgv0hbHWLxXEg'

function Map() {
    const mapContainer = useRef(null);

    const [lng, setLng] = useState(2.3522219);
    const [lat, setLat] = useState(48.856614);
    const [zoom, setZoom] = useState(2);


    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        projection: 'globe',
      });
  
      // Add navigation control (the +/- zoom buttons)
      // map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
      map.on('style.load', () => {
          map.setFog({});
      })

      return () => map.remove();
    }, []); 

    return(
        <div className='map-div2'>
            <div ref={mapContainer} className="map-container">                
            </div>
        </div>
    )
}

export default Map