import 'aframe'


function Room() {
    return (
        <a-entity
            id="room"
        >
            <a-plane
                id="floor"
                position="0 0 0"
                rotation="270 0 0"
                width="30"
                height="30"
            >
            </a-plane>
            <a-plane
                id="wall-front"
                position="0 10 -15"
                rotation="0 0 0"
                width="30"
                height="20"
            >
            </a-plane>
            <a-plane
                id="wall-left"
                position="-15 10 0"
                rotation="0 90 0"
                width="30"
                height="20"
            >
            </a-plane>
            <a-plane
                id="wall-right"
                position="15 10 0"
                rotation="0 270 0"
                width="30"
                height="20"
            >
            </a-plane>
            <a-plane
                id="wall-back"
                position="0 10 15"
                rotation="0 180 0"
                width="30"
                height="20"
            >
            </a-plane>
            <a-plane
                id="ceiling"
                position="0 20 0"
                rotation="90 00 0"
                width="30"
                height="30"
            >
            </a-plane>
        </a-entity>
    );
}

export default Room