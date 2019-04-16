package paquete;

import com.opensymphony.xwork2.ActionSupport;
import java.io.File;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author betoj
 */

public class Action extends ActionSupport {
    private InputStream resourceStream;

    public InputStream getResourceStream() {
        return resourceStream;
    }

    public void setResourceStream(InputStream resourceStream) {
        this.resourceStream = resourceStream;
    }

    public File getArchivo() {
        return archivo;
    }

    public void setArchivo(File archivo) {
        this.archivo = archivo;
    }

    public String getArchivoFileName() {
        return archivoFileName;
    }

    public void setArchivoFileName(String archivoFileName) {
        this.archivoFileName = archivoFileName;
    }

    public String getArchivoContentType() {
        return archivoContentType;
    }

    public void setArchivoContentType(String archivoContentType) {
        this.archivoContentType = archivoContentType;
    }
    File archivo;
    String archivoFileName;
    String archivoContentType;
 
 
    
    public String execute() throws Exception {
       
        HttpServletRequest r=ServletActionContext.getRequest();
        //password=r.getParameter("password");
        //nombre=r.getParameter("nombre");
    
        System.out.println("arch:"+archivoContentType);
        
       String path= ServletActionContext.getServletContext().getRealPath("/image");
      
       path=path + "/" + archivoFileName;
        System.out.println( path );
        try
        {
       File f = new File(path);
        System.out.println("pase");
        System.out.println(archivo.length());
        
      FileUtils.copyFile(archivo, f);
        }
        catch(Exception e)
        {
            System.out.println("" + e);
        }
      resourceStream = new StringBufferInputStream("Bien");
        
       // System.out.println("input"+archivoFileName);
       
            return SUCCESS;
      
        
    }
  
    
    
}
