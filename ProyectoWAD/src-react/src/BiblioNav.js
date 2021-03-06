import React from "react";
import $ from 'jquery'; 

export class BiblioNav extends React.Component
{
    constructor(props) {
    super(props);
    this.state = {
	  tipo:'', 		
      resources:'',
      viewResource:'',
	  validResourcesA:false,
	  validResourcesV:false,
	  validResourcesI:false, 
	  validResource:false		
    };
 
	this.upload=this.upload.bind(this);
	this.getResources=this.getResources.bind(this);
	this.createSelect=this.createSelect.bind(this);
	this.playResource=this.playResource.bind(this);
	this.createMedia=this.createMedia.bind(this);
  }
  playResource()
  {
	   var recurso = this.refs.recursos.value;
	   this.setState({viewResource: recurso  , validResource: true });
	   
  }
  createMedia()
  {
	  const res ="image/" + this.state.viewResource;
	  const type = this.state.tipo; 
	 // alert(res + type);
	  
	  if(type=="image")
	  {
		  return <img src= {res} />
	  }
	  if(type=="video")
	  {
		  return <video  src={res} controls='true' />
	  }
	  if(type == 'audio')
	  {
		  return <audio controls='true' src={res} />
	  }
	  return ;
  }
  createSelect()
  {
	   const array = this.state.resources;
	   //alert(array);
	   const resources=array.toString().split("@");
	  var barra=[];
	  console.log("resources" + resources);
	  const option = <option value='1' >Selecciona una opcion </option>;
	 
	  barra.push(option);
	 
   for (var i = 0; i <resources.length ; i++)
   {
	   const option=<option value={resources[i]}>{resources[i]}</option>;
		barra.push(option);
   }
	return barra;
	
  }
  getResources(e)
  {
	  var array=""
	  this.setState({validResources: false});
	  e.preventDefault();
	  var tipo = this.refs.tipo.value;
	  var formData = new FormData();
	 formData.append("tipo" , tipo);
	     $.ajax({
            url: 'ActionRecursos',
            type: 'Post',
            data: formData,
			async:false,
            processData: false, // tell jQuery not to process the data
            contentType: false, // tell jQuery not to set contentType
            success: function (data) {
                array  =data.toString();
				console.log(array);
            },
            error: function () {
                alert("Archivo invalido");
            }
        });
	 
	  if(tipo!='1')
	  {
	  this.setState({tipo: tipo });	
		if(tipo=='video')
		{
			 //alert("video")
			//array="abc@def@ghi";
	  this.setState({validResourcesV: true});
	  this.setState({validResourcesI: false});
	  this.setState({validResourcesA: false});
		}
		if(tipo=='audio')
		{
			 //alert("audio")
			//array="hola@adios@ve";
	 this.setState({validResourcesV: false});
	  this.setState({validResourcesI:false});
	  this.setState({validResourcesA: true});
		}
		if(tipo=='image')
		{
			//array="abc@olos@solo";
	 this.setState({validResourcesV: false});
	  this.setState({validResourcesI: true});
	  this.setState({validResourcesA: false});
		}
	  this.setState({validResource: false});
	  this.setState({resources: array } );
	  }
	  

	  else{
		 // alert("entre2");
		  this.setState({validResourcesI: false, validResourcesV: false, validResourcesA: false, resources:"-"});
		  this.setState({validResource: false});
	  }
	  console.log("que esta pasando" + this.state.resources);
	// alert(array);
	  
  }
  upload(e)
  {
	   var a;
    e.preventDefault();
    var formData = new FormData(e.target);
  
          $.ajax({
            url: 'Subir',
            type: 'Post',
            data: formData,
            async:false,
            processData: false,
            contentType: false,  
            success: function (data) {
                alert("Subido con exito");
   
            },
            error: function () {
                alert("Archivo invalido");
            }
          });
 
  
  }
   render() {
    return (
	<div id='Biblio'>
	<div id='SubirF'>
		<form onSubmit={this.upload}>
	   <input type='file' class='custom-file' name='archivo' id='archivo'/>
	   <br/>
	   <input type='submit' name='subir' value='subir' id='submitLogin' />
	   </form>
	   <br/>
	   <br/>
	</div>
	
	<div id='media'>
	<select id='tipo' name='tipo' ref='tipo' onChange={this.getResources}>
	<option value='1'>Selecciona una opcion</option>
	<option value='image'>imagen</option>
	<option value='video'>video</option>
	<option value='audio'>audio</option>
	</select>
	{this.state.validResourcesA &&  (<select name='recursos' ref='recursos' id='recursos' onChange={this.playResource}>{this.createSelect()}</select>)}
	{this.state.validResourcesV &&  (<select name='recursos' ref='recursos' id='recursos' onChange={this.playResource}>{this.createSelect()}</select>)}
	{this.state.validResourcesI &&  (<select name='recursos' ref='recursos' id='recursos' onChange={this.playResource}>{this.createSelect()}</select>)}
	<br/>
	<br/>
	<center>
	{this.state.validResource && this.createMedia()}
	</center>
	</div>
	</div>
	);
}
}
