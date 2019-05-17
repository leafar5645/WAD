/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import static com.opensymphony.xwork2.Action.SUCCESS;
import com.opensymphony.xwork2.ActionSupport;
import entity.Usuarios;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

/**
 *
 * @author Marcus
 */
public class ActionUltimoExamen extends ActionSupport {
    InputStream responseStream;

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
   
    
    public String execute() throws Exception {
           HttpSession sesion=ServletActionContext.getRequest().getSession();
        Usuarios us =(Usuarios)sesion.getAttribute("user");
        int id =us.getId();
       SAXBuilder builder = new SAXBuilder();
       String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        String respuesta="error";
	File xmlFile = new File(path);
	try {
            Document document = (Document) builder.build(xmlFile);	
            Element rootNode = document.getRootElement();
            List preguntas = rootNode.getChildren("Cuestionario");
            int mayor=0;
            int n=0;
            int p=0;
            for (int z=0; z<preguntas.size() ; z++)
            {
                Element pregunta =(Element)preguntas.get(z);
               p=Integer.parseInt(pregunta.getAttributeValue("id"));
               if(p>mayor && Integer.parseInt(pregunta.getAttributeValue("idcreador"))==id )
               {
                   mayor=p;
               }
            }
           n=mayor+1;
           respuesta=""+n;
           }
	   catch (IOException | JDOMException io) {
		System.out.println(io.getMessage());
	  }
        responseStream = new StringBufferInputStream(respuesta);
        
        return SUCCESS;
    }
    
}
