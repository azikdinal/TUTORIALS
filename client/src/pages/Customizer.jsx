import React from 'react';
import {useSnapshot} from "valtio";
import state from "../store/index.js";
import {AnimatePresence} from "framer-motion";
import {slideAnimation} from "../config/motion.js";

const Customizer = () => {
    const snap = useSnapshot(state)
    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div key="custom" className="absolute top-0 left-0 z-10"
                                {...slideAnimation('left')}>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;