import { useState } from "react";
import "./index.css";

const App = () => {
    const [images, setImages] = useState([]);
    const [value, setValue] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const randomOptions = [
        'Based on all the screenshots of the bus booking app, provide testing instructions to check functionality of all elements visible'
    ];

    const random = () => {
        const randomValue = randomOptions[Math.floor(Math.random() * randomOptions.length)];
        setValue(randomValue);
    };

    const uploadImages = async (e) => {
        const files = e.target.files;
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append('file', file));
        setImages(files);

        try {
            const options = {
                method: "POST",
                body: formData
            };
            const response = await fetch('http://localhost:8000/upload', options);
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.error(err);
            setError("Oops! Something has gone south. Course Correction required, Chief!");
        }
    };

    const analyzeImages = async () => {
        if (images.length === 0) {
            setError("Error! No images were found.");
            return;
        }
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({ message: value }),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const response = await fetch('http://localhost:8000/gemini', options);
            const data = await response.text();
            setResponse(data);

            // Scroll to top after setting the response
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error(err);
            setError("Oops! Something has gone south. Course Correction required, Chief!");
        }
    };

    const clear = () => {
        setImages([]);
        setValue("");
        setResponse("");
        setError("");
    };

    return (
        <div className="app">
            <section className="search-section">
                <div className={"image-container"}>
                    {images.length > 0 && Array.from(images).map((image, index) => (
                        <img key={index} className="image" src={URL.createObjectURL(image)} alt={`upload-preview-${index}`} />
                    ))}
                </div>
                <p className="Context">
                    <span>
                        <label htmlFor="files"><strong>Upload Screenshots</strong></label>
                        <input onChange={uploadImages} id="files" accept="image/*" type="file" multiple hidden />
                    </span>
                    to provide test instructions
                </p>
                <p>Provide extra context to really perfect the test instruction
                    <button className="random" onClick={random} disabled={response}>Predetermined context</button>
                </p>
                <div className="input-container">
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        placeholder="Enter additional context"
                    />
                    <button onClick={analyzeImages}>Test Conditions</button>
                    <button onClick={clear}>Clear</button>
                </div>
                <div className="response-container">
                    {error && <p className="error">{error}</p>}
                    <div dangerouslySetInnerHTML={{ __html: response }} />
                </div>
            </section>
        </div>
    );
};

export default App;
