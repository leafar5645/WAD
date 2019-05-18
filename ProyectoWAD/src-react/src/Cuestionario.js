
import React from "react";
import ReactDOM from "react-dom";
import {Pregunta} from "./Pregunta.js"
import {Texto} from "./Texto.js"
import $ from 'jquery'; 

//tienes tres modos editar nuevo y ver los cuales se envian como props
export class Cuestionario extends React.Component {
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
  pedirPreguntas( idCuest)
  {
    var preg=[];
     
    var formData = new FormData();
    var cuest;
     formData.append("idExamen" ,idCuest);
       $.ajax({
              url: 'DarExamen',
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                   var parser = new DOMParser();
                   var xmlDoc = parser.parseFromString(data.toString(),"text/xml");

                   cuest=xmlDoc.getElementsByTagName("Cuestionario")[0];
                   
              },
              error: function (data)
              {
                  alert("ERROR en recepcion de Preguntas");
              }
          });
          //console.log(cuest);
       var preguntas= cuest.getElementsByTagName("pregunta");
       for (var i = 0; i < preguntas.length; i++) 
       {
            preg.push(<Pregunta modo="examen" id={preguntas[i].getAttribute("valor")} nombre={preguntas[i].getAttribute("nombre")} key={preguntas[i].getAttribute("valor")}/>);
       }
       sessionStorage.removeItem('idExamen');
       sessionStorage.removeItem('nombreExamen');
       sessionStorage.clear();
       return preg;

  }
  //haciendo peticion AJAX para obtener el siguiete ID de pregunta.
  obtenerIDCuestionario()
  {
    var id=0;
    if(this.props.modo=="nuevo")
    {
    $.ajax({
          url: 'UltimoExamen',
          type: 'Post',
          async:false,
          processData: false, // tell jQuery not to process the data
          contentType: false, // tell jQuery not to set contentType
          success: function (data) {
              id= data.toString();
          },
          error: function (data) {
              console.log(data.toString());
              alert("ERROR en recepcion de IDCuestionario");
          }
      });
    }
    else
    {
      id=this.props.id;
    }
    return id;
  }

 //-----------------------------------------------------------------------------------------------
  //--------------Funciones de preguntas----------------------------------------------------------
  //----------------------------------------------------------------------------------------------
  GuardarPreguntas()
  {
    var id = this.state.idCuestionario;
    var urlConsulta;
    if(this.state.modo=="nuevo")
    {
       urlConsulta="CrearExamen";
    }
    else
    {
      urlConsulta="EditarExamen" ;
    }
          var inicial = "<Cuestionario id='"+id+"' nombre='"+this.state.nombre+"'></Cuestionario>";
          var parser = new DOMParser();
          var xmlDoc = parser.parseFromString(inicial,"text/xml");
          //Agregando preguntas
          for (let i = 0; i < this.state.Preguntas.length; i++) 
          {
            const element = this.state.Preguntas[i];            
            var preg=xmlDoc.createElement("pregunta");
            var att = xmlDoc.createAttribute("valor");      
            att.value = element.key; 
            preg.setAttributeNode(att);
            
            att = xmlDoc.createAttribute("nombre");      
            att.value = element.props.nombre; 
            //console.log("Nombre:"+element.props.nombre);
            preg.setAttributeNode(att);
            xmlDoc.getElementsByTagName("Cuestionario")[0].appendChild(preg);
          }
          
          //console.log(xmlDoc.getElementsByTagName("Cuestionario")[0]);

          var oSerializer = new XMLSerializer();
          var sXML = oSerializer.serializeToString(xmlDoc);
          var formData = new FormData();
           formData.append("examen" ,sXML);
        $.ajax({
                url: urlConsulta,
                type: 'Post',
                data: formData,
                async:false,
                processData: false, // tell jQuery not to process the data
                contentType: false, // tell jQuery not to set contentType
                success: function (data) {
                    if(!data.toString()=="listo")
                      alert("ERROR en respuesta");  
                      else
                      {
                        alert("Examen Guardado");
                        window.location="TablaExamenes.html";
                      }                    
                },
                error: function (data) {
                    console.log(data.toString());
                    alert("ERROR en peticion");
                }
            });
    
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

  //avanzamos una pregunta
  Avanzar()
  {
    if(this.state.indiceActual<this.state.Preguntas.length-1)
      this.setState((state) => (
        {indiceActual: this.state.indiceActual+1})
      );

  }
  //retrocedemos una pregunta
  Retroceder()
  {
    if(this.state.indiceActual>0)
      this.setState((state) => (
        {indiceActual: this.state.indiceActual-1})
      );
  }
  Inicio()
  {
    this.setState({indiceActual: 0});
  }
  
  //Nos movemos al la pregunta final
  Final()
  {
    this.setState({indiceActual: this.state.Preguntas.length - 1});
       
  }
  Calificar()
  {
     var resultado=0;
     for (let i = 0; i < this.state.Preguntas.length; i++) {
       const element = this.state.Preguntas[i];
       var cal = sessionStorage.getItem("Res:"+element.key); 
       resultado+=parseInt(cal);
     }
     alert("Calificacion: "+((resultado/this.state.Preguntas.length))*100);
     window.location="TablaExamenes.html";
  }

  manejadorCambiosEscritura(e)
  {
    if(e.target.name=="pregunta")//input pregunta
      this.setState({nombre: e.target.value});
    else if(e.target.checked)//checkbox
    {
      var aux= this.state.Preguntas;
      aux.push(<Pregunta modo="examen" id={e.target.id.split(":")[0]} nombre={e.target.id.split(":")[1]} key={e.target.id.split(":")[0]}/>);
      this.setState({Preguntas: aux});
    }
    else if(e.target.name=="preg")
    {
      var aux= this.state.Preguntas;
      for (let i = 0; i < aux.length; i++) 
      {
        const element = aux[i];
        if(element.key==e.target.id.split(":")[0])
        {
            aux.splice(i,1);
            this.setState({Preguntas: aux});
            return;
        }
      }
    }
    
  }
  obtenerTodasPreguntas()
  {
    var nombres=[];
    var ids= [];
    $.ajax({
              url: 'MisPreguntas',
              type: 'Post',
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  //console.log(data.toString());
                  if(data.toString()!="@_VACIO_@")
                  {
                    var aux= data.toString().split("@");
                    for (var i = 0; i < aux.length; i++) 
                    {
                      nombres[i]=aux[i].split(")")[1];
                      ids[i]=aux[i].split(")")[0];
                    }
                  }
              },
              error: function (data) 
              {
                  console.log(data.toString());
                  nombres=["Ejemplo1","Ejemplo2"];
                  alert("ERROR en Obtencion de Todas las Preguntas");
              }
          });    
      var preg= [];
      for (let i = 0; i < ids.length; i++) 
      {
        var Pregunta = {nombre: nombres[i], id: ids[i]};
        preg.push(Pregunta);        
      }
    return preg;
  }
  //valida que el ID se encuentre contenido en las preguntas seleccionadas
  contienePreguntas(id)
  {
    for (let i = 0; i < this.state.Preguntas.length; i++) 
    {
      const element = this.state.Preguntas[i];
      if(element.key==id)
      {
        return true;
      }
    }
    return false;
  }
  pedirElementosRenderizar()
  {
    var editar=[];
    if(this.state.modo!="ver")
    {
      //console.log(this.state.nombre);
      //console.log(this.state.Preguntas);
      editar.push("Nombre de Cuestionario:");
      editar.push(<input type="text" name="pregunta" onChange={this.manejadorCambiosEscritura} value={this.state.nombre} key='InputName'required/>);
      editar.push(<br/>);
      //creacion de tabla
      var preg = this.obtenerTodasPreguntas();
      var tabla=[];
      tabla.push(<th>Agregar</th>);
      tabla.push(<th>Nombre</th>); 
      tabla.push(<th>Id</th>);
      for(let i=0; i<preg.length;i++)
      {
        if(!this.contienePreguntas(preg[i].id))
          tabla.push(
          <tr key={preg[i].id}>
          <td key={"check"+preg[i].id}><input type="checkbox" name="preg" id={preg[i].id+":"+preg[i].nombre} onChange={this.manejadorCambiosEscritura}/></td> 
          <td key={"nombre"+preg[i].id} >{preg[i].nombre}</td>
          <td key={"id:"+preg[i].id}>{preg[i].id}</td>
          </tr>
          );
        else
        tabla.push(
          <tr key={preg[i].id}>
          <td key={"check"+preg[i].id}><input type="checkbox" name="preg" id={preg[i].id} onChange={this.manejadorCambiosEscritura} checked/></td> 
          <td key={"nombre"+preg[i].id} >{preg[i].nombre}</td>
          <td key={"id:"+preg[i].id}>{preg[i].id}</td>
          </tr>
          ); 
      }
      editar.push(<table border='1' key='Tabla'>{tabla}</table>);
      editar.push(<button onClick={this.GuardarPreguntas} key ='Finalizar'>Finalizar</button>);
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
        editar.push(<button onClick={this.Calificar}>Finalizar Cuestionario</button>);
    }
    return editar;
  }
  render() 
  {
    var editar=this.pedirElementosRenderizar();
    return (
      <div>
       {editar}
      </div>
      
    );
  }
}
