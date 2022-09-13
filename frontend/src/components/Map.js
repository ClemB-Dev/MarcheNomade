import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../css/map.css'


mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWItZGV2IiwiYSI6ImNsN3Vqd3VrNzAyaWIzd21nOWZld2VzOW0ifQ.HHUy82xozPgv0hbHWLxXEg'

function Map(props) {
  const mapContainer = useRef(null);
  
  const [lng, setLng] = useState(2.3522219);
  const [lat, setLat] = useState(48.856614);
  const [zoom, setZoom] = useState(2);

  const filterStands = (market, stands) => {
    let filteredStands = stands.filter(stand => stand.market === market.id)
    let standLists = filteredStands.map(st => (
      `<li key=${st.id}>${st.name}</li>`
    ))
    if (filteredStands.length > 0){
      return (
        `<div>
          <p>${filteredStands.length} stands</p>
          <ul style='list-style-type: none;' className='stand-list-map'>
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
    let completeAdress = market.number === null ? `${market.address}, ${market.postcode}, ${market.city}` : `${market.number} ${market.address}, ${market.postcode}, ${market.city}`
    let stands = filterStands(market, props.stands)
    let description = title + img + completeAdress + stands

    return {
      'type': 'Feature',
      'properties': {
        'description': description
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
    
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
        projection: 'globe',
      });
      
      
      map.on('load', () => {
        map.loadImage(
          'https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-market-vegan-and-vegetarian-flaticons-flat-flat-icons.png', // Path to your image here
          (error, image) => {
            if (error) throw error;
            map.addImage('market', image);
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
              '#51bbd6',
              3,
              '#f1f075',
              4,
              '#f28cb1'
              ],
          'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              3,
              30,
              4,
              40
          ]
        }
        });
        

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
      });
         
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
        // paint: {
        // 'circle-color': 'white',
        // 'circle-radius': 10,
        // 'circle-stroke-width': 2,
        // 'circle-stroke-color': '#fff'
        // }
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });        

        map.on('mouseenter', 'unclustered-point', (e) => {
          map.getCanvas().style.cursor = 'pointer';
           
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
           
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
           
          popup.setLngLat(coordinates).setHTML(description).addTo(map);
          });
           
          map.on('mouseleave', 'unclustered-point', () => {
          map.getCanvas().style.cursor = '';
          popup.remove();
          });
      // here              
    })

    map.touchZoomRotate.disableRotation();

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
  
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });
       
    map.on('mouseenter', 'markets', (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';
        
        // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;
        
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
        
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
      
    map.on('mouseleave', 'markets', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });



    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
      })

    return () => map.remove();
  }, [geoJsonData]); 

  return(
      <div className='map-div2'>
          <div ref={mapContainer} className="map-container">
          </div>
      </div>
  )
}

export default Map