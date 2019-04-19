/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import entity.HibernateUtil;
import entity.Usuarios;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author Rafael
 */
public class ActionRegister extends ActionSupport {
    String correo;
    String nombre;
    String passwords;
    String tipo;
    InputStream responseStream; 

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPasswords() {
        return passwords;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
    
    public ActionRegister() {
    }
    
    public String execute() throws Exception {
        System.out.println("----------------" + correo + passwords+nombre+tipo);
         Session hibernateSession;
       // System.out.println("------" + correo + passwords);
 hibernateSession=HibernateUtil.getSessionFactory().openSession(); 
        System.out.println("Conctado a BD");
 Query consulta=hibernateSession.createQuery("from Usuarios where correo= :correo");
 consulta.setParameter("correo", correo);
  List l=consulta.list();
 String respuesta="";
   hibernateSession.close();
 if(l!=null && l.size()!=0)
 {
       
        respuesta="El usuario ya existe";
        responseStream = new StringBufferInputStream(respuesta);
        return ERROR;
 
 }
 else
 {
     
 
 hibernateSession=HibernateUtil.getSessionFactory().openSession(); 
 
  //Insert
 Transaction t0=hibernateSession.beginTransaction();
     Usuarios us = new Usuarios();
     us.setCorreo(correo);
     us.setNombre(nombre);
     us.setPasswords(passwords);
     us.setTipo(tipo);
     hibernateSession.save(us);
     t0.commit();
      respuesta="Usuario registrado";
      hibernateSession.close();
        responseStream = new StringBufferInputStream(respuesta);
     return SUCCESS;
 }

        
        
        
        
        
        
    }
    
}
