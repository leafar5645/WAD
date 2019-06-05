/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import entity.Calificaciones;
import entity.HibernateUtil;
import entity.Usuarios;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

/**
 *
 * @author Rafael
 */
public class ActionGuardarCal extends ActionSupport {
    private int cal;
    private int idexam;
    private InputStream resourceStream;

    public int getCal() {
        return cal;
    }

    public void setCal(int cal) {
        this.cal = cal;
    }

    public int getIdexam() {
        return idexam;
    }

    public void setIdexam(int idexam) {
        this.idexam = idexam;
    }

    public InputStream getResourceStream() {
        return resourceStream;
    }

    public void setResourceStream(InputStream resourceStream) {
        this.resourceStream = resourceStream;
    }
    
    
    
    
    public ActionGuardarCal() {
    }
    
    public String execute() throws Exception {
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
     
        Calificaciones cali = new Calificaciones();
        cali.setCalificacion(cal);
        cali.setIdExamen(idexam);
        HttpSession session2  = ServletActionContext.getRequest().getSession();
        Usuarios user = (Usuarios) session2.getAttribute("user");
        cali.setUsuarios(user);
	session.save(cali);
       
        session.getTransaction().commit();
        String respuesta="Bien";
        resourceStream = new StringBufferInputStream(respuesta);
        return SUCCESS;
        
    }
    
}
