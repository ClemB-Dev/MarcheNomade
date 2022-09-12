import React, { useState, useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import '../css/map.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWItZGV2IiwiYSI6ImNsN3Vqd3VrNzAyaWIzd21nOWZld2VzOW0ifQ.HHUy82xozPgv0hbHWLxXEg'

function Map(props) {
  const mapContainer = useRef(null);
  
  const [lng, setLng] = useState(2.3522219);
  const [lat, setLat] = useState(48.856614);
  const [zoom, setZoom] = useState(2);

  let geoJsonData =  {
    'type': 'FeatureCollection',
    'features': []}

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };

  props.markets?.map(market => {
    var completeAdress = market.number === null ? `${market.address}, ${market.postcode}, ${market.city}` : `${market.number} ${market.address}, ${market.postcode}, ${market.city}`
    var description =
      `<h4 className='popup-market-name'>${market.name}</h4> 
      <p className='popup-market-address'>${completeAdress}</p>`
    geoJsonData.features.push({
      'type': 'Feature',
      'properties': {
          'description': description
          },
      'geometry': {
          'type': 'Point',
          'coordinates': [market.latitude, market.longitude]
          }
    })
  })

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
      projection: 'globe',
    });
    
    map.on('load', () => {
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
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
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
        type: 'circle',
        source: 'markets',
        filter: ['!', ['has', 'point_count']],
        paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
        }
      });

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
                  
    })

    //   Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
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