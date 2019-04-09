
<%@page import="entity.Usuarios" %>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>

<html>
    <head>
        <link rel="stylesheet" type="text/css" href="/ProyectoWAD/style.030a681b.css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>
            Mis Preguntas</title>
    </head>
    <body>
        <% Usuarios a=(Usuarios) session.getAttribute("user");%>
        <h1>
            Preguntas de: <% if(a!=null)out.print(a.getNombre()); else response.sendRedirect("index.html");%>
        </h1>
        <div id="root">
        </div>
        <script src="/ProyectoWAD/TablaPreguntasProfesor.24724918.js">
        </script>
    </body>
</html>

