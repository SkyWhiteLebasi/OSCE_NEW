// JavaScript Document
$(document).ready(function(e){
	$('#nro_proceso').text($('#nro_expe').text());
	$('#fecha_creado').text($('#fecha').text());
	$('#objeto_creado').text($('#contratos option:selected').text());
	$('#proceso_creado').text($('#procesos option:selected').text());
	$('#valor_creado').text($('#valor').val()+"/S.");
	$('#responsable_creado').text($('#responsable').text());
	$('#descripcion_creado').text($('#descripcion').val());
	$('#observacion_creado').text($('#observacion').val());
	$('.cerrar').on('click',function(evento){
		evento.preventDefault();
		var $ventana = $($(this).parents().get(1));
		$ventana.fadeOut(300,function(){
			$(this).remove();
			$('#overlay').fadeOut(500,function(){
				$(this).remove();
			});
		});
	});
	//$('#nuevo').click();
});	