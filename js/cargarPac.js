// JavaScript Document
$(document).ready(function(e){
	$('#importar').on('click',function(evento){
		evento.preventDefault();
		if(confirm("Desea Importar el Archivo Excel como Datos de PAC?")){
			var datos = new FormData();
			datos.append('archivo',$('#excel')[0].files[0]);
			$.ajax({
      			type:"POST",
      			dataType:"json",
      			url:"lib/importarExcel.php",      					
      			contentType:false,
				data:datos,
				processData:false,
				cache:false,
				success: function(respuesta){
					if(respuesta.estado){
						var tabla = $('#listaProcesos');
						$.each(respuesta.datos, function(indice,fila){
							var filaNueva = $('<tr>');
							var nroProceso = $('<td>').text(fila.nroProceso);
							var objeto = $('<td>').text(fila.objeto);
							var proceso = $('<td>').text(fila.tipoProceso);
							var costoRef = $('<td>').text(fila.costoReferencial);
							var fecha = $('<td>').text(fila.fecha);
							var responsable = $('<td>').text(fila.responsable);
							var cuentaPac = $('<td>').text(fila.cuentaPac);
							var especificacion = $('<td>').text(fila.especificacion);
							var observacion = $('<td>').text(fila.observacion);
							filaNueva.append(nroProceso,objeto,proceso,costoRef,fecha,responsable,cuentaPac,especificacion,observacion);
							tabla.append(filaNueva);
						});
						alert(respuesta.mensaje);	
					}else{
						alert(respuesta.mensaje);
					}
				},
				error:function(e){
					alert("Ha Ocurrido un Problema al Importar el Archivo Excel");
				}
      		});
		}
	});
});