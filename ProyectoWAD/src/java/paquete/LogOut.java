/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package paquete;

import com.opensymphony.xwork2.ActionSupport;
import javax.servlet.http.HttpSession;
import org.apache.struts2.ServletActionContext;

/**
 *
 * @author Rafael
 */
public class LogOut extends ActionSupport {
    
    public LogOut() {
    }
    
    public String execute() throws Exception {
        HttpSession session = ServletActionContext.getRequest().getSession();
        session.removeAttribute("user");
        session.invalidate();
        return SUCCESS;
    }
}
