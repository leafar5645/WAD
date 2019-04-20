/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import com.sun.xml.internal.bind.v2.runtime.XMLSerializer;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringBufferInputStream;
import java.io.StringWriter;
import java.io.Writer;
import java.util.List;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.struts2.ServletActionContext;
import org.dom4j.io.OutputFormat;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.w3c.dom.Node;

/**
 *
 * @author Marcus
 */
public class ActionDarPregunta extends ActionSupport {
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
   private InputStream responseStream;
   
    
    public ActionDarPregunta() {
    }
    
    public String execute() throws Exception {
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        int res=0;
        DOMSource domSource=null;
        SAXBuilder builder = new SAXBuilder();
	File xmlFile = new File(path);
        Element preguntaClonada=null;
	
            Document document = (Document) builder.build(xmlFile);	
            Element rootNode = document.getRootElement();
            List list =rootNode.getChildren("Pregunta");
            for (int i = 0; i < list.size(); i++) {
                Element  pregunta = (Element) list.get(i);
                if(Integer.parseInt(pregunta.getAttributeValue("id"))==idpregunta){
                    preguntaClonada=(Element)pregunta.clone();
                    preguntaClonada.detach();
                    break;
                }
            }
        
               Document doc = new Document(preguntaClonada);
        XMLOutputter xmlout= new XMLOutputter();
      // String hola;
        StringWriter writer = new StringWriter();
          xmlout.output(doc, writer);
          String respuesta=writer.getBuffer().toString();
         int ind= respuesta.indexOf(">");
         respuesta= respuesta.substring(ind+1);
          System.out.println("" + respuesta);
      // Display the XML
     
      responseStream = new StringBufferInputStream(respuesta);
        return SUCCESS;
    }
    
}