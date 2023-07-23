import React from 'react';
import {preview} from "../assets/index.js";

const FormField = ({labelName, name, placeholder, type, value, handleChange, handleSurpriseMe, isSurpriseMe}) => {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2 ">
                <label htmlFor={name}
                       className="block text-sm font-medium text-gray-900">
                    {labelName}
                </label>
                {isSurpriseMe && (
                    <button type="button" onClick={handleSurpriseMe}
                            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black">
                        Surpeise me
                    </button>
                )}
            </div>
            <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={onChange}
                   required
                   className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] block w-full shadow-sm sm:text-sm border'/>
            <div
                className='relative bg-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
                {form.photo ? (
                    <img
                        src={form.photo}
                        alt={form.prompt}
                        className='w-full h-full object-contain'
                    />
                ) : (
                    <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40'/>
                )}
            </div>
        </div>
    );
};

export default FormField;