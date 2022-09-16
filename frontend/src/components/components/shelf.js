import 'aframe'


function Shelf() {
    return (
        <a-entity id="shelf">
            <a-box
            id="shelf-front"
            position="0 4 -5.5"
            rotation="90 0 0"
            width="17"
            height="5"
            depth="0.3"
            color="grey"
            >
            </a-box>
            <a-cylinder
            id="shelf-foot-1"
            position="7.5 2 -7"
            rotation="0 90 0"
            width="5"
            height="4"
            radius="0.25"
            color="grey"
            >
            </a-cylinder>
            <a-cylinder
            id="shelf-foot-2"
            position="7.5 2 -4"
            rotation="0 90 0"
            width="5"
            height="4"
            radius="0.25"
            color="grey"
            >
            </a-cylinder>
            <a-cylinder
            id="shelf-foot-3"
            position="-7.5 2 -7"
            rotation="0 90 0"
            width="5"
            height="4"
            radius="0.25"
            color="grey"
            >
            </a-cylinder>
            <a-cylinder
            id="shelf-foot-4"
            position="-7.5 2 -4"
            rotation="0 90 0"
            width="5"
            height="4"
            radius="0.25"
            color="grey"
            >
            </a-cylinder>
        </a-entity>
    );
}

export default Shelf;