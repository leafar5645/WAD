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
           System.out.println("-----------------llegue" );
          Element root=doc.getRootElement();
          List lista = root.getChildren("Pregunta");
          int i=0;
          System.out.println("imp" + lista.size() + pregunta +"--"+ id);
          for(i=0;i<lista.size();i++)
          {
             Element pregunta2=(Element)lista.get(i);
              if(Integer.parseInt(pregunta2.getAttributeValue("id"))==pregunta && Integer.parseInt(pregunta2.getAttributeValue("idcreador"))==id)
              {
                  System.out.println("entre");
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
                pregunta3.getAttribute("id").setValue("" + (z+1));
                z++;
                }
            }
            List listaE = root.getChildren("Cuestionario");
            int indiceg=-1;
            for(int p=0; p<listaE.size(); p++)
            {
                Element Exa=(Element) listaE.get(p);
                if(Integer.parseInt(Exa.getAttributeValue("idcreador"))==id)
                {
                    List listap= Exa.getChildren("pregunta");
                     System.out.println("el cuest " + p );
                    for(int n=0; n<listap.size();n++)
                    {
                        Element Pre = (Element) listap.get(n);
                        System.out.println("la preg" + n);
                        if(Integer.parseInt(Pre.getAttributeValue("valor"))==pregunta){indiceg=n;  System.out.println("indi" + indiceg);}
                        else if(Integer.parseInt(Pre.getAttributeValue("valor"))>pregunta){
                            int w= Integer.parseInt(Pre.getAttributeValue("valor"));
                            int np=w;
                            w=w-1; Pre.getAttribute("valor").setValue(""+w);
                            System.out.println("meti " +  w + " en donde estaba " + np);
                                    
                                    }
                    }
                    if(indiceg!=-1)
                    {
                    Element Pre = (Element) listap.get(indiceg);
                    Pre.detach();
                    }
                    
                }
                indiceg=-1;
                System.out.println("lo hice" + indiceg);
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
