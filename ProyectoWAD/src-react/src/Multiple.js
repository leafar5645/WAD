import React from "react";
import {Recurso} from "./recurso.js";
import $ from 'jquery'; 
//tienes tres modos editar nuevo y ver los cuales se envian como props
export class Multiple extends React.Component {
  constructor(props) 
  {
    super(props);
    if(props.modo=="ver"||props.modo=="editar")
      this.state = {id:props.id, Pregunta:this.obtenerPregunta(), Opciones: this.obtenerOpciones(), Respuesta: this.obtenerRespuesta(), Recurso: this.obtenerRecurso()};
    else if(props.modo=="nuevo")
      this.state = {id:"",Pregunta:"", Opciones: [], Respuesta: "", Recurso: ""};
    this.manejadorCambiosEscritura=this.manejadorCambiosEscritura.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  manejadorCambiosEscritura(e)
  {

    if(e.target.name=="nombre")
      this.setState({Pregunta: e.target.value});
    else if(e.target.name=="recurso")
      this.setState({Recurso: e.target.value});
    else if(e.target.name.indexOf("Opcion")!=-1)
    {
      var pos=e.target.name.split(":")[1];
      var aux= this.state.Opciones;
      aux[parseInt(pos)]= e.target.value;
      this.setState({Opciones: aux});
    }
    else if(e.target.checked)
    {
      this.setState({Respuesta:e.target.value});
    }
    console.log(e.target.value);
  }
  handleSubmit()
  {
    if(this.props.modo=="nuevo")
    {
    alert("Armado de XML");
    inicial = "<bookstore><book>" +
    "<title>Everyday Italian</title>" +
    "<author>Giada De Laurentiis</author>" +
    "<year>2005</year>" +
    "</book></bookstore>";
    }
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text,"text/xml");
    event.preventDefault();
  }
  obtenerOpciones()
  {
    var opciones=["=5","=8","=4"];
    return opciones;
  }
   obtenerRespuesta()
  {
    var res="5"
    return res;
  }
    obtenerPregunta()
  {
    var pregunta= "¿2+2?"
    return pregunta;
  }
  obtenerRecurso()
  {
    var src= "Recursos/imagen.jpg"
    return src;
  }
  obtenerRecursosUsuario()
  {
    var rec=[];
    var formData = new FormData();
   formData.append("tipo" , "image");
     $.ajax({
            url: 'http://localhost:8080/ProyectoWAD/ActionRecursos',
            type: 'Post',
            data: formData,
      async:false,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            success: function (data) {
              if(data.toString().indexOf("@")!=-1)
                rec  =data.toString().split("@");
                console.log(data.toString());
            },
            error: function () {
                alert("Archivo invalido");
            }
        });
    var selects=[];
    selects.push(<option value="">Sin Medios</option>);
   
    for (var i =  0; i < rec.length; i++) 
    {
      selects.push(<option value={"image/"+rec[i]}>{rec[i]}</option>);
    }
    return selects;
  }
  generarOpcionesVer()
  {
    var opciones = [];
    opciones.push(<h2>{this.state.Pregunta}</h2>);
    for (var i = 0 ; i< this.state.Opciones.length; i++) 
    {
       opciones.push(<input type="radio" id={"op:"+i} name={"op"+this.state.Pregunta} value={this.state.Opciones[i]} key={"id"+i}/>);
       opciones.push(this.state.Opciones[i]);
       opciones.push(<br/>);
    } 
    if(this.state.Recurso=="")
      return (<div>{opciones} </div>);
    else
    {
      return (<div><Recurso src={this.state.Recurso} key={this.state.Recurso+"/"+this.state.Pregunta}/>{opciones}</div>);
    }
  }
  generarOpcionesMod()
  {
    var opciones = [];
    opciones.push("Pregunta: ");
    opciones.push(<textarea name="nombre" placeholder="Ej.:¿Como te llamas?" key="NamePreg" onChange={this.manejadorCambiosEscritura}/>)
    opciones.push(<br/>);
     if(this.state.Recurso!="")
      opciones.push(<Recurso src={this.state.Recurso} key={this.state.Recurso+this.state.Pregunta}/>);

    for (var i = 0 ; i< 3; i++) 
    {
       opciones.push(<input type="radio" id={"op:"+i} name={"op"+this.state.Pregunta} value={this.state.Opciones[i]} key={"id-radio"+i} onChange={this.manejadorCambiosEscritura}/>);
       opciones.push(<input type="text" name={"Opcion:"+i} placeholder={"Inserta Opcion "+i} key={"id-text"+i} onChange={this.manejadorCambiosEscritura}/>);
       opciones.push(<br/>);
    } 

    opciones.push("Seleccione un Recurso: ");
    
    opciones.push(
          <select value={this.state.Recurso} name ="recurso" key="NameRec" onChange={this.manejadorCambiosEscritura}>
          {this.obtenerRecursosUsuario()}
          </select>
      );
    return opciones;
   
  }
  render() {
    if (this.props.modo=="ver")
      var opciones=this.generarOpcionesVer();
    else
      var opciones=this.generarOpcionesMod();
    return (
      <div>
       <form onSubmit={this.handleSubmit}>
       Seleccione la Respuesta Correcta: <br/>
      {opciones}  
      <br/>
       <input type="submit" value="Guardar" />
      </form>
      </div>
      
    );
  }
}