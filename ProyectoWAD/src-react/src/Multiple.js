import React from "react";
import {Recurso} from "./recurso.js";
import $ from 'jquery'; 
//tienes tres modos editar nuevo y ver los cuales se envian como props
export class Multiple extends React.Component {
  constructor(props) 
  {
    super(props);
    if(props.modo=="ver"||props.modo=="editar")
      this.state = {modo:props.modo, id:props.id, Pregunta:this.obtenerPregunta(), Opciones: this.obtenerOpciones(), Respuesta: this.obtenerRespuesta(), Recurso: this.obtenerRecurso(), RecursosUser: [], Tipo:""};
    else if(props.modo=="nuevo")
      this.state = {modo:props.modo, id:props.id,Pregunta:"", Opciones: [], Respuesta: "", Recurso: "", RecursosUser: [], Tipo:""};
    this.manejadorCambiosEscritura=this.manejadorCambiosEscritura.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.obtenerRecursosUsuario=this.obtenerRecursosUsuario.bind(this);
  }
  //Actualiza los estados conforma se escribe
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
    //console.log(e.target.value);
  }
  //guarda en servidor la seccion
  handleSubmit(event)
  {
    event.preventDefault();
    if(this.props.modo=="nuevo")
    {
      var inicial = "<section text='"+this.state.Pregunta+"' tipo='multiple' id='"+this.state.id+"' respuesta='"+this.state.Respuesta+"'></section>";
      
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(inicial,"text/xml");
      //agregando el recurso
      if(this.state.Recurso!="")
      {
        var rec=xmlDoc.createElement("Recurso");
        var att = xmlDoc.createAttribute("src");      
        att.value = this.state.Recurso; 
        rec.setAttributeNode(att); 
        xmlDoc.getElementsByTagName("section")[0].appendChild(rec);
      }
      //agregando opciones
      for (var i = 0 ; i< this.state.Opciones.length; i++) 
      {
        var opc=xmlDoc.createElement("option");
        var att = xmlDoc.createAttribute("value");      
        att.value = this.state.Opciones[i];
        opc.setAttributeNode(att); 
         xmlDoc.getElementsByTagName("section")[0].appendChild(opc);
      } 
      this.setState({modo:"editar"});
    }
    //Haciendo peticion para enviar xml construido
    //console.log(xmlDoc);
    var oSerializer = new XMLSerializer();
      var sXML = oSerializer.serializeToString(xmlDoc);
      var formData = new FormData();
     formData.append("idpregunta" ,this.props.idPreg);
     formData.append("seccion" ,sXML);
       $.ajax({
              url: 'ActionAddSection',
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
                  console.log(data.toString());
                  if(data.toString=="listo")
                    alerta("Guardado");
                  else
                    alert("ERROR");
              },
              error: function (data) {
                  console.log(data.toString());
                  alert("ERROR");
              }
          });
  }
  obtenerOpciones()
  {
    var opciones=[];
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
                     if(sec[i].id==this.props.id)
                     {
                        var opc =sec[i].getElementsByTagName('option'); 
                       for (var j = 0; i < opc.length; j++) 
                       {
                         opciones.push(opc[j].value);
                       }
                     }
                    
                   }
              },
              error: function (data)
              {
                  console.log(data.toString());
                  opciones=["=5","=8","=4"];
                  alert("ERROR en recepcion de Opciones");
              }
          });
    return opciones;
  }
   obtenerRespuesta()
  {
    var res="";
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
                     if(sec[i].id==this.props.id)
                     {
                        res =sec[i].respuesta; 
                     }
                    
                   }
              },
              error: function (data)
              {
                  console.log(data.toString());
                  res="1=";
                  alert("ERROR en recepcion de RESPUESTA");
              }
          });
    return res;
  }
    obtenerPregunta()
  {
    var res="";
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
                     if(sec[i].id==this.props.id)
                     {
                        res =sec[i].texto; 
                     }
                    
                   }
              },
              error: function (data)
              {
                  console.log(data.toString());
                  res="1+1"
                  alert("ERROR en recepcion de PREGUNTA");
              }
          });
    return res;
  }
  obtenerRecurso()
  {
    var res="";
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
                     if(sec[i].id==this.props.id)
                     {
                        res =sec[i].getElementsByTagName('Recurso')[0].src; 
                     }
                    
                   }
              },
              error: function (data)
              {
                  console.log(data.toString());
                  res="image/imagen.jpg";
                  alert("ERROR en recepcion de RECURSO");
              }
          });
    return res;
  }
  //solicita al servidor los recursos del cliente
  obtenerRecursosUsuario(e)
  {
    console.log(e.target.value);
    this.setState({Tipo: e.target.value});
    if(e.target.value!="")
    {
      var rec=[];
      var formData = new FormData();
     formData.append("tipo" ,e.target.value);
       $.ajax({
              url: 'ActionRecursos',
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
                  console.log("ERROR DE PETICION");
                  rec=["ejemplo/imagen.jpg","ejemplo/video.mp4","ejemplo/audio.mp3"];
              }
          });
      var selects=[];
      selects.push(<option value="">Sin Medios</option>);
     
      for (var i =  0; i < rec.length; i++) 
      {
        selects.push(<option value={e.target.value+"/"+rec[i]} key={rec[i]}>{rec[i]}</option>);
      }

      this.setState({RecursosUser: selects});
    }
    else
      this.setState({RecursosUser: [<option value="">Sin Medios</option>]});
    
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
          <select  name="tipo" key={"NameTipo"+this.state.id}  onChange={this.obtenerRecursosUsuario}> 
            <option value="">Sin Medios</option>
            <option value="image">Imagenes</option>
            <option value="video">Videos</option>
            <option value="audio">Audios</option>
          </select>
          );
      opciones.push(
          <select value={this.state.Recurso} name ="recurso" key={"NameRec"+this.state.id} onChange={this.manejadorCambiosEscritura}>
          {this.state.RecursosUser}
          </select>
      );
    return opciones;
   
  }
  render() {
    if (this.state.modo=="ver")
      var opciones=this.generarOpcionesVer();
    else
      var opciones=this.generarOpcionesMod();
    return (
      <div>
       <form onSubmit={this.handleSubmit}>
       
      {opciones}  
      <br/>
       <input type="submit" value="Guardar" />
      </form>
      <br/><br/>
      </div>
      
    );
  }
}