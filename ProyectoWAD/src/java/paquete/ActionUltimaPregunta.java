/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
import org.apache.struts2.ServletActionContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

/**
 *
 * @author Marcus
 */
public class ActionUltimaPregunta extends ActionSupport {
    InputStream responseStream;

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
    
    public ActionUltimaPregunta() {
    }
    
    public String execute() throws Exception {
       SAXBuilder builder = new SAXBuilder();
       String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        String respuesta="error";
	File xmlFile = new File(path);
	try {
            Document document = (Document) builder.build(xmlFile);	
            Element rootNode = document.getRootElement();
            List usuarios = rootNode.getChildren("Pregunta");
           int n=usuarios.size();
           respuesta=""+n;
           
            }
	   catch (IOException | JDOMException io) {
		System.out.println(io.getMessage());
	  }
        responseStream = new StringBufferInputStream(respuesta);
        
        return SUCCESS;
    }
    
}
