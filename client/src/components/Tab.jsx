import React from 'react';
import {useSnapshot} from "valtio";
import state from "../store/index.js";

const Tab = ({tab, isFilterTab, isActiveTab, handleClick}) => {

    const snap = useSnapshot(state)
    return (
        <div
            key={tab.name}
            className={`tab-btn ${isFilterTab ? 'rounded-full' +
                'glassmorthism' : 'rounded-4'}`}
            onClick={handleClick}
            style={activeStyle}
        >
            <img src={tab.icon} alt={tab.name}
                 className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12' +
                     'object-contain'}`}
            />
        </div>
    );
};

export default Tab;