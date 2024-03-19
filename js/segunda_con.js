// JavaScript Document
$(document).ready(function(){
	// llenamo la tabla 
	$.ajax({
		type: 'POST',
		url: 'lib/segunda_con.php',
		data: {"operacion":"segCon",
				"proceso":$('#procesos').val(),
				"contrato":$('#contratos').val()},
		dataType: 'json',
		success: function(data){
			var $tabla = $('#contSeg');
			var estiloTR = "";
			var i = 0;
			$.each(data, function(indice,valor){
				// para decidir el estilo de cada fila
				if(i%2==0){
					estiloTR = "filaPar";
				}else{
					estiloTR = "filaImpar";
				}	
				var trs = $('<tr></tr>',{class:estiloTR});
				var tdRadio = $('<td><input type="radio" name="seleccion" value="desc'+valor.nro_pac+'"/></td>');
				trs.append(tdRadio);
				var tdNro = $('<td>'+valor.nro_proceso+'</td>');
				trs.append(tdNro);
				var tdProc = $('<td>'+valor.siglas+'</td>');
				trs.append(tdProc);
				var tdCont = $('<td>'+valor.nombre+'</td>');
				trs.append(tdCont);
				var tdEspe = $('<td id="desc'+valor.nro_pac+'">'+valor.espe+'</td>');
				trs.append(tdEspe);
				var tdCon = $('<td>'+valor.convo+'</td>');
				trs.append(tdCon);
				var tdMes = $('<td>'+valor.mes+'</td>');
				trs.append(tdMes);
				var tdValor = $('<td>'+valor.valor+'</td>');
				trs.append(tdValor);
				$tabla.append(trs);
			});
		},
		error:function(e){
			alert("Ha ocurrido un problema");
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
		var $seleccion = $("input[name='seleccion']:checked").val();
		// ponemos la descripcion de el objetos seleccionado en la descripcion
		if($seleccion!=null){
			$('#descripcion').val($('#'+$seleccion).text());
			$('#cuentaPac').val(2);
		}
		$('.cerrar').click();
	});
});