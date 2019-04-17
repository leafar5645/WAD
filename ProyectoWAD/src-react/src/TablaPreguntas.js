import React from "react";
export class TablaPreguntas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Nombres: this.obtenerNombres(), ID: this.obtenerID()};
    this.Ver = this.Ver.bind(this);
    this.Modificar = this.Modificar.bind(this);
    this.Eliminar = this.Eliminar.bind(this);
    
  }
  
  //funcion de AJAX que genere el arreglo con los nombres
  obtenerNombres()
  {
    var nombres=["pregunta1","pregunta2","pregunta3"];
    return nombres;
  }
  //funcion de AJAx que regrese los ID
   obtenerID()
  {
    var nombres=["ID1","ID2","ID3"];
    return nombres;
  }
  generarTabla()
  {
    var tabla=[];
    tabla.push(<th>Nombre de Pregunta</th>);
    tabla.push(<th>Id Pregunta</th>);
    for (var i = 0; i < this.state.Nombres.length; i++) 
    {
      const fila=<tr key={this.state.ID[i]}>
              <td key='0'>{this.state.Nombres[i]}</td>
              <td key='1'>{this.state.ID[i]}</td>
              <td key='2'><button onClick={this.Eliminar.bind(this,this.state.ID[i])}>Eliminar Pregunta</button></td>
              <td key='3'><button onClick={this.Modificar.bind(this,this.state.ID[i])}>Midificar Pregunta</button></td>
              <td key='4'><button onClick={this.Ver.bind(this,this.state.ID[i])}>Ver Pregunta</button></td>
              
              </tr>;
      tabla.push(fila);
    }
    return tabla;
  }
  Ver(id )
  {
    alert("VER: "+ id);
  }
  Modificar(id)
  {
    alert("Modificar: "+id);
  }
  Eliminar(id)
  {
    alert("Eliminar: "+id);
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <table border='1'> {this.generarTabla()} </table>
       <button onClick={function(e){window.location.replace("Cuestionario.html")}}>Nueva Pregunta</button>
      </div>
      
    );
  }
}