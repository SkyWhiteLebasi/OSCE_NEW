// JavaScript Document
$(document).ready(function(){
	$("ul.submenu").parent().append("<span></span>"); //Only shows drop down trigger when js is enabled (Adds empty span tag after ul.subnav*)
	$("ul.topmenu li span").click(function() { //When trigger is clicked...
		//Following events are applied to the subnav itself (moving subnav up and down)
		$(this).parent().find("ul.submenu").slideDown('fast').show(); //Drop down the subnav on click
		$(this).parent().hover(function() {
		}, function(){	
			$(this).parent().find("ul.submenu").slideUp('slow'); //When the mouse hovers out of the subnav, move it back up
		});
		//Following events are applied to the trigger (Hover events for the trigger)
		}).hover(function() { 
			$(this).addClass("subhover"); //On hover over, add class "subhover"
		}, function(){	//On Hover Out
			$(this).removeClass("subhover"); //On hover out, remove class "subhover"
	}); 
	// creamos todas las aplicaciones para los usuarios 
	// para archivo de procesos
	$('#archivos,#ctrlProcesos,#pac,#ctrlConsumo,#parametros,#consultas,#usuarios').on('click',function(evento){
		evento.preventDefault();
	});
	$('#maestro').on('click',function(evento){
		evento.preventDefault();
		var pagina = $('#maestro').attr('href');
		$('#contenido').load(pagina);
	});
	$('#centroCost').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#archProc').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#conProc').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#segProc').on('click',function(evento){
		evento.preventDefault();
	});
	$('#cargarPAC').on('click',function(evento){
		evento.preventDefault();
		if(privilegios()){
			var pagina = $(this).attr('href');
			$('#contenido').load(pagina);
		}
	});
	$('#topes').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#correlativos').on('click',function(evento){
		evento.preventDefault();
		if(privilegios()){
			var pagina = $(this).attr('href');
			$('#contenido').load(pagina);
		}
	});
	$('#progItems').on('click',function(evento){
		evento.preventDefault();
	});
	$('#centro').on('click',function(evento){
		evento.preventDefault();
		if(privilegios()){
			var pagina = $('#centro').attr('href');
			$('#contenido').load(pagina);
		}
	});
	$('#crear').on('click',function(evento){
		evento.preventDefault();
		if(!privilegios()){
			return;
		}
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#ver').on('click',function(evento){
		evento.preventDefault();
		if(!privilegios()){
			return;
		}
		var pagina = $(this).attr('href');
		$('#contenido').load(pagina);
	});
	$('#cerrarSesion').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		if(confirm("Desea Salir del Sistema de Adquicisiones?")){
			$(location).attr('href',pagina);
		}
	});
	function privilegios(){
		var tipo = parseInt($('#tipo').val());
		if(tipo==1){
			return true;
		}else{
			//blequeamos para crear usuarios
			//$('#crear').css('pointer-events','none');
			alert("Ingrese como Administrador");
			return false;
		}
	}
});