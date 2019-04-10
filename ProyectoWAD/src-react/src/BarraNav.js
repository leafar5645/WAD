import React from "react";
export class BarraNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getBarra()
  {
	  
	  var barra=[];
	  //var entero=parseInt(this.props.numOpciones,10);
   for (var i = 0; i < this.props.Opciones.length ; i++)
   {
	   const option=<li><a href={this.props.Opciones[i]}>{this.props.Vinculos[i]}</a></li>;
		barra.push(option);
   }
	return barra;
		
  }
 render() {
    return (
      <ul>        
         {this.getBarra()} 
      </ul>
      
    );
 }	
}