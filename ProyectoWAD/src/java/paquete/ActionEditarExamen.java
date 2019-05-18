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
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;

public class ActionEditarExamen extends ActionSupport {
    
      String Examen;
       InputStream responseStream;

    public String getExamen() {
        return Examen;
    }

    public void setExamen(String Examen) {
        this.Examen = Examen;
    }

  

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
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        System.out.println("" + path);
        XMLOutputter xmlout= new XMLOutputter();
        Document doc = new Document();
        File fXmlFile = new File(path);
        SAXBuilder builder = new SAXBuilder();
        doc=builder.build(fXmlFile);
        InputStream stream = new ByteArrayInputStream(Examen.getBytes("UTF-8"));
        Document DExamen = builder.build(stream);
        Element newExamen=DExamen.getRootElement();
        Element newExamen2=(Element)newExamen.clone();
        newExamen2.detach();
        int nExamen =Integer.parseInt(newExamen2.getAttributeValue("id"));
        newExamen2.setAttribute("idcreador", ""+id);
       Element root =doc.getRootElement();
         List lista = root.getChildren("Cuestionario");
          for(int i =0; i<lista.size(); i++)
          {
              Element Examen = (Element) lista.get(i);
              if(Integer.parseInt(Examen.getAttribute("id").getValue())==nExamen && Integer.parseInt(Examen.getAttribute("idcreador").getValue())==id)
              {
                  
                   Examen.detach();
                   root.addContent(newExamen2);
                  
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
