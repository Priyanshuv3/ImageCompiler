import "./App.css";
import Loader from "./Components/loader.js";
import React, { useState } from "react";
import Compiler from "./Compiler";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputApi, setInputApi] = useState("");
  const [Api, setApi] = useState(localStorage.getItem("Api"));


  function convert() {
    setLoading(true);
    const data = new FormData();
    data.append("srcImg", file, file.name);
    data.append("Session", "string");

    const options = {
      method: "POST",
      headers: {
        "X-RapidAPI-Key":localStorage.getItem("Api"),
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
        localStorage.setItem("input", response.value);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  function handleFileInputChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }
  function handleMessage(messageFromChild) {
    console.log("Message passed to loader ==>", messageFromChild);
    setLoading(messageFromChild);

    console.log("now loading is==>", loading);
  }

  function handleApi() {
    localStorage.setItem("Api", inputApi);
    setApi(true);

  }
  function changeApi(event) {
    setInputApi(event.target.value);
  }
  function changeApi2() {
    setApi(false);
  }

  return (
    <>
      {loading && <Loader />}
      <div className="head">
        <header className="header">Image Compiler</header>
      </div>

      <div className="body">
        <div className="container">
          {Api ? (
            <div className="cont1">
              <h4>If convert not work <button onClick={changeApi2}>Change Api</button></h4>
              
              
            <div className="cont">
              <label htmlFor="file-input">Choose a file:</label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                />
              {file && <p>Selected file: {file.name}</p>}
              <button onClick={convert}>Convert</button>
            </div>
            </div>
          ) : (
            <div>
              <h5>
                Steps to use for free<br></br>
                <p>
                  Subscribe "Basic $0.00/month" --» Go To API Documentation --»
                  Copy your Api key "X-RapidAPI-Key"
                </p>
              </h5>
              <div className="cont">
                <button>
                  <a
                    href="https://rapidapi.com/serendi/api/pen-to-print-handwriting-ocr/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Api
                  </a>
                </button>

                <input
                  id="api-input"
                  type="text"
                  placeholder="Paste Api Here"
                  onChange={changeApi}
                />
                <button onClick={handleApi}>Submit</button>
              </div>
              <h5>For Testing Try This Api✔ ==» cca4194e0bmshc2b0f63b87b4ee7p1b8c6ejsna2c4669e1be0 </h5>
            </div>
          )}
        </div>
      </div>
      <div className="compiler">
        <Compiler onMessage={handleMessage} />
      </div>
    </>
  );
}

export default App;
