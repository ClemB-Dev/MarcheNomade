import 'aframe'


function door() {
    return (
            <a-entity id="door">
                <a-box
                    id="door-back"
                    position="0 5 15"
                    rotation="0 0 0"
                    width="8"
                    height="10"
                    depth="0.1"
                    src="#door-view"
                    >
                </a-box>
                <a-box
                    id="door-left"
                    position="4 5 15"
                    rotation="0 0 0"
                    width="0.2"
                    height="10"
                    depth="0.2"
                    src="#wood-texture"
                >
                </a-box>
                <a-box
                    id="door-right"
                    position="-4 5 15"
                    rotation="0 0 0"
                    width="0.2"
                    height="10"
                    depth="0.2"
                    src="#wood-texture"
                >
                </a-box>
                <a-box
                    id="door-center"
                    position="0 5 15"
                    rotation="0 0 0"
                    width="0.2"
                    height="10"
                    depth="0.2"
                    src="#wood-texture"
                >
                </a-box>
                <a-box
                    id="door-top"
                    position="0 10 15"
                    rotation="0 0 90"
                    width="0.2"
                    height="8.1"
                    depth="0.2"
                    src="#wood-texture"
                    >
                </a-box>
                <a-box
                    id="door-bottom"
                    position="0 0 15"
                    rotation="0 0 90"
                    width="0.2"
                    height="8.2"
                    depth="0.2"
                    src="#wood-texture"
                >
                </a-box>
            </a-entity>
    );
}

export default door;