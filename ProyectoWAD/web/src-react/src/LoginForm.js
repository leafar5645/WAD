import React from "react";
import $ from 'jquery';
export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '' , valuecorreo: '' , valuepass: ''};
    
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
  }
  logear(e)
  {   
     var a;
    e.preventDefault();
    var formData = new FormData(e.target);
  
          $.ajax({
            url: 'Logear',
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
                 if(a==="error")
   {
        this.setState({value: "Usuario o Clave incorrecta"});
        this.setState({valuecorreo: ""});
        this.setState({valuepass: ""});
   }
   else
      {
       // this.setState({value: "success"});
  window.location=a;
             //console.log("pedos");
      }
  
  }
  render() {
    return (
            
           
                      
            <div id="formulario">
            <br/>
            
      <form onSubmit={this.logear} id="forma">
          <label>  
          Name:
          </label>
          <input type="text" name="correo" value={this.state.valuecorreo} onChange={this.cambios} id="inputs" required  />
           <br/>
           <br/>
         <label>
          Password
          </label>
          <input type="password" name="passwords" value={this.state.valuepass} onChange={this.cambios}  id="inputs" />
         <br/>
         <br/>
        <input type="submit" value="Entrar" id="submitLogin" />
      <br/>
      <br/>
        <label id="login-error">{this.state.value} </label>
        
      </form>
      </div>
      
    );
  }
}