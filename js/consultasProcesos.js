// JavaScript Document
$(document).ready(function(e){
	// llenamos todos los procesos 
	
	$.ajax({
		type: 'POST',
		url: 'lib/expedientes.php',
		data: {"operacion":"consultas"},
		dataType: 'json',
		success: function(data){
			var $tabla = $('#listaProcesos tbody');
			$.each(data, function(indice,valor){
				var filaNueva = $('<tr>');
				var nroProc = $('<td>',{'align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.nroProc}));
				var objeto = $('<td>',{'align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.objeto}));
				var proceso = $('<td>',{'align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.proceso}));
				var monto = $('<td>',{'align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.monto}));
				var fecha = $('<td>',{'align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.fecha}));
				var responsable = $('<td>',{'width':'150px','align':'left'}).append($('<label>',{'class':"etiquetaExp",'text':valor.responsable}));
				var descripcion = $('<td>',{'width':'300px','align':'left'}).append($('<label>',{'class':"etiquetaExp",'text':valor.descripcion}));
				var observacion = $('<td>',{'width':'200px','align':'left'}).append($('<label>',{'class':"etiquetaExp",'text':valor.observacion}));

				filaNueva.append(nroProc,objeto,proceso,monto,fecha,responsable,descripcion,observacion);
				$tabla.append(filaNueva);
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