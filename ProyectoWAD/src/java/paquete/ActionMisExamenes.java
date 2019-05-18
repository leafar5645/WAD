
package paquete;

import static com.opensymphony.xwork2.Action.SUCCESS;
import com.opensymphony.xwork2.ActionSupport;
import entity.Usuarios;
import java.io.File;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

public class ActionMisExamenes extends ActionSupport {
    
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
        String path=ServletActionContext.getServletContext().getRealPath("/xml");
        path=path + "/banco.xml";
        Document doc = new Document();
        File fXmlFile = new File(path);
        SAXBuilder builder = new SAXBuilder();
        doc=builder.build(fXmlFile);
        Element root = doc.getRootElement();
        List lista = root.getChildren("Cuestionario");
        String [] Examenes= new String [lista.size()];
        System.out.println("----" + lista.size());
        for(int i=0;i<lista.size();i++)
          {
              Element Examen=(Element)lista.get(i);
              if(Integer.parseInt(Examen.getAttributeValue("idcreador"))==id)
              {
                  
                  Examenes[Integer.parseInt(Examen.getAttributeValue("id"))-1]=Examen.getAttributeValue("id") + ")" +Examen.getAttributeValue("nombre") ;
              }
          }
          String respuesta="";
          for(int i=0; i<Examenes.length ; i++)
          {
              if(Examenes[i]!= null)
              respuesta=respuesta + Examenes[i] + "@";
          }
         if(respuesta.equals(""))
             respuesta="@_VACIO_@@";
         respuesta= respuesta.substring(0, respuesta.length()-1);
          responseStream = new StringBufferInputStream(respuesta);
        return SUCCESS;
    }
}
