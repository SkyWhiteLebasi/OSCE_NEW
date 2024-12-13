// JavaScript Document
// (function(a){
// 	a.fn.validCampo=function(b){
// 		a(this).on({keypress:function(a){
// 			var c=a.which,d=a.keyCode,e=String.fromCharCode(c).toLowerCase(),f=b;
// 			(-1!=f.indexOf(e)||9==d||37!=c&&37==d||39==d&&39!=c||8==d||46==d&&46!=c)&&161!=c||a.preventDefault()
// 		}})
// 	}
// })(jQuery);
(($) => {
    $.fn.validCampo = function(validChars) {
        $(this).on({
            keypress: function(event) {
                const key = event.which;
                const char = String.fromCharCode(key).toLowerCase();
                const keyCode = event.keyCode;
                const allowedChars = validChars;
                
                if (
                    allowedChars.includes(char) ||
                    key === 9 || // Tab
                    (key === 37 && keyCode !== 37) || // Left arrow and not a decimal point
                    (keyCode === 39 && key !== 39) || // Right arrow and not a decimal point
                    key === 8 || // Backspace
                    (key === 46 && keyCode !== 46) // Decimal point
                ) {
                    return; // Allow
                }
                
                if (key !== 161) { // Check for "¡" character
                    event.preventDefault();
                }
            }
        });
    };
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
		// console.log($('contratos'));
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
			type: 'POST', // Tipo de solicitud HTTP
			url: 'lib/costos.php', // URL a la que se enviará la solicitud AJAX
			data: {"operacion":"topes", "contrato":datos}, // Datos que se enviarán con la solicitud POST
			dataType: 'json', // Tipo de datos esperados en la respuesta (en este caso, JSON)
	
			success: function(data){ // Función que se ejecutará si la solicitud es exitosa
				//$('#topes tr:not(:first)').remove(); // Remover filas existentes si es necesario
				var contenedor = $('#listaTopes tbody'); // Seleccionar el contenedor de la tabla
				contenedor.children().remove(); // Eliminar todos los hijos del contenedor (limpiar la tabla)
				$.each(data, function(indice,registro){ // Iterar sobre los datos recibidos
					// Crear una nueva fila de la tabla
					var filaNueva = $('<tr>',{'id':registro.contrato});
					var nombre = $('<td>').append($('<label>',{'class':'etiquetaExp'}).text(registro.nombre)); // Crear un elemento label con la clase 'etiquetaExp' y el texto del nombre
					nombre.append($('<input>',{'type':'hidden','id':'proc'+registro.proceso,'value':registro.proceso})); // Agregar un input oculto para almacenar el valor del proceso
					var cajaInf = $('<td>'); // Crear un nuevo td para el tope inferior
					var cajaSup = $('<td>'); // Crear un nuevo td para el tope superior
	
					// Verificar si hay un valor para el tope inferior en el registro actual
					if(registro.valorInf!=null){
						var valorInf = $('<input/>',{'type':"text", 'class':"entrada", 'id':"inf"+registro.proceso, 'value':registro.valor_inf}).attr('size',10); // Crear un input para el tope inferior
						valorInf.validCampo('0123456789'); // Llamar a la función validCampo para limitar la entrada a números
						// Restringir el input si el tipo de usuario es trabajador (tipo 2)
						if(tipo == 2){ // trabajador
							valorInf.attr('disabled','disabled'); // Deshabilitar el input
						}
					}
					// Verificar si hay un valor para el tope superior en el registro actual
					if(registro.valorSup!=null){
						var valorSup = $('<input/>',{'type':"text", 'class':"entrada", 'id':"sup"+registro.proceso, 'value':registro.valor_sup}).attr('size',10); // Crear un input para el tope superior
						valorSup.validCampo('0123456789'); // Llamar a la función validCampo para limitar la entrada a números
						// Restringir el input si el tipo de usuario es trabajador (tipo 2)
						if(tipo == 2){// trabajador
							valorSup.attr('disabled','disabled'); // Deshabilitar el input
						}
					}
					// Adjuntar los inputs de tope inferior y superior a los respectivos contenedores
					cajaInf.append(valorInf);
					cajaSup.append(valorSup);
	
					// Adjuntar todos los elementos creados a la nueva fila de la tabla
					filaNueva.append(nombre,cajaInf,cajaSup);
					// Adjuntar la nueva fila a la tabla
					contenedor.append(filaNueva);
				});
			},
			error:function(e){ // Función que se ejecutará si la solicitud tiene errores
				alert("Ha ocurrido un problema"); // Mostrar un mensaje de alerta indicando el problema
			}
		});
	}
});