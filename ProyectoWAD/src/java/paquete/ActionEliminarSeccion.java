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

/**
 *
 * @author Marcus
 */
public class ActionEliminarSeccion extends ActionSupport {
    private int idpregunta;
    private int idseccion;

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
    InputStream responseStream;

    public int getIdpregunta() {
        return idpregunta;
    }

    public void setIdpregunta(int idpregunta) {
        this.idpregunta = idpregunta;
    }

    public int getIdseccion() {
        return idseccion;
    }

    public void setIdseccion(int idseccion) {
        this.idseccion = idseccion;
    }
    
    public ActionEliminarSeccion() {
    }
    
    public String execute() throws Exception {
       HttpSession sesion=ServletActionContext.getRequest().getSession();
        Usuarios us =(Usuarios)sesion.getAttribute("user");
        int id =us.getId();
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
       
        XMLOutputter xmlout= new XMLOutputter();
          Document doc = new Document();
          File fXmlFile = new File(path);
          SAXBuilder builder = new SAXBuilder();
          doc=builder.build(fXmlFile);
        int j=0;
        List lista2=null;
         List lista = doc.getRootElement().getChildren("Pregunta");
          for(int i =0; i<lista.size(); i++)
          {
              Element pregunta = (Element) lista.get(i);
            
              if(Integer.parseInt(pregunta.getAttribute("id").getValue())==idpregunta && Integer.parseInt(pregunta.getAttribute("idcreador").getValue())==id )
              {
              
               lista2= pregunta.getChildren("Seccion");
          
              for(j=0;j<lista2.size();j++)
                {
                    
                  Element Seccion = (Element) lista2.get(j);
                    
                  if(Integer.parseInt(Seccion.getAttributeValue("id"))==idseccion)
                  {
                     
                      break;
                  }
                  
                }
               break;
              }
             
          }
         
           Element Seccion = (Element) lista2.get(j);
           Seccion.detach();
            int z=j;
            
            for(j=j;j<lista2.size();j++)
            {
                Element pregunta3 = (Element)lista2.get(j);
                
                pregunta3.getAttribute("id").setValue("" + (z+1));
                z++;
             
            }
           xmlout.setFormat(Format.getPrettyFormat());
               xmlout.output(doc,new FileWriter(path));
               xmlout.output(doc,System.out);
            String    respuesta="listo";
      responseStream = new StringBufferInputStream(respuesta);
                      
        
        return SUCCESS;
    }
    
}
