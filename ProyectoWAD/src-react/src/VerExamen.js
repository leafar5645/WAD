
import React from "react";
import ReactDOM from "react-dom";
import {Cuestionario} from "./Cuestionario.js"

ReactDOM.render(
  <Cuestionario modo="ver" id={sessionStorage.getItem('idExamen')} nombre={sessionStorage.getItem('nombreExamen')}/>,
  document.getElementById('root')
);
