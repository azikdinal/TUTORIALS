import {useSnapshot} from "valtio";
import {AnimatePresence, motion} from "framer-motion";
import state from "../store/index.js";
import {headContainerAnimation, headTextAnimation, slideAnimation} from "../config/motion.js";
import CustomButton from "../components/CustomButton.jsx";

const Home = () => {
    const snap = useSnapshot(state)

    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.div className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img src="./threejs.png" alt="logo" className="w-8 h-8 object-contain"/>
                    </motion.header>

                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                Let's <br className="xl:block hidden"/> DO IT
                            </h1>
                        </motion.div>
                        <motion.div {...headTextAnimation} className=" flex flex-col gap">
                            <p className="max-w-md font-normal text-gray-600 text-base">
                                Create your unique and exclusive shirt with our brand-new 3D customization
                                tool. <strong>
                                Unleash your imagination
                            </strong> {" "} and define your own style.
                            </p>

                            <CustomButton
                                type="filled"
                                title="Customise It"
                                handleClick={() => state.intro = false}
                                customStyles='w-fit px-4 py-2.5 font-bold'
                            />
                        </motion.div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Home;