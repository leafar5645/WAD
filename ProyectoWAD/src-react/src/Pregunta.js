
import React from "react";
import ReactDOM from "react-dom";
import {Multiple} from "./Multiple.js"
import {Texto} from "./Texto.js"
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
     //funciones tipos de preguntas
    this.AgregarMultiple=this.AgregarMultiple.bind(this);
    this.AgregarTexto=this.AgregarTexto.bind(this);
    //funciones manejo de datos
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
         //console.log(sec[i].getAttribute("tipo"));
         if(sec[i].getAttribute("tipo")=="multiple")
         {
            preg.push(<Multiple modo={this.props.modo} idPreg={idPreg} id={sec[i].id} key={sec[i].id}/>);  
         }
         else if(sec[i].getAttribute("tipo")=="texto")
         {
            preg.push(<Texto modo={this.props.modo} idPreg={idPreg} id={sec[i].id} key={sec[i].id}/>);  
         }
         preg.push(<br/>);
         if(this.props.modo!="ver")
            preg.push(<button onClick={this.Eliminar.bind(this,sec[i].id)} key={"b"+sec[i].id}>Eliminar Seccion</button>);
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
  //--------------Funciones de agregado de tipos de preguntas
  AgregarMultiple()
  {
    var aux=this.state.Preguntas;
    aux.push(<Multiple modo="nuevo" idPreg={this.state.idPreg} id={this.state.i} key={this.state.i}/>,);
    aux.push(<br/>);
    aux.push(<button onClick={this.Eliminar.bind(this,this.state.i)} key={"b"+this.state.i}>Eliminar Seccion</button>);
    aux.push(<br/>);
    aux.push(<br/>);
    this.setState((state) => (
    	{Preguntas: aux, i:this.state.i+1})
    );
    //this.setState({Preguntas: aux, i:this.state.i+1});
    return aux;
  }
  AgregarTexto()
  {
    var aux=this.state.Preguntas;
    aux.push(<Texto modo="nuevo" idPreg={this.state.idPreg} id={this.state.i} key={this.state.i}/>,);
    aux.push(<br/>);
    aux.push(<button onClick={this.Eliminar.bind(this,this.state.i)} key={"b"+this.state.i}>Eliminar Seccion</button>);
    aux.push(<br/>);
    aux.push(<br/>);
    this.setState((state) => (
      {Preguntas: aux, i:this.state.i+1})
    );
    //this.setState({Preguntas: aux, i:this.state.i+1});
    return aux;
  }
  //para sali de la pantalla.
  handleSubmit()
  {
    event.preventDefault();
    if(this.props.modo!="ver")
    {
      if(confirm("¿Esta seguro de finalizar? Se perderan los cambio que no esten guardados."))
      {
        window.location.replace("TablaPreguntasProfesor.jsp");
      }
    }
    else
      window.location.replace("TablaPreguntasProfesor.jsp");

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
        aux.push(this.state.Preguntas[i]);
        //console.log(aux[i]);
      }
      return aux;
    }
  }
  Eliminar(id)
  {
    if(confirm("¿Esta Seguro de Eliminar Esta Seccion?"))
    {
      var formData = new FormData();
      formData.append("idpregunta" ,this.state.idPreg);
     formData.append("idseccion" ,id);
     var aux=this.state.Preguntas;
       $.ajax({
              url: "EliminarSeccion",
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  console.log(data.toString());
                  if(data.toString()=="listo")
                  {
                    for (var i = 0; i < aux.length; i++) 
                    {
                      console.log(aux[i]);
                      if(aux[i].key==id||aux[i].key=="b"+id)
                      {
                        console.log("----entro: "+aux[i]);
                        aux.splice(i,1);
                        i--;
                      }
                    }
                    alert("Seccion eliminada");
                  }
                  else
                    alert("ERROR en Eliminacion");
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en peticion eliminacion Seccion");
              }
          });
       this.setState({Preguntas: aux});
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
    var editar=[];
    if(this.state.modo!="ver")
    {
      editar.push("Nombre de pregunta:");
      editar.push(<input type="text" name="pregunta" onChange={this.manejadorCambiosTitulo} value={this.state.nombre}/>);
      editar.push(<button onClick={this.NuevoTitulo}>Listo</button>);
      editar.push(<br/>);
      //botones para agregar tipos de preguntas
      editar.push(<button onClick={this.AgregarMultiple}>Agregar Opcion Multiple</button>);
      editar.push(<button onClick={this.AgregarTexto}>Agregar Texto Plano</button>);
    }
    else
    {
      editar.push(<h1>{this.state.nombre}</h1>);
    }
    return (
      <div>
       {editar}
       <br/>
       {preg}  
       <input type="submit" value="Finalizar" onClick={this.handleSubmit}/>
      </div>
      
    );
  }
}
