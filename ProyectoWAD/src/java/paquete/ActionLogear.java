/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import static com.opensymphony.xwork2.Action.SUCCESS;
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

/**
 *
 * @author Marcus
 */
public class ActionLogear extends ActionSupport {
    InputStream responseStream; 
    String correo;
    String passwords;
    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
    

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }

 

    public String getPasswords() {
        return passwords;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }
    
    public ActionLogear() {
    }
    
    public String execute() throws Exception {
             Session hibernateSession;
        System.out.println("------" + correo + passwords);
 hibernateSession=HibernateUtil.getSessionFactory().openSession(); 
 Query consulta=hibernateSession.createQuery("from Usuarios where correo= :correo and passwords= :pass ");
 consulta.setParameter("correo", correo);
 consulta.setParameter("pass", passwords);
 List l=consulta.list();
 String respuesta="";
 if(l!=null && l.size()!=0)
 {
 Usuarios us =(Usuarios)l.get(0);
        System.out.println(us.getNombre());
        respuesta="" + us.getTipo() + ".jsp";
     HttpSession s =   ServletActionContext.getRequest().getSession();
     s.setAttribute("user", us);
      responseStream = new StringBufferInputStream(respuesta);
      return SUCCESS;
 }
 else
 {
     respuesta="error";
      responseStream = new StringBufferInputStream(respuesta);
      return ERROR;
 }
       
       
    }
    
}
