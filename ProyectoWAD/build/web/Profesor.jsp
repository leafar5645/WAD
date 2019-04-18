<%-- 
    Document   : Profesor
    Created on : 3/04/2019, 04:37:51 PM
    Author     : Marcus
--%>

<%@page import="entity.Usuarios"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="CSS/style.css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <div id="barra">
     </div>
<script src="/ProyectoWAD/BarraNavRender.898bd891.js"> </script> 

        <br>
        <% Usuarios a =(Usuarios) session.getAttribute("user"); %>
        <h1>Bienvenido:  <% if(a!=null) out.print(a.getNombre());  %></h1>
        <br/>
        <br/>
     <div id="biblioteca"> </div> <script src="/ProyectoWAD/BibliotecaNavRender.1fb96131.js"></script> 
      

    </body>
</html>
