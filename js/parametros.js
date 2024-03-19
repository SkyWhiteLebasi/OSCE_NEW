// JavaScript Document
$(document).ready(function(){
	$.ajax({
		type: 'POST',
		url: 'lib/consultas.php',
		data: {"operacion":"correlativos"},
		dataType: 'json',
		success: function(data){
			llenarCorrelativos(data);
		},
		error:function(e){
			alert("Ha ocurrido un problema");
		}
	});
	function llenarCorrelativos(datos){
		$.each(datos,function(indice,valor){
			$('#'+valor.clave).val(valor.correlativo);
		});
	}
	$('#guardar').on('click',function(evento){
		evento.preventDefault();
		alert("guardamos los nuevo correlativos");
	})
	$('#cerrar').on('click',function(evento){
		evento.preventDefault();
		$('#contenido').load("");
	})
});