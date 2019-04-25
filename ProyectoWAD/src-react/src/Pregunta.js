
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
    //valores en caso de ser nuevo
    var preguntas=[];
    var IDMAX=0;
    var idPreg = this.obtenerIDPreg();
    var error="";
    var bien="";
    var intento=1;
    //solicita valores del xml
     if(props.modo!="nuevo")
      {
        preguntas = this.pedirPreguntas(idPreg);
        IDMAX =this.obtenerIDMaxSec(idPreg);
        error = this.pedirmensajeError(idPreg);
        bien = this.pedirmensajeBien(idPreg);
        intento = this.pedirIntentos(idPreg);
      }
      //intentosVer: es usado para el modo ver y poder contar el numero de intentos que ha realizado en usuario
      this.state = {Preguntas: preguntas, idPreg: idPreg ,i:IDMAX, modo:props.modo, nombre:props.nombre, intentos: intento, mError:error, mBien:bien, intentosVer:0};
     //funciones tipos de preguntas
    this.AgregarMultiple=this.AgregarMultiple.bind(this);
    this.AgregarTexto=this.AgregarTexto.bind(this);
    //funciones manejo de datos
    this.handleSubmit=this.handleSubmit.bind(this);
    this.manejadorCambiosTitulo=this.manejadorCambiosTitulo.bind(this);
    this.NuevoTitulo=this.NuevoTitulo.bind(this);
  }
  //----------------------------------------------------------------------------------------------
  //-------------------PETICIONES DE XML PARA OBTENER AREAS------------------------------------
  //----------------------------------------------------------------------------------------------
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
  //obteniendo numero siguiente de secciones
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
  //obtener intento
  pedirIntentos(idPreg)
  {
    var formData = new FormData();
     formData.append("idpregunta" ,idPreg);
    var intentos=0;
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
               var sec=xmlDoc.getElementsByTagName("Pregunta");
               intentos= sec[0].getAttribute("intentos");
          },
          error: function (data)
          {
              console.log(data.toString());
              alert("ERROR en recepcion de IDMAXSEC");
          }
      });
   return intentos;
  }
  //obtener mensaje Bien
  pedirmensajeBien(idPreg)
  {
    var formData = new FormData();
     formData.append("idpregunta" ,idPreg);
    var mensaje="";
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
               var sec=xmlDoc.getElementsByTagName("Pregunta");
               mensaje= sec[0].getAttribute("mensajeBien");
          },
          error: function (data)
          {
              console.log(data.toString());
              alert("ERROR en recepcion de IDMAXSEC");
          }
      });
   return mensaje;
  }
    //obtener mensaje ERROR
  pedirmensajeError(idPreg)
  {
    var formData = new FormData();
     formData.append("idpregunta" ,idPreg);
    var mensaje="";
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
               var sec=xmlDoc.getElementsByTagName("Pregunta");
               mensaje= sec[0].getAttribute("mensajeError");
          },
          error: function (data)
          {
              console.log(data.toString());
              alert("ERROR en recepcion de IDMAXSEC");
          }
      });
   return mensaje;
  }


 //----------------------------------------------------------------------------------------------
  //--------------Funciones de agregado de tipos de preguntas
  //----------------------------------------------------------------------------------------------
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
  //----------------------------------------------------------------------------------------------
  //--------------------Funciones interactuar con usuario-----------------------------------------
  //----------------------------------------------------------------------------------------------
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
    else//si es modo ver se evalua la pregunta
    {
      var cal=0;
      var numPreg=0;
      for (var i = 0; i < this.state.Preguntas.length; i++) 
      {
      	//console.log(this.state.Preguntas[i].key+ "");
      	var aux= this.state.Preguntas[i].key + "";
        if(aux.indexOf("b")==-1&&aux!=null)//para ignorar los botones
        {
          var us= sessionStorage.getItem("RU"+this.state.Preguntas[i].key);
          var res = sessionStorage.getItem("R"+this.state.Preguntas[i].key);
          if(us!=null && res!=null)
          {
          	  //calculo de respuestas correctas
	          numPreg++;
	          if(us==res)
	          {
	          	cal++;
	          }
    	  }

        }
      }
      if(cal/numPreg!=1)//si tuvo errores
      {
      	  	//console.log(this.state.intentos);
      	  	//console.log(this.state.intentosVer);
    	    alert(this.state.mError+"  Te quedan: "+(this.state.intentos - (this.state.intentosVer+1)) + " Intentos"); 
    	    if(this.state.intentos<=(this.state.intentosVer+1))//cuando es el mismo numero de intentos
    	    {
    	    	alert("Se Acabaron tus Intentos");
    	    	//limpiamos la session y redirigimos
    	    	sessionStorage.clear();
      			window.location.replace("TablaPreguntasProfesor.jsp");
    	    }
    	    this.setState((state) => (
    				{intentosVer:this.state.intentosVer+1})
    			); 
      }
      else
      {
      	alert(this.state.mBien);
      	//limpiamos la session y redirigimos
    	sessionStorage.clear();
      	window.location.replace("TablaPreguntasProfesor.jsp");
      }
      //alert("Calificacion= "+cal +"/"+numPreg);
    }

  }
  //arma el arreglo que se renderizara
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
  	if(e.target.name=="pregunta")
    	this.setState({nombre: e.target.value});
    else if(e.target.name=="error")
    	this.setState({mError: e.target.value});
    else if(e.target.name=="intentos")
    	this.setState({intentos: e.target.value});
    else if(e.target.name=="bien")
    	this.setState({mBien: e.target.value});
  }
  //agrega datos generales de la pregunta: titulo, intentos, retroalimentacion
  NuevoTitulo()
  {
    if(this.state.modo=="nuevo")
    {
    	//armado de nodo pregunta conforma al xml del servidor
       var inicial = "<Pregunta id='"+this.state.idPreg+"' texto='"+this.state.nombre+"' mensajeBien='"+this.state.mBien+"' mensajeError='"+this.state.mError+"'  intentos='"+this.state.intentos+"'></Pregunta>";
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
                  alert("Guardado");
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
      var bien = this.state.mBien;
      var mal= this.state.mError;
      var intentos= this.state.intentos;
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
                  //modificando atributos del xml
                  pregunta.getElementsByTagName('Pregunta')[0].setAttribute("texto",nombre);
                  pregunta.getElementsByTagName('Pregunta')[0].setAttribute("mensajeBien",bien);
                  pregunta.getElementsByTagName('Pregunta')[0].setAttribute("mensajeError",mal);
                  pregunta.getElementsByTagName('Pregunta')[0].setAttribute("intentos",intentos);
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR en envio de Titulo");
              }
          });
      //console.log(pregunta);
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
      editar.push(<input type="text" name="pregunta" onChange={this.manejadorCambiosTitulo} value={this.state.nombre} required/>);
      editar.push(<br/>);
      editar.push("Mensaje Si Responde Erroneamente:");
      editar.push(<input type="text" name="error" onChange={this.manejadorCambiosTitulo} value={this.state.mError} required/>);
      editar.push(<br/>);
      editar.push("Mensaje Si Responde Correctamente:");
      editar.push(<input type="text" name="bien" onChange={this.manejadorCambiosTitulo} value={this.state.mBien} required/>);
      editar.push(<br/>);
      editar.push("Intentos:");
      editar.push(<input type="text" name="intentos" onChange={this.manejadorCambiosTitulo} value={this.state.intentos} required/>);
      editar.push(<br/>);
      editar.push(<button onClick={this.NuevoTitulo}>Listo</button>);
      editar.push(<br/>);
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
