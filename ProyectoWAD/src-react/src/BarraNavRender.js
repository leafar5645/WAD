import React from "react";
import ReactDOM from "react-dom";
import {BarraNav} from "./BarraNav.js";

ReactDOM.render(
  <BarraNav  Vinculos={['CerrarSession' , 'Preguntas' ,'Examenes', 'Inicio']} Opciones={['Logout' , 'TablaPreguntasProfesor.jsp' ,'TablaExamenes.html', 'Home']} />,
  document.getElementById('barra')
);
 
 