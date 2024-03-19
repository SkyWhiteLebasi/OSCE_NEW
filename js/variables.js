// JavaScript Document
(function(a){
	a.fn.validCampo=function(b){
		a(this).on({keypress:function(a){
			var c=a.which,d=a.keyCode,e=String.fromCharCode(c).toLowerCase(),f=b;
			(-1!=f.indexOf(e)||9==d||37!=c&&37==d||39==d&&39!=c||8==d||46==d&&46!=c)&&161!=c||a.preventDefault()
		}})
	}
})(jQuery);
$(document).ready(function(e){
	// obtenemos los limites superiores
	$.ajax({
		type: 'POST',
		url: 'lib/variables.php',
		data: {"operacion":"variables"},
		dataType: 'json',
		success: function(data){
			var $tabla = $('#variables');
			$.each(data, function(indice,registro){
				var nuevaFila = $('<tr>');
				var nombre = $('<td>').append($('<label>',{'class':"etiquetaExp",'text':registro.nombre}));
				var valor = $('<td>').append($('<input>',{'type':"text",'class':"entrada",'id':registro.nombre+"Input",'value':registro.valor}).attr("size",10));
				var operaciones = $('<td>').append($('<a>',{'href':"#",'id':registro.nombre,'class':"botonExp",'text':"Guardar",'click':guardarVariable}));
				nuevaFila.append(nombre,valor,operaciones);
				$tabla.append(nuevaFila);
			});
		},
		error:function(e){
			alert("Ha ocurrido un problema");
		}
	});
	function guardarVariable(evento){
		evento.preventDefault();
		if(confirm("Desea Guardar el Nuevo valor de Centro")){
			var nombre = $(this).attr('id');
			var valor = $("#"+nombre+"Input").val();
			var centro = $('#centroP');
			$.ajax({
				type: 'POST',
				url: 'lib/variables.php',
				data: {"operacion":"guardar","nombre":nombre,"valor":valor},
				dataType: 'json',
				success: function(data){
					alert("Se Guardo la Variable");
					centro.val(valor);
				},
				error:function(e){
					alert("Ha ocurrido un problema");
				}
			});
		}
	}
});