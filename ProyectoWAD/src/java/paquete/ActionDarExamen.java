
package paquete;

import static com.opensymphony.xwork2.Action.SUCCESS;
import com.opensymphony.xwork2.ActionSupport;
import entity.Usuarios;
import java.io.File;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.io.StringWriter;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;


public class ActionDarExamen extends ActionSupport {
     private int idExamen;

    public int getIdExamen() {
        return idExamen;
    }

    public void setIdExamen(int idExamen) {
        this.idExamen = idExamen;
    }

   

    public InputStream getResponseStream() {
        return responseStream;
    }

    public void setResponseStream(InputStream responseStream) {
        this.responseStream = responseStream;
    }
   private InputStream responseStream;
 
    
    public String execute() throws Exception {
         HttpSession sesion=ServletActionContext.getRequest().getSession();
        Usuarios us =(Usuarios)sesion.getAttribute("user");
        int id =us.getId();
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        int res=0;
        //DOMSource domSource=null;
        SAXBuilder builder = new SAXBuilder();
	File xmlFile = new File(path);
        Element ExamenClonada=null;
	
            Document document = (Document) builder.build(xmlFile);	
            Element rootNode = document.getRootElement();
            List list =rootNode.getChildren("Cuestionario");
            for (int i = 0; i < list.size(); i++) {
                Element  Examen = (Element) list.get(i);
                if(Integer.parseInt(Examen.getAttributeValue("id"))==idExamen && Integer.parseInt(Examen.getAttributeValue("idcreador"))==id){
                    ExamenClonada=(Element)Examen.clone();
                    ExamenClonada.detach();
                    break;
                }
            }
        
               Document doc = new Document(ExamenClonada);
        XMLOutputter xmlout= new XMLOutputter();
      // String hola;
        StringWriter writer = new StringWriter();
         Format f = Format.getPrettyFormat();
          f.setEncoding("ISO-8859-1");
          xmlout.setFormat(f);
          xmlout.output(doc, writer);
          String respuesta=writer.getBuffer().toString();
         int ind= respuesta.indexOf(">");
         respuesta= respuesta.substring(ind+1);
          System.out.println("!aqui" + respuesta);
          responseStream = new StringBufferInputStream(respuesta);
        return SUCCESS;
    }
}
