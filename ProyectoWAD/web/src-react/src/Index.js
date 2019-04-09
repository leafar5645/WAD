import React from "react";
import {LoginForm} from "./LoginForm.js"
import {RegisterForm} from "./RegisterForm.js"

export class Index extends React.Component
{
    constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
    this.showLogin=this.showLogin.bind(this);
    this.showRegister=this.showRegister.bind(this);
  }
  showLogin()
  {
       this.setState({isLoginOpen: true, isRegisterOpen: false});
  }
  showRegister()
  {
      this.setState({isRegisterOpen: true, isLoginOpen: false});
  }
  render() {

    return (
      <div className="root-Index">
    <br/>
     <center>
         <div id="control-box" > 
            <label id="buttons-login" onClick={this.showLogin}>Login</label>
            <label id="buttons-login" onClick={this.showRegister}>Registro</label>
        </div>
      {this.state.isLoginOpen &&  <LoginForm />}
      {this.state.isRegisterOpen &&  <RegisterForm />}  
      </center>
      </div>
    );
  }
}