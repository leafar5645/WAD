
import React from "react";
import ReactDOM from "react-dom";
import {Multiple} from "./Multiple.js"
import $ from 'jquery'; 

//tienes tres modos editar nuevo y ver los cuales se envian como props
export class Pregunta extends React.Component {
  constructor(props) 
  {
    super(props);
      this.state = {Preguntas: [],i:this.obtenerIDMaxSec(), idPreg: this.obtenerIDPreg(), modo:props.modo, nombre:props.nombre};
      if(props.modo!="nuevo")
        this.pedirPreguntas();
    this.AgregarMultiple=this.AgregarMultiple.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.manejadorCambiosTitulo=this.manejadorCambiosTitulo.bind(this);
    this.NuevoTitulo=this.NuevoTitulo.bind(this);
  }
  //haciendo peticion y obteniendo las secciones
  pedirPreguntas()
  {
     var preg=[];
    var formData = new FormData();
     formData.append("idpregunta" ,this.state.idPreg);
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
                   console.log(xmlDoc);
                   var sec=xmlDoc.getElementsByTagName("Seccion");
                   for (var i = 0; i < sec.length; i++) 
                   {
                     if(sec[i].tipo=="multiple")
                     {
                        preg.push(<Multiple modo="editar" idPreg={this.state.idPreg} id={sec[i].id} key={sec[i].id}/>);  
                     }
                     preg.push(<br/>);
                     preg.push(<button onClick={this.Eliminar.bind(this,sec[i].id)}>Eliminar Seccion</button>);
                   }
              },
              error: function (data)
              {
                  console.log(data.toString());
                  alert("ERROR en recepcion de SECCIONES");
              }
          });
       this.setState({Preguntas: preg});
  }
  //haciendo peticion AJAX para obtener el siguiete ID de pregunta.
  obtenerIDPreg()
  {
    if(this.props.modo=="nuevo")
    {
       $.ajax({
              url: 'UltimaPregunta',
              type: 'Post',
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  console.log(data.toString());
                  return parseInt(data.toString);
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en recepcion de IDPREG");
              }
          });
     }
     else 
     {
      //quitando archivos de session al haber sido llamado el modo editar o ver en TablaPreguntas
       sessionStorage.removeItem('id');
       sessionStorage.removeItem('nombre');
       return this.props.id;
     }
  }
  obtenerIDMaxSec()
  {
      if(this.props.modo=="nuevo")
      {
        return 0;
      }
      else
      {
        var id=0;
       $.ajax({
              url: 'UltimaPregunta',
              type: 'Post',
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  console.log(data.toString());
                   var parser = new DOMParser();
                   var xmlDoc = parser.parseFromString(data.toString(),"text/xml");
                   console.log(xmlDoc);
                   var sec=xmlDoc.getElementsByTagName("Seccion");
                   console.log(sec.length() -1);
                   id= sec.length() -1;

              },
              error: function (data)
              {
                  console.log(data.toString());
                  alert("ERROR en recepcion de IDMAXSEC");
              }
          });
       return id;
      }
  }
  AgregarMultiple()
  {
    var aux=this.state.Preguntas;
    aux.push(<Multiple modo="nuevo" idPreg={this.state.idPreg} id={this.state.i} key={this.state.i}/>,);
    aux.push(<br/>);
    aux.push(<button onClick={this.Eliminar.bind(this,this.state.i)}>Eliminar Seccion</button>);
    this.setState((state) => (
    	{Preguntas: aux, i:this.state.i+1})
    );
    //this.setState({Preguntas: aux, i:this.state.i+1});
    return aux;
  }
  handleSubmit()
  {
    window.location.replace("TablaPreguntasProfesor.jsp");
    event.preventDefault();
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
  	alert("eliminar"+id)
  }
  manejadorCambiosTitulo(e)
  {
    this.setState({nombre: e.target.value});
  }
  NuevoTitulo()
  {
    console.log("Nuevo titulo");
    if(this.state.modo=="nuevo")
    {
       var inicial = "<Pregunta id='"+this.state.idPreg+"' texto='"+this.state.nombre+"' ></Pregunta>";
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(inicial,"text/xml");
      var oSerializer = new XMLSerializer();
      var sXML = oSerializer.serializeToString(xmlDoc);
      var formData = new FormData();
      console.log("XML: "+sXML);
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
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en envio de Titulo");
              }
          });
      this.setState({modo: "editar"});
    }
    else if(this.state.modo=="editar")
    {
      //pedimos la pregunta actual
      var pregunta;
       var formData = new FormData();
     formData.append("idpregunta" ,this.state.idPreg);
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
                  pregunta.getElementsByTagName('Pregunta')[0].texto=this.state.nombre;
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en envio de Titulo");
              }
          });
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
       Nombre de pregunta: <input type="text" name="pregunta" onChange={this.manejadorCambiosTitulo}/>
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