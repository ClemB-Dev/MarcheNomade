import 'aframe'


function Shelf() {
    return (
        <a-entity id="shelf">
            <a-box
            id="shelf-front"
            position="0 2 -5"
            rotation="0 0 0"
            width="15"
            height="4"
            depth="1"
            color="grey"
            >
            </a-box>
            <a-box
            id="shelf-left"
            position="-7.5 2 -7"
            rotation="0 90 0"
            width="5"
            height="4"
            depth="1"
            color="grey"
            >
            </a-box>
            <a-box
            id="shelf-right"
            position="7.5 2 -7"
            rotation="0 90 0"
            width="5"
            height="4"
            depth="1"
            color="grey"
            >
        </a-box></a-entity>
    );
}

export default Shelf;