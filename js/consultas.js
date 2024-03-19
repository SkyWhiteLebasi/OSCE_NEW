// JavaScript Document
$(document).ready(function(e){
	// llenamos todos los procesos 
	$.ajax({
		type: 'POST',
		url: 'lib/expedientes.php',
		data: {"operacion":"consultas"},
		dataType: 'json',
		success: function(data){
			var $tabla = $('#listaProcesos');
			$.each(data, function(indice,valor){
				var tr = $('<tr>');
				var tdNroPac = $('<td>');
				var tdContrato = $('<td>');
				var tdProceso = $('<td>');
				var tdMonto = $('<td>');
				var tdFecha = $('<td>');
				var tdUsuario = $('<td>');
				var tdDescripcion = $('<td>');
				var tdObservacion = $('<td>');
				var nroPac = $('<label>',{class:"etiquetaExp",text:valor.nroPac});
				var contrato = $('<label>',{class:"etiquetaExp",text:valor.contrato});
				var proceso = $('<label>',{class:"etiquetaExp",text:valor.proceso});
				var monto = $('<label>',{class:"etiquetaExp",text:valor.monto});
				var fecha = $('<label>',{class:"etiquetaExp",text:valor.fecha});
				var usuario = $('<label>',{class:"etiquetaExp",text:valor.nombre+" "+valor.apellidoP+" "+valor.apellidoM});
				var descripcion = $('<label>',{class:"etiquetaExp",text:valor.descripcion});
				var observacion = $('<label>',{class:"etiquetaExp",text:valor.observacion});
				tdNroPac.append(nroPac);
				tdContrato.append(contrato);
				tdProceso.append(proceso);
				tdMonto.append(monto);
				tdFecha.append(fecha);
				tdUsuario.append(usuario);
				tdDescripcion.append(descripcion);
				tdObservacion.append(observacion);
				tr.append(tdNroPac);
				tr.append(tdContrato);
				tr.append(tdProceso);
				tr.append(tdMonto);
				tr.append(tdFecha);
				tr.append(tdUsuario);
				tr.append(tdDescripcion);
				tr.append(tdObservacion);
				$tabla.append(tr);
			});
		},
		error:function(e){
			alert("Ha ocurrido un problema");
		}
	});
	$('#exportar').on('click',function(evento){
		evento.preventDefault();
		$('#datos').val($('<div>').append($('#listaProcesos').eq(0).clone()).html());
		$('#exportarExcel').submit();
	});
});