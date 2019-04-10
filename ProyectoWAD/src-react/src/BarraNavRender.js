import React from "react";
import ReactDOM from "react-dom";
import {BarraNav} from "./BarraNav.js";

ReactDOM.render(
  <BarraNav  Vinculos={['CerrarSession' , 'Preguntas' , 'Inicio']} Opciones={['Logout' , 'TablaPreguntasProfesor.jsp' , 'Profesor.jsp']} />,
  document.getElementById('barra')
);
 
 