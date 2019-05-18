import React from "react";
import $ from 'jquery'; 
export class TablaExamenes extends React.Component {
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
    var nombres=[];
    $.ajax({
              url: 'MisExamenes',
              type: 'Post',
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  //console.log(data.toString());
                  if(data.toString()!="@_VACIO_@")
                  {
                    var aux= data.toString().split("@");
                    for (var i = 0; i < aux.length; i++) {
                      nombres[i]=aux[i].split(")")[1];
                    }
                  }
              },
              error: function (data) {
                  console.log(data.toString());
                  nombres=["Ejemplo1","Ejemplo2"];
                  alert("ERROR en Obtencion de Nombres");
              }
          });
    
    return nombres;
  }
  //funcion de AJAx que regrese los ID
  obtenerID()
  {
    var nombres=[];
    $.ajax({
              url: 'MisExamenes',
              type: 'Post',
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  //console.log(data.toString());
                  var aux= data.toString().split("@");
                    for (var i = 0; i < aux.length; i++) {
                      nombres[i]=aux[i].split(")")[0];
                    }
              },
              error: function (data) {
                  console.log(data.toString());
                  nombres=["ID1","ID2"];
                  alert("ERROR en Obtencion de IDS");
              }
          });
    return nombres;
  }
  generarTabla()
  {
    var tabla=[];
    tabla.push(<th>Nombre de Examen</th>);
    tabla.push(<th>Id Examen</th>);
    for (var i = 0; i < this.state.Nombres.length; i++) 
    {
      const fila=<tr key={this.state.ID[i]}>
      <td key='0'>{this.state.Nombres[i]}</td>
      <td key='1'>{this.state.ID[i]}</td>
      <td key='2'><button onClick={this.Eliminar.bind(this,this.state.ID[i],this.state.Nombres[i])}>Eliminar Pregunta</button></td>
      <td key='3'><button onClick={this.Modificar.bind(this,this.state.ID[i],this.state.Nombres[i])}>Modificar Pregunta</button></td>
      <td key='4'><button onClick={this.Ver.bind(this,this.state.ID[i],this.state.Nombres[i])}>Ver Pregunta</button></td>
      </tr>;
      tabla.push(fila);
    }
    return tabla;
  }
  Ver(id,nombre)
  {
    sessionStorage.setItem('idExamen', id);
    sessionStorage.setItem('nombreExamen', nombre);
    window.location.replace("VerExamen.html");
  }
  Modificar(id,nombre)
  {
    sessionStorage.setItem('idExamen', id);
    sessionStorage.setItem('nombreExamen', nombre);
    window.location.replace("ModificarExamen.html");
  }
  Eliminar(id,nombre)
  {
    if(confirm("¿Esta Seguro de Eliminar Esta Pregunta?"))
    {
       var formData = new FormData();
     formData.append("Examen" ,id);
      $.ajax({
              url: 'EliminarExamen',
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                 window.location.replace("TablaExamenesProfesor.jsp");
              },
              error: function (data) {
                  
                  alert("ERROR Eliminacion");
              }
          });
    }
  }
  render() {
    return (
      <div>
      <table border='1'> {this.generarTabla()} </table>
      <button onClick={function(e){window.location.replace("NuevoCuestionario.html")}}>Nuevo Examen</button>
      </div>
      
      );
  }
}