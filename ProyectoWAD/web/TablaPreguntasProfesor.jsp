<%@page import="entity.Usuarios"%>
<!DOCTYPE html>

<html>
<head>
<link rel="stylesheet" type="text/css" href="CSS/style.css">
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
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

        <div id="root">
        </div>
        <script src="/ProyectoWAD/TablaPreguntasProfesor.4080e002.js"></script>
        <script src="/ProyectoWAD/BarraNavRender.f2254f6c.js"></script>
  </body>
</html>
