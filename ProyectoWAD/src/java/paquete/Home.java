/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import entity.Usuarios;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author Marcus
 */
public class Home extends ActionSupport {
    
    public Home() {
    }
    
    public String execute() throws Exception {
       Usuarios us = (Usuarios) ServletActionContext.getRequest().getSession().getAttribute("user");
        System.out.println("----Rafas" + us.getTipo());
       if(us!=null)
       {
          if(us.getTipo().equals("Profesor"))
              return "profesor";
          else
              return "alumno";
       }
       else
       {
           return "login";
       }
        
    }
    
}
