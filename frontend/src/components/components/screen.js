

import 'aframe'


function Screen() {
    return (
            <a-entity
                id="screen"
            >
                <a-box
                    id="screen"
                    position="0 10 -14.75"
                    rotation="0 0 0"
                    width="17"
                    height="10"
                    depth="0.5"
                    color='grey'>
                </a-box>
                <a-video
                    id="video"
                    src="#video"
                    position="0 10 -14.45"
                    rotation="0 0 0"
                    width="16"
                    height="9"
                >
                </a-video>
            </a-entity>
    );
}

export default Screen;