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
import java.io.InputStream;
import java.io.StringBufferInputStream;
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
public class ActionCrearPregunta extends ActionSupport {
     private String pregunta;
     InputStream responseStream;

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
    
    
    
    public ActionCrearPregunta() {
    }
    
    public String execute() throws Exception {
       String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        System.out.println("" + path);
        XMLOutputter xmlout= new XMLOutputter();
          Document doc = new Document();
          File fXmlFile = new File(path);
          SAXBuilder builder = new SAXBuilder();
          doc=builder.build(fXmlFile);
           //System.out.println("-----------------llegue" );
          InputStream stream = new ByteArrayInputStream(pregunta.getBytes("UTF-8"));
          System.out.println("----" + pregunta);
          Document Dpregunta = builder.build(stream);
          Element newPregunta=Dpregunta.getRootElement();
          Element newPregunta2=(Element)newPregunta.clone();
          newPregunta2.detach();
          Element root=doc.getRootElement();
          root.addContent(newPregunta2);
          xmlout.setFormat(Format.getPrettyFormat());
               xmlout.output(doc,new FileWriter(path));
               xmlout.output(doc,System.out);
            String    respuesta="listo";
      responseStream = new StringBufferInputStream(respuesta);

        
        return SUCCESS;
    }
    
}
