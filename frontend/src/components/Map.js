import React, { useState, useEffect, useRef } from 'react';
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import mapboxgl from 'mapbox-gl';
import '../css/map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWItZGV2IiwiYSI6ImNsN3Vqd3VrNzAyaWIzd21nOWZld2VzOW0ifQ.HHUy82xozPgv0hbHWLxXEg'

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(2.3522219);
    const [lat, setLat] = useState(48.856614);
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
    });

    return(
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default Map