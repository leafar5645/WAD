import React from "react";
import $ from 'jquery';
export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '' , valuecorreo: '' , valuepass: '' , valuename: ''};

    this.logear = this.logear.bind(this);
   this.cambios = this.cambios.bind(this);
  }
  cambios(e)
  {
      if(e.target.name==='correo')
      {
          this.setState({valuecorreo: e.target.value})
      }
       if(e.target.name==='passwords')
      {
          this.setState({valuepass: e.target.value})
      }
       if(e.target.name==='nombre')
      {
          this.setState({valuename: e.target.value})
      }
  }
  logear(e)
  {   
     var a;
    e.preventDefault();
    var formData = new FormData(e.target);
  
          $.ajax({
            url: 'Registar',
            type: 'Post',
            data: formData,
            async:false,
            processData: false,
            contentType: false,  
            success: function (data) {
                  a =data.toString();
   
            },
            error: function () {
                alert("Archivo invalido");
            }
          });
   //console.log(a);
                 if(a==="exito")
   {
        this.setState({value: "registro exitoso"});
        this.setState({valuecorreo: ""});
        this.setState({valuepass: ""});
        this.setState({valuename: ""});
   }
   else
      {
       // this.setState({value: "success"});
	this.setState({value: a });
             //console.log("pedos");
      }
  
  }
  render() {
    return (
            
          
          
           
            <div id="formulario">
            <br/>
            
      <form onSubmit={this.logear} id="forma">
       <label>  
          Nombre:
          </label>
          <input type="text" name="nombre"  value={this.state.valuename} onChange={this.cambios} id="inputs"  />
           <br/>
           <br/>
          <label> 
           <label>  
          Tipo:
          </label>
          <select name="tipo" id="select-login" > 
          <option value="0">Selecciona una opcion</option>
          <option value="Profesor">Profesor</option>
            </select>
           <br/>
           <br/>
          Correo:
          </label>
          <input type="text" name="correo" value={this.state.valuecorreo} onChange={this.cambios}  id="inputs"  />
           <br/>
           <br/>
         <label>
          Password
          </label>
          <input type="password" name="passwords" value={this.state.valuepass} onChange={this.cambios}  id="inputs" />
         <br/>
         <br/>
        <input type="submit" value="Registrar" id="submitLogin" />
      <br/>
      <br/>
        <label >{this.state.value} </label>
        
      </form>
      </div>
      
    );
  }
}
