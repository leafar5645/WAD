
import React from "react";
import ReactDOM from "react-dom";
import {Cuestionario} from "./Cuestionario.js"

ReactDOM.render(
  <Cuestionario modo="editar" id={sessionStorage.getItem('idExamen')} nombre={sessionStorage.getItem('nombreExamen')}/>,
  document.getElementById('root')
);
