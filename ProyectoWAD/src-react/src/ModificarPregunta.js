
import React from "react";
import ReactDOM from "react-dom";
import {Pregunta} from "./Pregunta.js"

ReactDOM.render(
  <Pregunta modo="editar" id={sessionStorage.getItem('id')} nombre={sessionStorage.getItem('nombre')}/>,
  document.getElementById('root')
);
