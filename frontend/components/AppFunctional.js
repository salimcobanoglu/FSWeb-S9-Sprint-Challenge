import React, { useState } from "react";

export default function AppFunctional(props) {
  const [currentLocation, setCurrentLocation] = useState([2, 2]);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(0);
  const [emailInput, setEmailInput] = useState("");

  //Email

  function onChange(event) {
    setEmailInput(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    let sonuc = {
      x: currentLocation[0],
      y: currentLocation[1],
      steps: step,
      email: emailInput,
    };
    axios
      .post("http://localhost:9000/api/result", sonuc)
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch(() => {
        console.log("Unprocessable Entity");
      });
  }

  //buton

  function up() {
    setMessage("");
    if (currentLocation[1] > 1) {
      setCurrentLocation([currentLocation[0], currentLocation[1] - 1]);
      setStep(step + 1);
    } else {
      setMessage("YUKARI GİDEMEZSİNİZ");
    }
  }

  function right() {
    setMessage("");
    if (currentLocation[0] < 3) {
      setCurrentLocation([currentLocation[0] + 1, currentLocation[1]]);
      setStep(step + 1);
    } else {
      setMessage("SAĞA GİDEMEZSİNİZ");
    }
  }

  function down() {
    setMessage("");
    if (currentLocation[1] < 3) {
      setCurrentLocation([currentLocation[0], currentLocation[1] + 1]);
      setStep(step + 1);
    } else {
      setMessage("AŞAĞI GİDEMEZSİNİZ");
    }
  }

  function left() {
    setMessage("");
    if (currentLocation[0] > 1) {
      setCurrentLocation([currentLocation[0] - 1, currentLocation[1]]);
      setStep(step + 1);
    } else {
      setMessage("SOLA GİDEMEZSİNİZ");
    }
  }

  function reset() {
    setCurrentLocation([2, 2]);
    setStep(0);
    setMessage("");
  }

  const initialIndex = (currentLocation[1] - 1) * 3 + currentLocation[0] - 1;
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar ({currentLocation.join(", ")})</h3>
        <h3 id="steps">{step} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === initialIndex ? " active" : ""}`}
          >
            {idx === initialIndex ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={left}>
          SOL
        </button>
        <button id="up" onClick={up}>
          YUKARI
        </button>
        <button id="right" onClick={right}>
          SAĞ
        </button>
        <button id="down" onClick={down}>
          AŞAĞI
        </button>
        <button id="reset" onClick={reset}>
          RESET
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="Emailinizi girin"
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
