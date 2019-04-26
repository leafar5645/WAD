
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
public class ActionEditarPregunta extends ActionSupport {
       String pregunta;
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
    
    public ActionEditarPregunta() {
    }
    
    public String execute() throws Exception {
         HttpSession sesion=ServletActionContext.getRequest().getSession();
         Usuarios us =(Usuarios)sesion.getAttribute("user");
        int id =us.getId();
      //  int idpregunta=0;  //en lo que nos ponemos deacuerdo como se el id de la pregunta donde va la seccion
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
          Element newpregunta=Dpregunta.getRootElement();
          Element newpregunta2=(Element)newpregunta.clone();
          newpregunta2.detach();
        int npregunta =Integer.parseInt(newpregunta2.getAttributeValue("id"));
        newpregunta2.setAttribute("idcreador", ""+id);
       Element root =doc.getRootElement();
         List lista = root.getChildren("Pregunta");
          for(int i =0; i<lista.size(); i++)
          {
              Element pregunta = (Element) lista.get(i);
              System.out.println("------"+pregunta.getAttribute("id").getValue());
              if(Integer.parseInt(pregunta.getAttribute("id").getValue())==npregunta && Integer.parseInt(pregunta.getAttribute("idcreador").getValue())==id)
              {
                  System.out.println("entre: "  );
                   pregunta.detach();
                   root.addContent(newpregunta2);
                  
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
