import React from "react";

export class Recurso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Nombre:this.props.src, Tipo: this.obtenerTipo(), Ext: this.obtenerExtension()};
  }
  
   obtenerTipo()
  {
    var aux=this.props.src.split(".");
    var ex= aux[aux.length-1];
    if(ex=="jpeg"||ex=="jpg"||ex=="png"||ex=="gif")
      return "img";
    else if (ex=="mp4") 
      return "video";
    else if(ex=="mp3"||ex=="m4a")
      return "audio";
    else 
      return "error";
  }
  obtenerExtension()
  {
    var aux=this.props.src.split(".");
    var ex= aux[aux.length-1];
    return ex;
  }
  
  generarEtiqueta()
  {
    if (this.state.Tipo=="video") 
    {
      //console.log("video");
      var etq=(<video width="600" height="400" controls >
              <source src={this.state.Nombre} type={"video/"+this.state.Ext} key={this.state.Nombre}/>
                Tu navegador no implementa el elemento 
              </video>
            );
    }

    else if (this.state.Tipo=="img")
    {
     var etq= <img src={this.state.Nombre} width="600" height="400" key={this.state.Nombre}/>;
    }

   else if (this.state.Tipo=="audio")
   {
     var etq= (<audio src={this.state.Nombre} controls key={this.state.Nombre}>
                <p>Tu navegador no implementa el elemento audio</p>
                </audio>);
   }
   //console.log(this.state.Tipo);
   //console.log(etq);
   return etq;

  }
  render() {
    return (
      <div>
      Nombre de Recurso: {this.state.Nombre}
      <br/>
      {this.generarEtiqueta()}
      </div>
      
    );
  }
}