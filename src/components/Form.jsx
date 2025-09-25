import React from 'react'
import { useState, useEffect } from 'react'
import FormData from 'form-data'

const Form = ({ onUploadSuccess, uploadUrl, storageKey }) => {
    const [file, setFile] = useState(null);

    const [userName, setUserName] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());

    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [visbility, setVisibility] = useState('hidden');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userName) {
            setMessage('Please enter Your Name');
            setVisibility("visible");
            return;
        }
        if (!file) {
            setMessage('Please select a file..');
            setVisibility("visible");
            return;
        }
        const form = new FormData();
        form.append('userName', userName);
        form.append('year', year);
        form.append('uploadedFile', file);


        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: form
            })

            const statusData = await response.json();   
            // console.log(statusData);

            if (statusData.success) {
                localStorage.setItem(storageKey, JSON.stringify(statusData.data));
                setMessage(statusData.message);
                setVisibility("visible");

                if (onUploadSuccess) {
                    onUploadSuccess(statusData.data);
                }
            }else{
                 setMessage(statusData.message);
                 setVisibility("visible");
            }



        } catch (error) {
            console.error(error);
            setMessage('Upload error occurred, (only .xlsx files are allowed)');
        }


    }

    const handleReset=(e)=>{
        e.preventDefault();
        setFile(null);
        setUserName('');
        localStorage.removeItem(storageKey);
        onUploadSuccess(null);
    }

    useEffect(() => {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            setUserName(parsedData.userName);

            if (onUploadSuccess) {
                onUploadSuccess(parsedData);
            }
            // You can't restore the file input (browser security),
            // but you can still show a message or preview if needed.
            setVisibility("visible");

        }
    }, []);

    return (
        <div>
            <a href={`/template.xlsx`} className='text-white border hover:bg-blue-500 cursor-pointer px-4 py-1 rounded-sm bg-blue-800 '>
                Download Template
            </a> <p className='text-red-500 mt-2'>for now only .xlsx files are allowed</p>
            <form onSubmit={handleSubmit} className="border border-gray-300 p-6 mt-2 rounded-lg flex flex-col sm:flex-col gap-6 items-center" enctype="multipart/form-data" method="post" >

                <div className="max-w-sm space-y-3 text-center">
                    <input name='name' type="text" className="py-1 sm:py-2 px-4 block w-full bg-gray-100 border border-gray-400 rounded-sm sm:text-sm focus:outline-blue-700 " placeholder="Enter Your Name:" value={userName}
                        onChange={(e) => setUserName(e.target.value)} />

                    <input name='year' type="number" className="py-1 sm:py-2 px-4 block w-full bg-gray-100 border border-gray-400 rounded-sm sm:text-sm focus:outline-blue-700 " placeholder="Enter the year" value={year}
                        onChange={(e) => setYear(e.target.value)} />
                    

                    <input name="uploadedFile" type="file" className="border w-full border-gray-400 p-1 bg-gray-100 rounded-sm" onChange={(e) => { setFile(e.target.files[0]) }} />

                    <div className='flex gap-2 justify-center'>
                    <button type='submit' className="bg-blue-800  hover:bg-blue-700 text-white font-bold py-2 sm:py-1 px-3 border border-blue-700 rounded disabled:cursor-not-allowed active:bg-green-800">
                        Upload file
                    </button>

                    <button onClick={handleReset} className="bg-green-800  hover:bg-green-700 text-white font-bold py-2 sm:py-1 px-3 border border-blue-700 rounded disabled:cursor-not-allowed active:bg-blue-800">
                        Reset
                    </button>
                    </div>


                  
                </div>
            </form>
            <p className='text-green-600 text-md' style={{ visibility: visbility }}>{message}</p>

        </div>

    )
}

export default Form
