import React, {useState} from 'react';
import {useSnapshot} from "valtio";
import state from "../store/index.js";
import {AnimatePresence} from "framer-motion";
import {fadeAnimation, slideAnimation} from "../config/motion.js";
import {DecalTypes, EditorTabs, FilterTabs} from "../config/constants.js";
import Tab from "../components/Tab.jsx";
import {AIPicker, ColorPicker, CustomButton, FilePicker} from "../components/index.js";

const Customizer = () => {
    const snap = useSnapshot(state)

    const [file, setFile] = useState('')
    const [prompt, setPrompt] = useState('')
    const [generatingImg, setGeneratingImg] = useState(false)

    const [activeEditorTab, setActiveEditorTab] = useState('')
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false
    })


    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker/>
            case 'filePicker':
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case 'aipicker':
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                />
            default:
                return null;
        }
    }

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type]
        state[decalType.stateProperty] = result

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    const handleSubmit = async type => {
        if (!prompt) return alert("Please enter a prompt")

        try {
            setGeneratingImg(true)
            const response = await fetch('http://localhost:8080/api/v1/dalle', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                })
            })

            const data = await response.json()

            handleDecals(type, `data:image/png;base64, ${data.photo}`)
        } catch (e) {
            alert(e)
        } finally {
            setGeneratingImg(false)
            setActiveEditorTab("")
        }
    }

    const handleActiveFilterTab = tabName => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName]
                break
            case 'stylishShirt':
                state.isFulltexture = !activeFilterTab[tabName]
            default:
                state.isFulltexture = true
                state.isLogoTexture = false
                break
        }

        setActiveFilterTab(prevState => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = type => {
        reader(file)
            .then(result => {
                handleDecals(type, result)
                setActiveEditorTab("")
            })
    }

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div key="custom" className="absolute top-0 left-0 z-10"
                                {...slideAnimation('left')}>
                        <div className='flex items-center min-h-screen'>
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map(tab => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() => setActiveEditorTab(tab.name)}
                                    />
                                ))}
                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                        <CustomButton
                            type='filled'
                            title='Go back'
                            handleClick={() => state.intro = true}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>

                    <motion.div
                        className="filtertabs-container"
                        {...slideAnimation('up')}
                    >
                        {FilterTabs.map(tab => (
                            <Tab
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                            />
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;