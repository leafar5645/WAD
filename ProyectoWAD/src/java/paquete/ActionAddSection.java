/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import entity.Usuarios;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import javax.xml.parsers.ParserConfigurationException;
import org.apache.struts2.ServletActionContext;
import org.jdom.Namespace;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import org.xml.sax.SAXException;

/**
 *
 * @author Marcus
 */
public class ActionAddSection extends ActionSupport {
    private String seccion;
    InputStream responseStream; 
    private int idpregunta;

    public int getIdpregunta() {
        return idpregunta;
    }

    public void setIdpregunta(int idpregunta) {
        this.idpregunta = idpregunta;
    }

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }

    public String getSeccion() {
        return seccion;
    }

    public void setSeccion(String seccion) {
        this.seccion = seccion;
    }
    
    public ActionAddSection() {
    }
    
    public String execute() throws Exception {
        HttpSession sesion=ServletActionContext.getRequest().getSession();
         Usuarios us =(Usuarios)sesion.getAttribute("user");
        int id =us.getId();
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        System.out.println("" + path);
        XMLOutputter xmlout= new XMLOutputter();
          Document doc = new Document();
          File fXmlFile = new File(path);
          SAXBuilder builder = new SAXBuilder();
          doc=builder.build(fXmlFile);
           //System.out.println("-----------------llegue" );
          InputStream stream = new ByteArrayInputStream(seccion.getBytes("UTF-8"));
          System.out.println("----" + seccion);
          Document Dseccion = builder.build(stream);
          Element newSeccion=Dseccion.getRootElement();
          Element newSeccion2=(Element)newSeccion.clone();
          newSeccion2.detach();
          List lista = doc.getRootElement().getChildren("Pregunta");
         // System.out.println("tamLista"+lista.size());
          //System.out.println("idpreg="+idpregunta);
          for(int i =0; i<lista.size(); i++)
          {
              Element pregunta = (Element) lista.get(i);
              System.out.println("------"+pregunta.getAttribute("id").getValue());
              if(Integer.parseInt(pregunta.getAttribute("id").getValue())==idpregunta && Integer.parseInt(pregunta.getAttribute("idcreador").getValue())==id)
              {
               pregunta.addContent(newSeccion2);
               break;
              }
              
          }
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
