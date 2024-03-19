// JavaScript Document
$(document).ready(function(){
	// creamos las fuciones para llenar el formuario
	$('#cerrar').on('click',function(evento){
		evento.preventDefault();
		var contenido = $('#contenido');
		contenido.children().remove();
		var imagen = $('<img>',{src:"images/fondo_essalud.png",width:"650",height:"450"});
		contenido.append(imagen);
	});
});

