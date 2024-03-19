<?php session_start();?>
<?php if(isset($_POST["usuario"])){?>
<?php 	$_SESSION["usuario"] = $_POST["usuario"];?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Red Asistencial Juliaca EsSalud</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="css/coin-slider.css" />
<link rel="stylesheet" type="text/css" href="CSS/estilos.css" media="screen" />
<link rel="stylesheet" type="text/css" href="CSS/menu.css" media="screen" />
<link rel="stylesheet" type="text/css" href="CSS/segunda.css" media="screen" />
<!--[if lt IE 9]>
  <script src='JS/jquery-1.10.1.js' type='text/javascript'/>
<![endif]-->

<!--[if (gte IE 9) | (!IE)]><!-->  
  <script src='JS/jquery-2.0.3.js' type='text/javascript'/>
<!--<![endif]-->	

<script type="text/javascript" src="js/cufon-yui.js"></script>
<script type="text/javascript" src="js/cufon-titillium-600.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script type="text/javascript" src="js/coin-slider.min.js"></script>
<script type="text/javascript" src="js/menu.js"></script>
<script type="text/javascript" src="js/privilegios.js"></script>
</head>
<body>
<div class="main">
  <div class="header">
    <div class="header_resize">
      <div class="logo">
        <h1><a href="index.html"><img src="images/essalud.jpg" width="90" height="59" />EsSalud Juliaca</a></h1>
      </div>
      <div class="clr"></div>
      <div class="slider">
        <div id="coin-slider"> 
			<a href="#"><img src="images/Logistica1.jpg" width="940" height="310" alt="" /> </a>
			<a href="#"><img src="images/Logistica2.jpg" width="940" height="310" alt="" /> </a>
			<a href="#"><img src="images/Logistica3.jpg" width="940" height="310" alt="" /> </a>
		</div>
        <div class="clr"></div>
      </div>
      <div class="clr"></div>
      <div class="menu_nav">
        <ul class="topmenu">
					<li>
						<a id="archivos" href="#">Archivos</a>
						<ul class="submenu">
							<li><a id="maestro" href="layout/trabajando.php">Maestro Materiales</a></li>
							<li><a id="centroCost" href="layout/centroCostos.php">Centro de Costos</a></li>
						</ul>
					</li>
					<li>
						<a id="ctrlProcesos"  href="#">Ctrl. Procesos</a>
						<ul class="submenu">
							<li><a id="archProc" href="layout/expedientes.php">Archivo de Procesos</a></li>
							<li><a id="conProc" href="layout/consultasProcesos.php">Consulta de Procesos</a></li>
						</ul>
					</li>
					<li>
						<a id="pac" href="#">PAC</a>
						<ul class="submenu">
							<li><a id="segProc" href="#">Segu. de Procesos</a></li>
							<li><a id="cargarPAC" href="layout/cargarPac.php">Cargar PAC</a></li>
						</ul>
					</li>
					<li><a id="ctrlConsumo" href="#">Control de Consumo</a></li>
					<li>
						<a id="parametros" href="#">Parametros</a>
						<ul class="submenu">
							<li><a id="topes" href="layout/topes.php">Topes</a></li>
							<li><a id="correlativos" href="layout/correlativos.php">Correlativos</a></li>
							<li><a id="centro" href="layout/variables.php">Centro</a></li>
						</ul>
					</li>
					<li>
						<a id="consultas" href="#">Consultas</a>
						<ul class="submenu">
							<li><a id="progItems" href="#">Prog. Items</a></li>
						</ul>
					</li>
					<li>
						<a id="usuarios" href="#">Usuarios</a>
						<ul class="submenu">
							<li><a id="crear" href="layout/crear_usuario.php">Crear Usuario</a></li>
							<li><a id="ver" href="layout/ver_usuarios.php">Ver Usuarios</a></li>
						</ul>
					</li>
					<li><a id="cerrarSesion" href="index.php">Cerrar Sesion</a></li>
				</ul>
      </div>
      <div class="clr"></div>
    </div>
  </div>
  <div class="content_resize" align="center">
      <input id="usuario" type="hidden" value="<?php echo $_SESSION["usuario"]?>" />
      <input id="tipo" type="hidden" value="<?php echo $_POST["tipo"]?>" />
      <input id="centroP" type="hidden" value="<?php echo $_POST["centro"]?>" />
      <div class="mainbar" id="contenido">
      	<img src="images/fondo_essalud.png" width="650" height="450" />
      </div>
      <div class="clr"></div>
  </div>
  <div class="fbg">
    <div class="fbg_resize">
      <div class="clr"></div>
    </div>
  </div>
  <div class="footer">
    <div class="footer_resize"> Contactenos   Direccion:jr Aymaras 139    Telefono: 950450528    E-mail: nelson01_tk@essalud.com
      <p class="lf">&copy; Copyright <a href="#">MyWebSite</a>.</p>
      <p class="rf">Design by Dream <a href="http://www.dreamtemplate.com/">Web Templates</a></p>
      <div style="clear:both;"></div>
    </div>
  </div>
</div>
</html>
<?php }else{?>
<?php 	header('Location: /menu/Lampa.php');?> 
<?php }?>

