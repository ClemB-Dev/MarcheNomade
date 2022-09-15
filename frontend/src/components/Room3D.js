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

const Room3D = (props) => {

    let link = document.createElement('meta');
    link.setAttribute('name', 'apple-mobile-web-app-capable'); 
    link.content = document.location;
    document.getElementsByTagName('head')[0].appendChild(link);

    return (
        <a-body className='virtual-room-body'>
        <a-scene>
            <a-light type="point" color="#f1f4e2" position="0 5 0"></a-light>
            <a-camera position="0 8 13"></a-camera>
            <a-assets>
                <video controls id="video" autoPlay loop={true} src={video} webkit-playsinline="true" playsInline={true}></video>
            </a-assets>
            <Room></Room>
            <Screen></Screen>
            <Shelf></Shelf>
            <Sign x={-14.9} y={7} z={-4} l={0} m={90} n={0} textValue={props.stand.name} id={0}/>
            <Sign x={-14.9} y={8} z={2} l={0} m={90} n={0} textValue="Nos réseaux" id={1}/>
            <Sign x={-14.9} y={7} z={8} l={0} m={90} n={0} textValue="Notre logo" id={2}/>
            <Sign x={14.9} y={7} z={-4} l={0} m={-90} n={0} textValue="Photo 1" id={3}/>
            <Sign x={14.9} y={8} z={2} l={0} m={-90} n={0} textValue="Photo 2!" id={4}/>
            <Sign x={14.9} y={7} z={8} l={0} m={-90} n={0} textValue="Photo 3" id={5}/>
        </a-scene>
        </a-body>
  )
}

export default Room3D
