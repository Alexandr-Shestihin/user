import React from "react";
import "./SubmitButton.css";

const SubmitButton = ({ buttonText, disabled, clickFunction }) => {
   return (
      <div className="submit-button-wrapper" onClick={(e) => clickFunction(e)}>
         {disabled ? (
            <button className="submit-button">{buttonText}</button>
         ) : (
            <button className="submit-button" disabled>
               {buttonText}
            </button>
         )}
      </div>
   );
};

export default SubmitButton;
