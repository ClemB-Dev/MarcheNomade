import 'aframe'
import Prototypes from 'prop-types'

function Sign({x, y, z, l, m, n, id, textValue}) {
    return (
            <a-text
                id={`sign-${id}`}
                width='2.7'
                height='4.8'
                geometry="primitive: plane; width: 2.7ds; height: 4.8;"
                material="shader: flat; color: #cfd4b5"
                text={`wrapCount: 15; align: center; color: black; font-weight: bold; font-weight: larger; value: ${textValue}`}
                position={`${x} ${y} ${z}`}
                rotation={`${l} ${m} ${n}`}
                scale="1 1 1"
            >
            </a-text>
    );
}

Sign.Prototypes = {
    x: Prototypes.number,
    y: Prototypes.number,
    z: Prototypes.number,
    l: Prototypes.number,
    m: Prototypes.number,
    n: Prototypes.number,
    textValue: Prototypes.string,
    id: Prototypes.number
}

export default Sign;