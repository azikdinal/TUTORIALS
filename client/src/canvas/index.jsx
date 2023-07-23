import React from 'react';
import {Canvas} from "@react-three/fiber";
import {Center, Environment} from "@react-three/drei";
import CameraRig from "./CameraRig.jsx";
import Backdrop from "./Backdrop.jsx";
import Shirt from "./Shirt.jsx";

const CanvasModel = () => {
    return (
        <Canvas
            shadows
            camera={{position: [0, 0, 0], fov: 25}}
            gl={{preserveDrawingBuffer: true}}
            className='w-full max-w-full h-full transition-all ease-in'
        >
            <ambientLight intensity={0.5}/>
            <Environment preset='sity'/>
            <CameraRig>
                <Backdrop/>
                <Center>
                    <Shirt/>
                </Center>
            </CameraRig>
        </Canvas>
    );
};

export default CanvasModel;