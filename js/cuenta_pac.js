// JavaScript Document
$(document).ready(function(){
	// llenamo la tabla 
	$.ajax({
		type: 'POST',
		url: 'lib/segunda_con.php',
		data: {"operacion":"segCon",
				"proceso":$('#procesos').val(),
				"objeto":$('#contratos').val()},
		dataType: 'json',
		success: function(data){
			var $tabla = $('#contSeg');
			$.each(data, function(indice,valor){	
				var filaNueva = $('<tr>');
				var radio = $('<td><input type="radio" name="seleccion" value="'+valor.codigoPac+'"/></td>');
				var nroProceso = $('<td>').text(valor.nroProceso);
				var objeto = $('<td>').text(valor.objeto);
				var proceso = $('<td>').text(valor.proceso);
				var valorRef = $('<td>').text(valor.costoRef);
				var fecha = $('<td>').text(valor.fecha);
				var especificacion = $('<td id="des'+valor.codigoPac+'">'+valor.especificacion+'</td>');
				var observacion = $('<td>').text(valor.observacion);
				filaNueva.append(radio,nroProceso,objeto,proceso,valorRef,fecha,especificacion,observacion);
				$tabla.append(filaNueva);
			});
		},
		error:function(e){
			alert("Ha ocurrido un problema al cargar los Procesos");
		}
	});
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
	$('#aceptarSeg').on('click',function(evento){
		evento.preventDefault();
		var selec = $("input[name='seleccion']:checked").val();
		// ponemos la descripcion de el objetos seleccionado en la descripcion
		if(selec!=null){
			$('#descripcion').val($('#des'+selec).text());
			$('#cuentaPac').val(1);
		}
		$('.cerrar').click();
	});
});