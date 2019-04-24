import React from "react";
import {Recurso} from "./recurso.js";
import $ from 'jquery'; 
//tienes tres modos editar nuevo y ver los cuales se envian como props
export class Texto extends React.Component {
  constructor(props) 
  {
    super(props);
    if(props.modo=="ver"||props.modo=="editar")
      this.state = {modo:props.modo, id:props.id, Pregunta:this.obtenerPregunta(), Respuesta: this.obtenerRespuesta(), Recurso: this.obtenerRecurso(), RecursosUser: [], Tipo:this.obtenerTipoRecurso()};
    else if(props.modo=="nuevo")
      this.state = {modo:props.modo, id:props.id,Pregunta:"",  Respuesta: "", Recurso: "", RecursosUser: [], Tipo:""};
    this.manejadorCambiosEscritura=this.manejadorCambiosEscritura.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.obtenerRecursosUsuario=this.obtenerRecursosUsuario.bind(this);
    //console.log(props.modo);
  }
  //Actualiza los estados conforma se escribe
  manejadorCambiosEscritura(e)
  {
    if(e.target.name=="nombre")
      this.setState({Pregunta: e.target.value});
    else if(e.target.name=="recurso")
      this.setState({Recurso: e.target.value});
    else if(e.target.name=="Respuesta")
    {
      this.setState({Respuesta:e.target.value});
    }
    //console.log(e.target.value);
  }
  //guarda en servidor la seccion
  handleSubmit(event)
  {
    event.preventDefault();
    var urlConsulta="";
    if(this.state.Respuesta=="")
    {
      alert("Favor de dar la respuesta correcta");
      return;
    }
    if(this.state.modo=="nuevo")
    {
      this.setState({modo:"editar"});
      urlConsulta="ActionAddSection";
    }
    else
      urlConsulta="EditarSeccion";
    
      var inicial = "<Seccion texto='"+this.state.Pregunta+"' tipo='texto' id='"+this.state.id+"' respuesta='"+this.state.Respuesta+"'></Seccion>";
      
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(inicial,"text/xml");
      //agregando el recurso
      if(this.state.Recurso!="")
      {
        var rec=xmlDoc.createElement("Recurso");
        var att = xmlDoc.createAttribute("src");      
        att.value = this.state.Recurso; 
        rec.setAttributeNode(att);

        var att = xmlDoc.createAttribute("tipo");      
        att.value = this.state.Tipo; 
        rec.setAttributeNode(att); 
        xmlDoc.getElementsByTagName("Seccion")[0].appendChild(rec);
      }    

    //Haciendo peticion para enviar xml construido
    //console.log(xmlDoc);

    var oSerializer = new XMLSerializer();
      var sXML = oSerializer.serializeToString(xmlDoc);
      var formData = new FormData();
     formData.append("idpregunta" ,this.props.idPreg);
     formData.append("seccion" ,sXML);
       $.ajax({
              url: urlConsulta,
              type: 'Post',
              data: formData,
              async:false,
              processData: false, // tell jQuery not to process the data
              contentType: false, // tell jQuery not to set contentType
              success: function (data) {
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

  }

  //se recupera la respuesta correcta del sistema
   obtenerRespuesta()
  {
    var res="";
    var formData = new FormData();
    var id=this.props.id;
     formData.append("idpregunta" ,this.props.idPreg);
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
                   for (var i = 0; i < sec.length; i++) 
                   {
                     if(sec[i].id==id)
                     {
                        res =sec[i].getAttribute("respuesta");; 
                        //console.log(res);
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
  //se recupera el nombrer de la pregunta del servidor
    obtenerPregunta()
  {
    var res="";
    var formData = new FormData();
     formData.append("idpregunta" ,this.props.idPreg);
     var id=this.props.id;
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
                   for (var i = 0; i < sec.length; i++) 
                   {
                     if(sec[i].id==id)
                     {
                        res =sec[i].getAttribute('texto'); 
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
  //recupera el recurso usado paar esta pregunta
  obtenerRecurso()
  {
    var id=this.props.id;
    var res="";
    var formData = new FormData();
     formData.append("idpregunta" ,this.props.idPreg);
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
                   for (var i = 0; i < sec.length; i++) 
                   {
                     if(sec[i].id==id)
                     {
                     
                      if(sec[i].getElementsByTagName('Recurso').length>0)
                          res =sec[i].getElementsByTagName('Recurso')[0].getAttribute("src");
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
       //console.log(res);
    return res;
  }
  //obtener el tipo del recurso del usuario
  obtenerTipoRecurso()
  {
    var id=this.props.id;
    var res="";
    var formData = new FormData();
     formData.append("idpregunta" ,this.props.idPreg);
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
                   for (var i = 0; i < sec.length; i++) 
                   {
                     if(sec[i].id==id)
                     {
                     
                      if(sec[i].getElementsByTagName('Recurso').length>0)
                          res =sec[i].getElementsByTagName('Recurso')[0].getAttribute("tipo");
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
       //console.log(res);
    return res;
  }
  //solicita al servidor los recursos del cliente
  obtenerRecursosUsuario(e)
  {
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
                else if(data.toString()=="vacio")
                  rec=[];
                else
                  rec=[data.toString()];
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
        selects.push(<option value={"image"+rec[i]} key={rec[i]}>{rec[i]}</option>);
      }

      this.setState({RecursosUser: selects});
    }
    else
      this.setState({RecursosUser: [<option value="">Sin Medios</option>]});
    
  }
  //gebnera de manera estatica.
  generarOpcionesVer()
  {
    var opciones = [];
    opciones.push(<h2>{this.state.Pregunta}</h2>);
     opciones.push(<input type="text" name="Respuesta" placeholder="Respuesta" key={"id-text"} required/>);
    opciones.push(<br/>);
     if(this.state.Recurso!="")
      opciones.push(<Recurso src={this.state.Recurso} key={this.state.Recurso+"/"+this.state.Pregunta}/>);
    opciones.push(<br/>);
   return opciones;
  }
  //genera para modo de edicion y de creacion
  generarOpcionesMod()
  {
    var opciones = [];
    opciones.push("Pregunta: ");
    opciones.push(<textarea name="nombre" placeholder="Ej.:¿Como te llamas?" key="NamePreg" onChange={this.manejadorCambiosEscritura} required>{this.state.Pregunta}</textarea>);
    opciones.push(<input type="text" name="Respuesta" placeholder="Respuesta" key={"id-text"} onChange={this.manejadorCambiosEscritura} value={this.state.Respuesta} required/>);
    opciones.push(<br/>);
     if(this.state.Recurso!="")
      opciones.push(<Recurso src={this.state.Recurso} key={this.state.Recurso+this.state.Pregunta}/>);

    opciones.push("Seleccione un Recurso: ");
      opciones.push(
          <select  name="tipo" key={"NameTipo"+this.state.id}  onChange={this.obtenerRecursosUsuario} value={this.state.Tipo}> 
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
    var Bguardar=[];
    if (this.state.modo=="ver")
      var opciones=this.generarOpcionesVer();
    else
    {
      var opciones=this.generarOpcionesMod();
      Bguardar.push(<input type="submit" value="Guardar" />);
    }

    return (
      <div>
       <form onSubmit={this.handleSubmit}>
       
      {opciones}  
      <br/>
       {Bguardar}
      </form>
      </div>
      
    );
  }
}