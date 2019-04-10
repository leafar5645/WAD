<%@page import="entity.Usuarios"%>
<!DOCTYPE html>

<html>
<head>
<link rel="stylesheet" type="text/css" href="CSS/style.css">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>
Mis Preguntas</title>
</head>

<body>
 <% Usuarios a=(Usuarios) session.getAttribute("user");%>
        <h1>
            Preguntas de: <% if(a!=null)out.print(a.getNombre()); else response.sendRedirect("index.html");%>
        </h1>
 <div id="barra">
 </div>
 <div id="root">
 </div>
<script src="/ProyectoWAD/TablaPreguntasProfesor.d162e21c.js">
        </script>
        <script src="/ProyectoWAD/BarraNavRender.5b78434d.js">
        </script>
    
  </body>
</html>
