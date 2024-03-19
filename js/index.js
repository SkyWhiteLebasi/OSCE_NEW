// JavaScript Document
$(document).ready(function(){
	var pagina = "mision.php";
	$('#contenido').load(pagina);
	$('#mision,#mision2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#vision,#vision2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#organigrama,#organigrama2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#telefonos,#telefonos2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	//CENTROS ASISTENCIALES
	$('#Juliaca,#Juliaca2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Lampa,#Lampa2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Azangaro,#Azangaro2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Policlinico_Juliaca,#Policlinico_Juliaca2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Ayaviri,#Ayaviri2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Huancane,#Huancane2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Sandia,#Sandia2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#San_Rafael,#San_Rafael2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Macusani,#Macusani2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	// PRENSA
	$('#Comunicados,#Comunicados2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Actividades,#Actividades2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Publicaciones,#Publicaciones2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#Contactenos,#Contactenos2').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
});