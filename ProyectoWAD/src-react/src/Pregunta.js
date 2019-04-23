
import React from "react";
import ReactDOM from "react-dom";
import {Multiple} from "./Multiple.js"
import $ from 'jquery'; 

//tienes tres modos editar nuevo y ver los cuales se envian como props
export class Pregunta extends React.Component {
  constructor(props) 
  {
    super(props);
    var preguntas=[];
    var IDMAX=0;
    var idPreg = this.obtenerIDPreg();
     if(props.modo!="nuevo")
      {
        preguntas = this.pedirPreguntas(idPreg);
        IDMAX =this.obtenerIDMaxSec(idPreg);
      }
      this.state = {Preguntas: preguntas, idPreg: idPreg ,i:IDMAX, modo:props.modo, nombre:props.nombre};
     
    this.AgregarMultiple=this.AgregarMultiple.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.manejadorCambiosTitulo=this.manejadorCambiosTitulo.bind(this);
    this.NuevoTitulo=this.NuevoTitulo.bind(this);
  }
  //haciendo peticion y obteniendo las secciones
  pedirPreguntas( idPreg)
  {
     var preg=[];
    var formData = new FormData();
    var sec;
     formData.append("idpregunta" ,idPreg);
       $.ajax({
              url: 'DarPregunta',
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                   var parser = new DOMParser();
                   var xmlDoc = parser.parseFromString(data.toString(),"text/xml");

                   sec=xmlDoc.getElementsByTagName("Seccion");
                   
              },
              error: function (data)
              {
                  alert("ERROR en recepcion de SECCIONES");
              }
          });

       for (var i = 0; i < sec.length; i++) 
       {

         if(sec[i].tipo=="multiple");
         {
            preg.push(<Multiple modo="editar" idPreg={idPreg} id={sec[i].id} key={sec[i].id}/>);  
         }
         preg.push(<br/>);
         if(this.props.modo!="ver")
            preg.push(<button onClick={this.Eliminar.bind(this,sec[i].id)}>Eliminar Seccion</button>);
       }
       return preg;
  }
  //haciendo peticion AJAX para obtener el siguiete ID de pregunta.
  obtenerIDPreg()
  {
    if(this.props.modo=="nuevo")
    {
      var result;
       $.ajax({
              url: 'UltimaPregunta',
              type: 'Post',
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  result= data.toString();
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en recepcion de IDPREG");
              }
          });
       return result;
     }
     else 
     {
      //quitando archivos de session al haber sido llamado el modo editar o ver en TablaPreguntas
       sessionStorage.removeItem('id');
       sessionStorage.removeItem('nombre');
       return this.props.id;
     }
  }
  obtenerIDMaxSec(idPreg)
  {
    var formData = new FormData();
     formData.append("idpregunta" ,idPreg);
    var id=0;
   $.ajax({
          url: 'DarPregunta',
          type: 'Post',
          data: formData,
          async:false,
          processData: false, // tell jQuery not to process the data
          contentType: false, // tell jQuery not to set contentType
          success: function (data) {

               var parser = new DOMParser();
               var xmlDoc = parser.parseFromString(data.toString(),"text/xml");
               var sec=xmlDoc.getElementsByTagName("Seccion");
               id= sec.length;
          },
          error: function (data)
          {
              console.log(data.toString());
              alert("ERROR en recepcion de IDMAXSEC");
          }
      });
   return id;
  }
  AgregarMultiple()
  {
    var aux=this.state.Preguntas;
    aux.push(<Multiple modo="nuevo" idPreg={this.state.idPreg} id={this.state.i} key={this.state.i}/>,);
    aux.push(<br/>);
    aux.push(<button onClick={this.Eliminar.bind(this,this.state.i)}>Eliminar Seccion</button>);
    aux.push(<br/>);
    aux.push(<br/>);
    this.setState((state) => (
    	{Preguntas: aux, i:this.state.i+1})
    );
    //this.setState({Preguntas: aux, i:this.state.i+1});
    return aux;
  }
  handleSubmit()
  {
    event.preventDefault();
    if(confirm("¿Esta seguro de finalizar? Se perderan los cambio que no esten guardados."))
    {
      window.location.replace("TablaPreguntasProfesor.jsp");
    }
  }
  pedir()
  {
    if(this.state.modo!="ver")
    {
    	var aux=[];
    	for (var i = 0; i < this.state.Preguntas.length; i++) 
    	{
    		aux.push(this.state.Preguntas[i]);
    	}
    	return aux;
    }
    else//en caso de que solo queremos "ver" todos los modos se cambian a ver
    {
      var aux=[];
      for (var i = 0; i < this.state.Preguntas.length; i++) 
      {
        aux.push(this.state.Preguntas[i].modo="ver");
      }
      return aux;
    }
  }
  Eliminar(id)
  {
    if(confirm("¿Esta Seguro de Eliminar Esta Pregunta?"))
    {
      formData.append("idpregunta" ,this.props.idPreg);
      /*
     formData.append("seccion" ,sXML);
       $.ajax({
              url: urlConsulta,
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  console.log(data.toString());
                  if(data.toString()=="listo")
                    alert("Guardado");
                  else
                    alert("ERROR en respuesta");
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en peticion");
              }
          });
          */

          alert("Seccion eliminada");
     }
  	
  }
  manejadorCambiosTitulo(e)
  {
    this.setState({nombre: e.target.value});
  }
  NuevoTitulo()
  {
    if(this.state.modo=="nuevo")
    {
       var inicial = "<Pregunta id='"+this.state.idPreg+"' texto='"+this.state.nombre+"' ></Pregunta>";
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(inicial,"text/xml");
      var oSerializer = new XMLSerializer();
      var sXML = oSerializer.serializeToString(xmlDoc);
      var formData = new FormData();
     formData.append("pregunta" ,sXML);
      $.ajax({
              url: 'CrearPregunta',
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  if(data.toString()!="listo")
                    alert("ERROR en envio de Titulo");
                  alert("Nuevo titulo guardado");
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en envio de Titulo");
              }
          });
      this.setState({modo: "editar"});
    }
    else
    {
      //pedimos la pregunta actual
      var pregunta;
       var formData = new FormData();
     formData.append("idpregunta" ,this.state.idPreg);
     var nombre=this.state.nombre;
      $.ajax({
              url: 'DarPregunta',
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                   var parser = new DOMParser();
                  pregunta = parser.parseFromString(data.toString(),"text/xml");
                  pregunta.getElementsByTagName('Pregunta')[0].setAttribute("texto",nombre);
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en envio de Titulo");
              }
          });
      console.log(pregunta);
      var oSerializer = new XMLSerializer();
      var sXML = oSerializer.serializeToString(pregunta);
      var formData = new FormData();

     formData.append("pregunta" ,sXML);
      $.ajax({
              url: 'EditarPregunta',
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  if(data.toString()!="listo")
                    alert("ERROR en envio de Titulo");
                  alert("Nuevo titulo guardado");
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en envio de Titulo");
              }
          });
    }
  }
  render() 
  {
  	var preg=this.pedir();
    return (
      <div>
       Nombre de pregunta: <input type="text" name="pregunta" onChange={this.manejadorCambiosTitulo} value={this.state.nombre}/>
        <button onClick={this.NuevoTitulo}>Listo</button>
       <br/>
       <button onClick={this.AgregarMultiple}>Agregar Opcion Multiple</button>
       <br/>
       {preg}  
       <input type="submit" value="Finalizar" onClick={this.handleSubmit}/>
      </div>
      
    );
  }
}
