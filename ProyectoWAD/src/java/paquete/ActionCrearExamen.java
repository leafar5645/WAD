/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import static com.opensymphony.xwork2.Action.SUCCESS;
import com.opensymphony.xwork2.ActionSupport;
import entity.Usuarios;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

/**
 *
 * @author Marcus
 */
public class ActionCrearExamen extends ActionSupport {  
    private String examen;
    private InputStream responseStream;
    public String getExamen() {
        return examen;
    }

    public void setExamen(String examen) {
        this.examen = examen;
    }

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
   
    
    public ActionCrearExamen() {
    }
    
    public String execute() throws Exception {
        HttpSession sesion=ServletActionContext.getRequest().getSession();
       Usuarios us =(Usuarios)sesion.getAttribute("user");
        int id =us.getId();
       // System.out.println("" + id);
       String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        System.out.println("" + path);
        XMLOutputter xmlout= new XMLOutputter();
          Document doc = new Document();
          File fXmlFile = new File(path);
          SAXBuilder builder = new SAXBuilder();
          doc=builder.build(fXmlFile);
           //System.out.println("-----------------llegue" );
          InputStream stream = new ByteArrayInputStream(examen.getBytes("UTF-8"));
       //   System.out.println("----" + pregunta);
          Document Dexamen = builder.build(stream);
          Element newExamen=Dexamen.getRootElement();
          Element newExamen2=(Element)newExamen.clone();
          newExamen2.detach();
          newExamen2.setAttribute("idcreador", ""+id);
          Element root=doc.getRootElement();
          root.addContent(newExamen2);
          Format f = Format.getPrettyFormat();
          f.setEncoding("ISO-8859-1");
          xmlout.setFormat(f);
               xmlout.output(doc,new FileWriter(path));
               xmlout.output(doc,System.out);
            String    respuesta="listo";
      responseStream = new StringBufferInputStream(respuesta);

        
        return SUCCESS;
    }
    
}
