import React from "react";
import {Recurso} from "./recurso.js";
import $ from 'jquery'; 
import DnD from './DnD';
//tienes tres modos editar nuevo y ver los cuales se envian como props
export class DragAndDrop extends React.Component {
  constructor(props) 
  {
    super(props);
    if(props.modo=="ver"||props.modo=="editar")
      this.state = {modo:props.modo, id:props.id, Pregunta:this.obtenerPregunta(), items: this.obtenerItmes(), objetivos: this.obtenerObjetivos(),RecursosUser: [], Tipo:""};
    else if(props.modo=="nuevo")
      this.state = {modo:props.modo, id:props.id, Pregunta:"", items: [], objetivos: [],RecursosUser: [], Tipo:""};

    if(props.modo=="ver")
    {
       sessionStorage.setItem("R"+this.state.id,1);
       sessionStorage.setItem("RU"+this.props.id,0);
    }
    this.manejadorCambiosEscritura=this.manejadorCambiosEscritura.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.obtenerRecursosUsuario=this.obtenerRecursosUsuario.bind(this);
    this.NuevaFila=this.NuevaFila.bind(this);
    sessionStorage.setItem("RU"+props.id,2);
    
    //console.log(props.modo);
  }
  //Actualiza los estados conforma se escribe
  manejadorCambiosEscritura(e)
  {
    if(e.target.name=="nombre")
      this.setState({Pregunta: e.target.value});
    else if(e.target.name=="recItem")
    {
      var i=parseInt(e.target.id);
      var aux=this.state.items;
      aux[i].Recurso=e.target.value;
      this.setState({items: aux});
      //console.log(aux);
    }
    else if(e.target.name=="recObj")
    {
      var i=parseInt(e.target.id);
      var aux=this.state.objetivos;
      aux[i].Recurso=e.target.value;
      this.setState({objetivos: aux});
      //console.log(aux);
    }
    //poner en 1 cuando la pregunta este correcta
    //sessionStorage.setItem("RU"+this.state.id,e.target.value);

    //console.log(e.target.value);
  }
  //guarda en servidor la seccion
  handleSubmit(event)
  {
    
    var urlConsulta="";
    //comprobando que este completo
    for (let i = 0; i < this.state.objetivos.length; i++) 
    {
      if(this.state.objetivos[i].Recurso=="")
      {
        alert("Favor de Acompletar");
        return;
      }
      if(this.state.items[i].Recurso=="")
      {
        alert("Favor de Acompletar");
        return;
      }
      
    }
     
    if(this.state.modo=="nuevo")
    {
      this.setState({modo:"editar"});
      urlConsulta="ActionAddSection";
    }
    else
      urlConsulta="EditarSeccion";
    
      var inicial = "<Seccion texto='"+this.state.Pregunta+"' tipo='DND' id='"+this.state.id+"' respuesta=''></Seccion>";
      
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(inicial,"text/xml");
      //agregando los elementos
      for (let i = 0; i < this.state.items.length; i++) 
      {
        const item = this.state.items[i];
        const obj = this.state.objetivos[i];

        var eitem=xmlDoc.createElement("item");
        var att = xmlDoc.createAttribute("id");
        att.value = item.id; 
        eitem.setAttributeNode(att);
        att = xmlDoc.createAttribute("nombre");
        att.value = item.name; 
        eitem.setAttributeNode(att);
        att = xmlDoc.createAttribute("recurso");
        att.value = item.Recurso; 
        eitem.setAttributeNode(att);

        var etar=xmlDoc.createElement("target");
        att = xmlDoc.createAttribute("id");
        att.value = obj.id; 
        etar.setAttributeNode(att);
        att = xmlDoc.createAttribute("nombre");
        att.value = obj.name; 
        etar.setAttributeNode(att);
        att = xmlDoc.createAttribute("recurso");
        att.value = obj.Recurso; 
        etar.setAttributeNode(att);

        xmlDoc.getElementsByTagName("Seccion")[0].appendChild(etar);
        xmlDoc.getElementsByTagName("Seccion")[0].appendChild(eitem);
        
      }
            

    //Haciendo peticion para enviar xml construido
    console.log(xmlDoc);

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
  //obtener los items
  obtenerItmes()
  {
    var id=this.props.id;
    var resi=[];
    var res=[];
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
                     
                      if(sec[i].getElementsByTagName('item').length>0)
                        resi=sec[i].getElementsByTagName('item');
                        //reso=sec[i].getElementsByTagName('target');
                          //res =sec[i].getElementsByTagName('item')[i].getAttribute("tipo");
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
       for (let i = 0; i < resi.length; i++) {
         const element = resi[i];
         res.push({id:element.getAttribute("id") ,name:element.getAttribute("nombre"), Recurso:element.getAttribute("recurso")});
       }
       //console.log(res);
    return res;
  }
  obtenerObjetivos()
  {
    var id=this.props.id;
    var resi=[];
    var res=[];
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
                     
                      if(sec[i].getElementsByTagName('target').length>0)
                        resi=sec[i].getElementsByTagName('target');
                        //reso=sec[i].getElementsByTagName('target');
                          //res =sec[i].getElementsByTagName('item')[i].getAttribute("tipo");
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
       for (let i = 0; i < resi.length; i++) {
         const element = resi[i];
         res.push({id:element.getAttribute("id") ,name:element.getAttribute("nombre"), Recurso:element.getAttribute("recurso")});
       }
       //console.log(res);
    return res;
  }
  //gebnera de manera estatica.
  generarOpcionesVer()
  {
    var opciones = [];
    opciones.push(<h2>{this.state.Pregunta}</h2>);
    opciones.push(<br/>);
     opciones.push(<DnD  items={this.state.items} objetivos={this.state.objetivos} id={this.state.id}/>,);
    opciones.push(<br/>);
    return opciones;
  }

  NuevaFila()
  {
    var Items=this.state.items;
    console.log(Items);
    if(Items.length>0)
    Items.push({id:(parseInt(Items[Items.length-1].id)+1) ,name:"", Recurso:""});
    else
    Items.push({id:0 ,name:"", Recurso:""});
    var Obj=this.state.objetivos;
    console.log(Obj);
    if(Obj.length>0)
    Obj.push({id:(parseInt(Obj[Obj.length-1].id)+1) ,name:"", Recurso:""});
    else
    Obj.push({id:0 ,name:"", Recurso:""});
    console.log(Items);
    console.log(Obj);
    this.setState({items: Items,objetivos: Obj});
    
  }
  EliminarFila(i)
  {
    var Items=this.state.items;
    Items.splice(i, 1);
    this.setState({items: Items});
    var Obj=this.state.objetivos;
    Obj.splice(i, 1);;
    this.setState({objetivos: Obj});
    
  }
  //genera para modo de edicion y de creacion
  generarOpcionesMod()
  {
    var opciones = [];
    opciones.push("Pregunta: ");
    opciones.push(<textarea name="nombre" placeholder="Ej.:¿Como te llamas?" key="NamePreg" onChange={this.manejadorCambiosEscritura} required>{this.state.Pregunta}</textarea>);
    opciones.push(<br/>);

    var tabla=[];
    for (let i = 0; i < this.state.items.length; i++) 
    {
      var celdai=[];
      if(this.state.items[i].Recurso!="")
      celdai.push(<Recurso src={this.state.items[i].Recurso} key={this.state.items[i].Recurso+this.state.Pregunta+"i"}/>);
      
      celdai.push(<br/>);
      celdai.push("Seleccione un Recurso: ");
      celdai.push(
           <select  name="tipo" key={"NameTipo"+this.state.id+"i"}  onChange={this.obtenerRecursosUsuario} value={this.state.Tipo}> 
             <option value="">Sin Medios</option>
             <option value="image">Imagenes</option>
             <option value="video">Videos</option>
             <option value="audio">Audios</option>
           </select>
           );
      celdai.push(
           <select value={this.state.items[i].Recurso} name ="recItem" id={i} key={"RecItem:"+i} onChange={this.manejadorCambiosEscritura}>
           {this.state.RecursosUser}
           </select>
       );
       var celdao=[];
      if(this.state.objetivos[i].Recurso!="")
      celdao.push(<Recurso src={this.state.objetivos[i].Recurso} key={this.state.objetivos[i].Recurso+this.state.Pregunta+"o"}/>);
      
      celdao.push(<br/>);
      celdao.push("Seleccione un Recurso: ");
      celdao.push(
           <select  name="tipo" key={"NameTipo"+this.state.id+"o"}  onChange={this.obtenerRecursosUsuario} value={this.state.Tipo}> 
             <option value="">Sin Medios</option>
             <option value="image">Imagenes</option>
             <option value="video">Videos</option>
             <option value="audio">Audios</option>
           </select>
           );
      celdao.push(
           <select value={this.state.objetivos[i].Recurso} name ="recObj" id={i} key={"RecItem:"+i} onChange={this.manejadorCambiosEscritura}>
           {this.state.RecursosUser}
           </select>
       );
       tabla.push(<tr><td>{celdai}</td><td>{celdao}</td>
       <td><button onClick={this.EliminarFila.bind(this,i)}>Eliminar Fila</button></td>
       </tr>);
    }

    opciones.push(<table border="1"><th>Items</th><th>objetivos</th>{tabla}</table>);

    opciones.push(<button onClick={this.NuevaFila}>Nueva Fila</button>)
    console.log(opciones);
    return opciones;
   
  }
  render() {
    var Bguardar=[];
    if (this.state.modo=="ver")
      var opciones=this.generarOpcionesVer();
    else
    {
      var opciones=this.generarOpcionesMod();
      Bguardar.push(<button onClick={this.handleSubmit}>Guardar</button>);
    }

    return (
      <div>
       
       
      {opciones}  
      <br/>
       {Bguardar}
   
      </div>
      
    );
  }
}