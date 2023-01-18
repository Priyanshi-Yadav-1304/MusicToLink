import React from "react";
import './Css/Toggle.css'
const Toggle = () => {
  return (
    <label class="switch">
      <input type="checkbox" />
      <span class="slider round"></span>
    </label>
  );
};

export default Toggle;
