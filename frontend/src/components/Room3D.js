import 'aframe';
import React from 'react';
// Components
import Sign from './components/signs'
import Shelf from './components/shelf'
import Door from './components/door'
import Room from './components/room'
import Screen from './components/screen'
// Medias
import video from '../medias/video_test.mp4'
import { useNavigate } from 'react-router-dom';


const Room3D = (props) => {
    const navigate = useNavigate();
    let link = document.createElement('meta');
    link.setAttribute('name', 'apple-mobile-web-app-capable'); 
    link.content = document.location;
    document.getElementsByTagName('head')[0].appendChild(link);
    console.log(typeof(props.stand.opening_days))
    let opening_days
    if(typeof(props.stand.opening_days) === 'string'){
        opening_days = props.stand.opening_days
    } else if (typeof(props.stand.opening_days) === 'object') {
        opening_days =  props.stand.opening_days.join(', ') 
    } else {
        opening_days = 'non définis'
    }
    return (
        <a-body className='virtual-room-body'>
        <a-scene>
            <a-light type="point" color="#f1f4e2" position="0 5 0"></a-light>
            <a-camera position="0 8 13"></a-camera>
            <a-assets>
                <video controls id="video" autoPlay loop={true} src={video} webkit-playsinline="true" playsInline={true}></video>
                if(props.stand.photo){
                <img id="logo" src={`http://localhost:8000${props.stand.photo}`}></img>
            }
            </a-assets>
            <Room></Room>
            <Screen></Screen>
            <Shelf></Shelf>
            <Sign x={-14.9} y={7} z={-4} l={0} m={90} n={0} textValue={props.stand.name} id={0}/>
            {props.stand.opening_days
            ? <Sign x={-14.9} y={8} z={2} l={0} m={90} n={0} textValue={`Jours d'ouverture:\n\n${opening_days}`} id={1}/>
            : <Sign x={-14.9} y={8} z={2} l={0} m={90} n={0} textValue={`Jours d'ouverture: non défini`} id={1}/>
            }
            {props.stand.photo
                ? <a-image link="href: http://localhost:8000" scale= "3 3 3" src={`http://localhost:8000${props.stand.photo}`} position="-14.9 7 8" rotation="0 90 0"></a-image>
                : <a-text value="" position="-14.9 7 8" rotation="0 90 0"></a-text>
            }
            {props.stand.opening_hour && props.stand.closing_hour
            ? <Sign x={14.9} y={7} z={-4}
                    l={0} m={-90} n={0}
                    textValue={`Horaires\n\nOuverture: ${props.stand.opening_hour}\n Fermeture: ${props.stand.closing_hour}`}
                    id={1}/>
            : <Sign x={14.9} y={7} z={-4} l={0} m={90} n={0} textValue={`Horaires: non définis`} id={1}/>
            }
            {props.stand.description 
            ? <Sign x={14.9} y={8} z={2} l={0} m={-90} n={0} textValue={props.stand.description} id={4}/>
            : <Sign x={14.9} y={8} z={2} l={0} m={-90} n={0} textValue='Stand' id={4}/>
            }
            {/* <Sign x={14.9} y={7} z={8} l={0} m={-90} n={0} textValue="Photo 3" id={5}/> */}
        </a-scene>
        </a-body>
  )
}

export default Room3D
