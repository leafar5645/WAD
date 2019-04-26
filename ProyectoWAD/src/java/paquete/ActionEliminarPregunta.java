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
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
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
public class ActionEliminarPregunta extends ActionSupport {
        private int  pregunta;
        InputStream responseStream;

    public int getPregunta() {
        return pregunta;
    }

    public void setPregunta(int pregunta) {
        this.pregunta = pregunta;
    }

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
    
    public ActionEliminarPregunta() {
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
          Element root=doc.getRootElement();
          List lista = root.getChildren("Pregunta");
          int i=0;
          for(i=0;i<lista.size();i++)
          {
             Element pregunta2=(Element)lista.get(i);
              if(Integer.parseInt(pregunta2.getAttributeValue("id"))==pregunta && Integer.parseInt(pregunta2.getAttributeValue("idcreador"))==id)
              {
                  break;
              }
          }
            Element pregunta2=(Element)lista.get(i);
            pregunta2.detach();
            int z=i;
            
            for(i=i;i<lista.size();i++)
            {
                Element pregunta3 = (Element)lista.get(i);
                if(Integer.parseInt(pregunta3.getAttributeValue("idcreador"))==id)
                {
                pregunta3.getAttribute("id").setValue("" + z);
                z++;
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
