/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
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
        
           
        int idpregunta=0;  //en lo que nos ponemos deacuerdo como se el id de la pregunta donde va la seccion
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        System.out.println("" + path);
        XMLOutputter xmlout= new XMLOutputter();
          Document doc = new Document();
          File fXmlFile = new File(path);
          SAXBuilder builder = new SAXBuilder();
          doc=builder.build(fXmlFile);
           System.out.println("-----------------llegue" );
          InputStream stream = new ByteArrayInputStream(seccion.getBytes("UTF-8"));
          System.out.println("----" + seccion);
          Document Dseccion = builder.build(stream);
          Element newSeccion=Dseccion.getRootElement();
          Element newSeccion2=(Element)newSeccion.clone();
          newSeccion2.detach();
          List lista = doc.getRootElement().getChildren("Pregunta");
          for(int i =0; i<lista.size(); i++)
          {
              Element pregunta = (Element) lista.get(i);
              System.out.println("------"+pregunta.getAttribute("id").getValue());
              if(Integer.parseInt(pregunta.getAttribute("id").getValue())==idpregunta)
              {
               pregunta.addContent(newSeccion2);
              }
              break;
          }
           xmlout.setFormat(Format.getPrettyFormat());
               xmlout.output(doc,new FileWriter(path));
               xmlout.output(doc,System.out);
            String    respuesta="nice";
      responseStream = new StringBufferInputStream(respuesta);
                      
    return SUCCESS;
       
    }
    
}
