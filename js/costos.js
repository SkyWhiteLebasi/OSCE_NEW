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
			$.each(data, function(indice,valor){
				$('#contratos').append(new Option(valor.nombre,valor.id, true, true));
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
		var contrato = $('#contratos').val();
		var trs = $('#topes').find('tr:not(:first)');
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
		alert("Los Topes se Actualizaron Correctamente")
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
				$('#topes tr:not(:first)').remove();
				var $tabla = $('#topes');
				$.each(data, function(indice,valor){
					// cremos las filas 
					var $tr = $('<tr>',{id:valor.contrato});
					var tdNombre = $('<td>');
					var tdProceso = $('<td>');
					var tdValorInf = $('<td>');
					var tdValorSup = $('<td>');
					var nombre = $('<label>',{class:"etiquetaExp"}).text(valor.nombre);
					var proceso = $('<input/>',{type:"hidden",id:"proc"+valor.proceso,value:valor.proceso});
					if(valor.valorInf!=null){
						var valorInf = $('<input/>',
							{type:"text",
							class:"entrada",
							id:"inf"+valor.proceso,
							value:valor.valorInf}).attr('size',10);
						valorInf.validCampo('0123456789');
						// restringimos si el tipo de usuario es trabajador
						if(tipo == 2){ // trabajador
							valorInf.attr('disabled','disabled');
						}
					}
					if(valor.valorSup!=null){
						var valorSup = $('<input/>',
							{type:"text",
							class:"entrada",
							id:"sup"+valor.proceso,
							value:valor.valorSup}).attr('size',10);
						valorSup.validCampo('0123456789');
						if(tipo == 2){// trabajador
							valorSup.attr('disabled','disabled');
						}
					}
					tdNombre.append(nombre);
					tdProceso.append(proceso);
					tdValorInf.append(valorInf);
					tdValorSup.append(valorSup);
					
					$tr.append(tdNombre);
					$tr.append(tdProceso);
					$tr.append(tdValorInf);
					$tr.append(tdValorSup);
					$tabla.append($tr);
					//alert(valor.nombre);
				});
			},
			error:function(e){
				alert("Ha ocurrido un problema");
			}
		});
	}
});