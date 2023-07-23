import React from 'react';
import {useSnapshot} from "valtio";
import state from "../store/index.js";
import {SketchPicker} from "react-color";

const ColorPicker = () => {
    const snap = useSnapshot(state)

    return (
        <div className="absolute left-full ml-3">
            <SketchPicker
                color={snap.color}
                disableAlpha
                presetColors={[
                    '#ccc',
                    "#efbd4e",
                    '#ccc',
                    "#efbd4e",
                    '#ccc',
                    "#efbd4e",
                    '#ccc',
                    "#efbd4e",
                    '#ccc',
                    "#efbd4e",
                    '#ccc',
                    "#efbd4e",
                ]}
                onChange={color => state.color = color.hex}
            />
        </div>
    );
};

export default ColorPicker;