/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import java.io.File;
import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.util.ArrayList;
import java.util.List;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author Marcus
 */
public class ActionRecurso extends ActionSupport {
    private List<String> resources;

	private String resource;
        private String tipo;
        private InputStream resourceStream;

    public InputStream getResourceStream() {
        return resourceStream;
    }
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public List<String> getResources() {
        return resources;
    }

    public void setResources(List<String> resources) {
        this.resources = resources;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    
    public ActionRecurso() {
    }
    
    public boolean validResource(String file)
    {
        if(tipo.contains("image"))
        { 
            if(file.contains(".jpeg") || file.contains(".png") || file.contains(".jpg"))
            {
                return true;
            }
        }
        if(tipo.contains("video"))
        {
            System.out.println("entre");
            if(file.contains(".mp4"))
            {
                return true;
            }
        
        }
        if(tipo.contains("audio"))
        {
            if(file.contains(".mp3") || file.contains(".m4a"))
            {
                return true;
            }
       
        }
        return false;
    }
    public String execute() throws Exception {
        System.out.println("" + tipo);
         String path= ServletActionContext.getServletContext().getRealPath("/image");
        File dir = new File(path); //La clase file tiene 3 constructores  File (String path).  Crea una nueva instancia de tipo file  convirtiendo la cadena de nombre de ruta dada en una ruta de acceso abstracta.
         String[] ficheros = dir.list();
         resource="";
         for(int i=0;i<ficheros.length;i++)
         {
             resources = new ArrayList<String>();
             System.out.println("--" + ficheros[i]);
             if(validResource(ficheros[i]))
             resource = resource + "@" + ficheros[i];
         }
         if(resource.length()>1)
         {
       resource=resource.substring(1);
         }
         else
         {
         resource="vacio";    
         }
         System.out.println("" + resource);
       resourceStream = new StringBufferInputStream(resource);
        return SUCCESS;
    }
    
}