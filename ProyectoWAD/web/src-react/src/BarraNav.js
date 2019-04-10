import React from "react";
export class BarraNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getBarra()
  {
	  console.log("hola");
	  var barra=[];
	  barra.push(<ul>);
	  var entero=parseInt(this.props.numOpciones,10);
   for (var i = 0; i < entero ; i++)
   {
	   const option=<li><a href={this.props.Opciones[i]}>{this.props.Vinculos[i]}</a></li>);
		barra.push(option);
   }
		barra.push(</ul>);
  }
 render() {
    return (
      <div>        
         {this.getBarra()} 
      </div>
      
    );
 }	
}