/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import entity.Usuarios;
import java.io.File;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;

/**
 *
 * @author Marcus
 */
public class ActionMisPreguntas extends ActionSupport {
        InputStream responseStream;

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
    
    public ActionMisPreguntas() {
    }
    
    public String execute() throws Exception {
         HttpSession sesion=ServletActionContext.getRequest().getSession();
        Usuarios us =(Usuarios)sesion.getAttribute("user");
        int id =us.getId();
         //idpregunta=0;  //en lo que nos ponemos deacuerdo como se el id de la pregunta donde va la seccion
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        System.out.println("" + path);
       // XMLOutputter xmlout= new XMLOutputter();
          Document doc = new Document();
          File fXmlFile = new File(path);
          SAXBuilder builder = new SAXBuilder();
          doc=builder.build(fXmlFile);
          Element root = doc.getRootElement();
          List lista = root.getChildren("Pregunta");
          String [] preguntas= new String [lista.size()];
          for(int i=0;i<lista.size();i++)
          {
              Element pregunta=(Element)lista.get(i);
              if(Integer.parseInt(pregunta.getAttributeValue("idcreador"))==id)
              {
                  System.out.println("entre: " + pregunta.getAttributeValue("id") );
                  preguntas[Integer.parseInt(pregunta.getAttributeValue("id"))]=pregunta.getAttributeValue("id") + ")" +pregunta.getAttributeValue("texto") ;
              }
          }
          String respuesta="";
          for(int i=0; i<preguntas.length ; i++)
          {
              if(preguntas[i]!= null)
              respuesta=respuesta + preguntas[i] + "@";
          }
         if(respuesta.equals(""))
             respuesta="@_VACIO_@@";
         respuesta= respuesta.substring(0, respuesta.length()-1);
          responseStream = new StringBufferInputStream(respuesta);
        return SUCCESS;
    }
    
}
