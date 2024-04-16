import React from "react";
import "./Toggle.css";

export default function Toggle =({isEnabled, onToggle, label})=>{
  return(
    <div className="toggle-container">
        {label && <span className="toggle-label">{label}:</span>}
        <label className="toggle-switch">
            <input
                type="checkbox"
                checked={isEnabled}
                onChange={onToggle}
            />
            <span className="slider round"></span>
        </label>
    </div>
  )  
};