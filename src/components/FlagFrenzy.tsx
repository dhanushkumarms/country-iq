import React from "react";

const FlagFrenzy: React.FC = () => {
  return (
    <div>
      <h2>🌍 Flag Frenzy</h2>
      <p>Guess the country based on the flag!</p>
      <img
        src="https://flagcdn.com/w320/in.png"
        alt="Flag"
        style={{ width: "150px", margin: "10px auto" }}
      />
      <div>
        <button>India</button>
        <button>Italy</button>
        <button>Ireland</button>
        <button>Indonesia</button>
      </div>
    </div>
  );
};

export default FlagFrenzy;
