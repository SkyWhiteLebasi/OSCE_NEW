// JavaScript Document
$(document).ready(function(){
	// variables que represanta los centros de atencion y el codigo del centro
	var centros = $('#centros');
	var codigo = $('#codigo');
	
	$.ajax({
		type: 'POST',
		url: 'lib/centroCostos.php',
		data: {'operacion':'centros'},
		dataType: 'json',
		success: function(data){
			$.each(data, function(indice,valor){
				centros.append($('<option>',{'value':valor.codcen,'text':valor.descripcion}));
			});
			codigo.text(centros.val());
			llenarDatos(centros.val());
		},
		error:function(e){
			alert("Ha ocurrido un problema");
		}
	});
	// actualizar el codigo del centro
	centros.change(function(){
		codigo.text($(this).val());
		llenarDatos($(this).val());
	});
	function llenarDatos(centro){
		var costos = $('#listaCostos tbody');
		costos.children().remove();
		$.ajax({
			type: 'POST',
			url: 'lib/centroCostos.php',
			data: {'operacion':'costos','centro':centro},
			dataType: 'json',
			success: function(data){
				$.each(data, function(indice,valor){
					var filaNueva = $('<tr>',{'align':'center'});
					var codigoCeco = $('<td>',{'align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.codigo}));
					var descripcion = $('<td>',{'align':'left'}).append($('<label>',{'class':"etiquetaExp",'text':valor.descripcion}));
					var estructura = $('<td>',{'align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.estructura}));
					var sociedad = $('<td>',{'width':'100px','align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.sociedad}));
					var division = $('<td>',{'width':'100px','align':'center'}).append($('<label>',{'class':"etiquetaExp",'text':valor.division}));
					filaNueva.append(codigoCeco,descripcion,estructura,sociedad,division);
					costos.append(filaNueva);
				});
			},
			error: function(e){
				alert('error al ingresar a la base de datos');
			}
		});
	}
});