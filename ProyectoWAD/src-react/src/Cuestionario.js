
import React from "react";
import ReactDOM from "react-dom";
import {Multiple} from "./Multiple.js"

//tienes tres modos editar nuevo y ver los cuales se envian como props
export class Cuestionario extends React.Component {
  constructor(props) 
  {
    super(props);
      this.state = {Preguntas: [],i:0};

    this.AgregarMultiple=this.AgregarMultiple.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  AgregarMultiple()
  {
    var aux=this.state.Preguntas;
    aux.push(<Multiple modo="nuevo"/>,);
    this.setState((state) => (

    	{Preguntas: aux, i:this.state.i+1})
    );
    //this.setState({Preguntas: aux, i:this.state.i+1});
    return aux;
  }
  handleSubmit()
  {
    alert("Armado de XML");
    event.preventDefault();
  }
  pedir()
  {
  	var aux=[];
  	for (var i = 0; i < this.state.Preguntas.length; i++) 
  	{
  		aux.push(this.state.Preguntas[i]);
  	}
  	return aux;
  }
  render() 
  {
  	var preg=this.pedir();
    return (
      <div>
       Seleccione la Respuesta Correcta: <br/>
       <button onClick={this.AgregarMultiple}>Agregar Opcion Multiple</button>
       <br/>
       {preg}  
       <input type="submit" value="Finalizar" onClick={this.handleSubmit}/>
      </div>
      
    );
  }
}