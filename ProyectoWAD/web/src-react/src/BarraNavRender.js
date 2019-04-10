import React from "react";
import ReactDOM from "react-dom";
import {BarraNav} from "./BarraNav.js"
ReactDOM.render(
  <BarraNav numOpciones='2' Opciones={['CerrarSession' , 'Preguntas']} Vinculos={['Logout' , 'TablaPreguntasProfesor.jsp']} />,
  document.getElementById('barra')
);
 
 