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
	// obtenemos el tipo de usuario
	var tipo = $('#tipo').val();
	// obtenemos los limites superiores
	$.ajax({
		type: 'POST',
		url: 'lib/consultas.php',
		data: {"operacion":"contratos"},
		dataType: 'json',
		success: function(data){
			$.each(data, function(indice,registro){
				$('#contratos').append($('<option>',{'value':registro.id,'text':registro.nombre}));
			});
			llenarTabla($('#contratos').val());
		},
		error:function(e){
			alert("Ha ocurrido un problema");
		}
	});
	// llenamos el contenido de la tabla con el valor por defecto
	$("#contratos").change(function(){
		llenarTabla($('#contratos').val());
	});
	$('#guardar').on('click',function(evento){
		evento.preventDefault();
		if(confirm("Desea cambiar el Valor de los Tope?")){
			var contrato = $('#contratos').val();
			var trs = $('#listaTopes').find('tr:not(:first)');
			trs.each(function(index){
				var inputs = $(this).find('input');
				var proceso = "null";
				var inferior = "null";
				var superior = "null";
				inputs.each(function(index){
					var id = $(this).attr('id');
					var valor = $(this).val();
					if(id=="proc"+valor){
						proceso = valor;
					}else if(id=="inf"+proceso){
						inferior = valor;
					}else if(id=="sup"+proceso){
						superior = valor;
					}
				});
				$.ajax({
					type: 'POST',
					url: 'lib/costos.php',
					data: {"operacion":"actTopes",
							"contrato":contrato,
							"proceso":proceso,
							"inferior":inferior,
							"superior":superior
					},
					dataType: 'json',
					success: function(data){
					},
					error:function(e){
						alert("Ha ocurrido un problema");
						return;
					}
				});
			});
			alert("Los Topes se Actualizaron Correctamente");
		}
	});
	function llenarTabla(datos){
		// llenamos los topes del tipo de proceso
		$.ajax({
			type: 'POST',
			url: 'lib/costos.php',
			data: {"operacion":"topes",
					"contrato":datos
			},
			dataType: 'json',
			success: function(data){
				//$('#topes tr:not(:first)').remove();
				var contenedor = $('#listaTopes tbody');
				contenedor.children().remove();
				$.each(data, function(indice,registro){
					// cremos las filas 
					var filaNueva = $('<tr>',{'id':registro.contrato});
					var nombre = $('<td>').append($('<label>',{'class':'etiquetaExp'}).text(registro.nombre));
					nombre.append($('<input>',{'type':'hidden','id':'proc'+registro.proceso,'value':registro.proceso}));
					//var tdProceso = $('<td>');
					var cajaInf = $('<td>');
					var cajaSup = $('<td>');
					//var nombre = $('<label>',{'class':'etiquetaExp'}).text(registro.nombre);
					//var proceso = $('<input/>',{'type':'hidden','id':'proc'+registro.proceso,'value':registro.proceso});
					if(registro.valorInf!=null){
						var valorInf = $('<input/>',
							{'type':"text",
							'class':"entrada",
							'id':"inf"+registro.proceso,
							'value':registro.valorInf}).attr('size',10);
						valorInf.validCampo('0123456789');
						// restringimos si el tipo de usuario es trabajador
						if(tipo == 2){ // trabajador
							valorInf.attr('disabled','disabled');
						}
					}
					if(registro.valorSup!=null){
						var valorSup = $('<input/>',
							{'type':"text",
							'class':"entrada",
							'id':"sup"+registro.proceso,
							'value':registro.valorSup}).attr('size',10);
						valorSup.validCampo('0123456789');
						if(tipo == 2){// trabajador
							valorSup.attr('disabled','disabled');
						}
					}
					cajaInf.append(valorInf);
					cajaSup.append(valorSup);
					
					filaNueva.append(nombre,cajaInf,cajaSup);
					contenedor.append(filaNueva);
					//alert(valor.nombre);
				});
			},
			error:function(e){
				alert("Ha ocurrido un problema");
			}
		});
	}
});