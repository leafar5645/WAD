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
     <div id="barra">
     </div>
 
 <% Usuarios a=(Usuarios) session.getAttribute("user");%>
        <h1>
            Preguntas de: <% if(a!=null)out.print(a.getNombre()); else response.sendRedirect("index.html");%>
        </h1>
<center>
        <div id="root">
        </div>
</center>
        <script src="/ProyectoWAD/TablaPreguntasProfesor.20295238.js"></script>
        <script src="/ProyectoWAD/BarraNavRender.898bd891.js"></script>
  </body>
</html>
