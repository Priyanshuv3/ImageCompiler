import "./App.css";
import React, { useState } from "react";
import Compiler from "./Compiler";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  function convert() {
    const data = new FormData();
    data.append("srcImg", file, file.name);
    data.append("Session", "string");

    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": "5703d18957msh2cc496b8a8f75dcp10fb0bjsn2ebe615eda58",
        "X-RapidAPI-Host": "pen-to-print-handwriting-ocr.p.rapidapi.com",
      },
      body: data,
    };

    fetch(
      "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setText(response.value);
        console.log("I am in convert function", text);
      })
      .catch((err) => console.error(err));
  }

  function handleFileInputChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }
  return (
    <>
      <div className="head">
        <header className="header">Image Compiler</header>
      </div>
      
      <div className="body">
        <div className="container">
            <label htmlFor="file-input">Choose a file:</label>
            <input
              id="file-input"
              type="file" accept="image/*" 
              onChange={handleFileInputChange}
            />
            {file && <p>Selected file: {file.name}</p>}
            <button onClick={convert}>Convert</button>
          
        </div>
      </div>
      <div className="compiler">
        <Compiler test={text} />
      </div>
    </>
  );
}

export default App;
