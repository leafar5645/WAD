
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
    var idCuestionario = this.obtenerIDCuestionario();
    var indiceActual = 0;
    //solicita valores del xml
     if(props.modo!="nuevo")
      {
        preguntas = this.pedirPreguntas(idCuestionario);
      }
      //intentosVer: es usado para el modo ver y poder contar el numero de intentos que ha realizado en usuario
      this.state = {Preguntas: preguntas, idCuestionario: idCuestionario ,indiceActual:indiceActual, modo:props.modo, nombre:props.nombre};
     //funciones de preguntas
    this.GuardarPreguntas=this.GuardarPreguntas.bind(this);
    this.EliminarPregunta=this.EliminarPregunta.bind(this);
    //funciones interaccion de usuario
    this.Avanzar=this.Avanzar.bind(this);
    this.Retroceder=this.Retroceder.bind(this);
    this.Inicio=this.Inicio.bind(this);
    this.Final=this.Final.bind(this);
    this.Calificar=this.Calificar.bind(this);
    this.manejadorCambiosEscritura=this.manejadorCambiosEscritura.bind(this);
  }
  //----------------------------------------------------------------------------------------------
  //-------------------PETICIONES DE XML PARA OBTENER AREAS------------------------------------
  //----------------------------------------------------------------------------------------------
  //haciendo peticion y obteniendo las secciones
  pedirPreguntas( idPreg)
  {
     var preg=[];
     /*
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
         */ 
       for (var i = 0; i < 2; i++) 
       {
            preg.push(<Pregunta modo="ver" id={i} nombre={"Nombre"+i}/>);
       }
       return preg;
  }
  //haciendo peticion AJAX para obtener el siguiete ID de pregunta.
  obtenerIDCuestionario()
  {
      /*
    if(this.props.modo=="nuevo")
    {
      var result;
       $.ajax({
              url: 'UltimoCuestionario',
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
     */
    return 0;
  }

 //----------------------------------------------------------------------------------------------
  //--------------Funciones de preguntas
  //----------------------------------------------------------------------------------------------
  GuardarPreguntas()
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
  EliminarPregunta()
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
  Avanzar()
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
  Retroceder()
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
  Inicio()
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
  
  //agrega datos generales de la pregunta: titulo, intentos, retroalimentacion
  Final()
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
  Calificar()
  {

  }

  manejadorCambiosEscritura(e)
  {
    	this.setState({nombre: e.target.value});
  }
  obtenerTodasPreguntas()
  {
      var preg= [];
      var Pregunta = {nombre: "preg1", id: 0};
      preg.push(Pregunta);
      var Pregunta = {nombre: "preg2", id: 2};
      preg.push(Pregunta);
    return [preg];
  }
  render() 
  {
  	var preg=this.pedir();
    var editar=[];
    if(this.state.modo!="ver")
    {
      editar.push("Nombre de Cuestionario:");
      editar.push(<input type="text" name="pregunta" onChange={this.manejadorCambiosTitulo} value={this.state.nombre} required/>);
      editar.push(<br/>);
      //creacion de tabla
      var preg = obtenerTodasPreguntas();
      var tabla=[];
      tabla.push(<th>Nombre</th>); 
      tabla.push(<th>Id</th>);
      for(let i=0; i<preg.length;i++)
        tabla.push(<tr key={preg[i].id}>
        <td><input type="checkbox" name="preg" id={preg[i].id}/></td> 
        <td>{preg[i].nombre}</td><td>{preg[i].id}</td>
        </tr>);

      editar.push(<table>{tabla}</table>);
      editar.push(<button onClick={this.GuardarPreguntas}>Finalizar</button>);
      editar.push(<br/>);
    }
    else
    { 
        editar.push(<h1>{"Nombre de Cuestionario: " +this.state.nombre}</h1>);
        editar.push(this.state.Preguntas[this.state.indiceActual]);
        editar.push(<br/>);
        editar.push(<button onClick={this.Inicio}>Inicio</button>);
        editar.push(<button onClick={this.Retroceder}>Anterior</button>);
        editar.push(<button onClick={this.Avanzar}>Siguiente</button>);
        editar.push(<button onClick={this.Final}>Final</button>);
    }
    return (
      <div>
       {editar}
      </div>
      
    );
  }
}
