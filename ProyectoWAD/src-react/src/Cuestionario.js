
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
            preg.push(<Pregunta modo="ver" id={i} nombre={"Nombre"+i} key={i}/>);
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
    alert("Actualizar XML");
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

  }

  manejadorCambiosEscritura(e)
  {
    if(e.target.name=="pregunta")//input pregunta
      this.setState({nombre: e.target.value});
    else if(e.target.checked)//checkbox
    {
      var aux= this.state.Preguntas;
      aux.push(<Pregunta modo="ver" id={e.target.id} nombre={"Nombre"+e.target.id} key={e.target.id}/>);
      this.setState({Preguntas: aux});
    }
    else if(e.target.name=="preg")
    {
      var aux= this.state.Preguntas;
      for (let i = 0; i < aux.length; i++) 
      {
        const element = aux[i];
        if(element.key==e.target.name)
        {
            aux.splice(i,1);
            return;
        }
      }
    }
    
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

  pedirElementosRenderizar()
  {
    var editar=[];
    if(this.state.modo!="ver")
    {
      console.log(this.state.nombre);
      editar.push("Nombre de Cuestionario:");
      editar.push(<input type="text" name="pregunta" onChange={this.manejadorCambiosEscritura} value={this.state.nombre} required/>);
      editar.push(<br/>);
      //creacion de tabla
      var preg = this.obtenerTodasPreguntas();
      var tabla=[];
      tabla.push(<th>Agregar</th>);
      tabla.push(<th>Nombre</th>); 
      tabla.push(<th>Id</th>);
      for(let i=0; i<preg.length;i++)
        console.log(preg[i].id)
        tabla.push(<tr key={preg[i].id}>
        <td><input type="checkbox" name="preg" id={preg[i].id} onChange={this.manejadorCambiosEscritura}/></td> 
        <td>{preg[i].nombre}</td><td>{preg[i].id}</td>
        </tr>);

      editar.push(<table border='1'>{tabla}</table>);
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
    return editar;
  }
  render() 
  {
    var editar=this.pedirElementosRenderizar();
    console.log(editar);
    return (
      <div>
       {editar}
      </div>
      
    );
  }
}
