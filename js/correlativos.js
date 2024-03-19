// JavaScript Document
(function(a){
	a.fn.validCampo=function(b){
		a(this).on({keypress:function(a){
			var c=a.which,d=a.keyCode,e=String.fromCharCode(c).toLowerCase(),f=b;
			(-1!=f.indexOf(e)||9==d||37!=c&&37==d||39==d&&39!=c||8==d||46==d&&46!=c)&&161!=c||a.preventDefault()
		}})
	}
})(jQuery);
$(document).ready(function(){
	$.ajax({
		type: 'POST',
		url: 'lib/consultas.php',
		data: {"operacion":"correlativos"},
		dataType: 'json',
		success: function(data){
			var contenedor = $('#correlativosCont');
			$.each(data,function(indice,registro){
				var filaNueva = $('<tr>');
				var nombre = $('<td>',{'align':'left'}).append($('<label>',{'text':registro.nombre,'class':"etiquetaExp"}));
				var valor = $('<td>',{'align':'center'}).append($('<input/>',{'id':registro.clave,'type':"text",'class':"entrada",'value':registro.correlativo}).attr('size',5));
				filaNueva.append(nombre,valor);
				contenedor.append(filaNueva);
			});
		},
		error:function(e){
			alert("Ha ocurrido un problema");
		}
	});
	$('#guardar').on('click',function(evento){
		evento.preventDefault();
		if(confirm("Desea cambiar los Valores de los Correlativos?")){
			$.ajax({
				type:'POST',
				url:'lib/consultas.php',
				data:{"operacion":"actCorre",
					"L":$('#L').val(),
					"C":$('#C').val(),
					"P":$('#P').val(),
					"S":$('#S').val(),
					"M":$('#M').val(),
					"N":$('#N').val()},
				success: function(data){
					alert("Se Guardaron los Nuevos Valores de los Correlativos");
				},
				error: function(errar){
					alert("Sucedio un Problema al Actualizar los Correlativos");
				}
			});
		}
	})
});