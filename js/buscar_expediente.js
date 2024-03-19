// JavaScript Document
jQuery.fn.extend({
    resaltar: function(busqueda, claseCSSbusqueda){
        var regex = new RegExp("(<[^>]*>)|("+ busqueda.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +')', 'ig');
        var nuevoHtml=this.html(this.html().replace(regex, function(a, b, c){
            return (a.charAt(0) == "<") ? a : "<span class=\""+ claseCSSbusqueda +"\">" + c + "</span>";
        }));
        return nuevoHtml;
    }
});
$(document).ready(function(e){
	$('#aceptar').css('pointer-events','none');
	$('#segun').change(function(evento){
		evento.preventDefault();
		var entrada = $('#entrada');
		entrada.children().remove();
		var valor = $(this).val();
		if(valor=="1"){
			entrada.append($('<input>',{'type':"text",'id':"valorBuscar",'class':"entrada"}));
		}else if(valor=="2"){
			var valorBuscar = $('<input>',{'type':"text",'id':"valorBuscar",'class':"entrada"});
			var texto = $('<strong>',{'text':"(dd/mm/aa)"});
			entrada.append(valorBuscar,texto);
		}else if(valor=="3"){
			var valorBuscar = $('<select>',{'id':"valorBuscar",'class':"entrada"});
			$.ajax({
				type: 'POST',
				url: 'lib/consultas.php',
				data: {"operacion":"contratos"},
				dataType: 'json',
				success: function(data){
					$.each(data, function(indice,registro){
						valorBuscar.append($('<option>',{'value':registro.id,'text':registro.nombre}));
					});
				},
				error:function(e){
					alert("Ha ocurrido un problema");
				}
			});
			entrada.append(valorBuscar);
		}else if(valor=="4"){
			var valorBuscar = $('<select>',{'id':"valorBuscar",'class':"entrada"});
			$.ajax({
				type: 'POST',
				url: 'lib/consultas.php',
				data: {"operacion":"procesosBuscar"},
				dataType: 'json',
				success: function(data){
					$.each(data, function(indice,registro){
						valorBuscar.append($('<option>',{'value':registro.clave,'text':registro.nombre}));
					});
				},
				error:function(e){
					alert("Ha ocurrido un problema");
				}
			});
			entrada.append(valorBuscar);
		}else if(valor=="5"){
			entrada.append($('<input>',{'type':"text",'id':"valorBuscar",'class':"entrada"}));
		}else if(valor=="6"){
			entrada.append($('<input>',{'type':"text",'id':"valorBuscar",'class':"entrada"}));
		}
	});
	$('#buscarExp').on('click',function(evento){
		evento.preventDefault();
		var condicion = $('#segun').val();
		var valor = $('#valorBuscar').val();
		$.ajax({
			type: 'POST',
			url: 'lib/expedientes.php',
			data: {"operacion":"buscarExp","condicion":condicion,"valor":valor},
			dataType: 'json',
			success: function(data){
				var $tabla = $('#contSeg tbody');
				$tabla.children().remove();
				$.each(data, function(indice,entidad){
					var filaNueva = $('<tr>');
					var radio = $('<td>').append($('<input>',{'type':"radio",'name':"seleccion",'value':entidad.nroProceso}));
					radio.append($('<input>',{'type':"hidden",'id':"inc"+entidad.nroProceso,'value':entidad.indice}));
					var nroProceso = $('<td>',{'text':entidad.nroProceso});
					var proceso = $('<td>',{'text':entidad.proceso}).append($('<input>',{'type':"hidden",'id':"proc"+entidad.nroProceso,'value':entidad.clave}));
					var objeto = $('<td>',{'text':entidad.objeto}).append($('<input>',{'type':"hidden",'id':"cont"+entidad.nroProceso,'value':entidad.id}));
					var monto = $('<td>',{'text':entidad.monto,'id':"monto"+entidad.nroProceso});
					var fecha = $('<td>',{'text':entidad.fecha,'id':"fecha"+entidad.nroProceso});
					var responsable = $('<td>',{'text':entidad.responsable,'id':"res"+entidad.nroProceso});
					var cuentaPac = $('<td>',{'text':entidad.cuentaPac,'id':"cuenta"+entidad.nroProceso});
					var descripcion = $('<td>',{'text':entidad.descripcion,'id':"desc"+entidad.nroProceso});
					// si estamos haciendo la busqueda con palabras claves
					// resaltamos las plabras iguales al la palabra clave
					if(condicion=="6"){
						descripcion.resaltar(valor,"resaltar");
					}
					var observacion = $('<td>',{'text':entidad.observacion,'id':"obs"+entidad.nroProceso});
					filaNueva.append(radio,nroProceso,proceso,objeto,monto,fecha,responsable,cuentaPac,descripcion,observacion);
					$tabla.append(filaNueva);
				});
			},
			error:function(e){
				alert("Ha ocurrido un problema en la Busqueda de Expedientes");
			}
		});
		$('#aceptar').css('pointer-events','auto');
	});
	$('#aceptar').on('click',function(evento){
		evento.preventDefault();
		var $seleccion = $("input[name='seleccion']:checked").val();
		// ponemos la descripcion de el objetos seleccionado en la descripcion
		if($seleccion!=null){
			$('#nro_expe').text($seleccion);
			$('#reponsable').text($('#res'+$seleccion).text());
			$('#contratos').val($('#cont'+$seleccion).val());
			$('#indice').val($('#inc'+$seleccion).val());
			$.ajax({
				type: 'POST',
				url: 'lib/consultas.php',
				data: {"operacion":"procesos","valor":$('#contratos').val()},
				dataType: 'json',
				async:false,
				success: function(data){
					var procesos = $('#procesos');
					procesos.find('option').remove();
					$.each(data, function(indice,registro){
						procesos.append($('<option>',{'value':registro.clave,'text':registro.nombre}));
					});
					procesos.val($('#proc'+$seleccion).val()).change();
					$('#guardar').css('pointer-events','none');
				},
				error:function(e){
					alert("Ha ocurrido un problema");
				}
			});
			$('#cuentaPac').val($('#cuenta'+$seleccion).text());
			$('#valor').val($('#monto'+$seleccion).text());
			$('#descripcion').val($('#desc'+$seleccion).text());
			$('#observacion').val($('#obs'+$seleccion).text());
			// bloqueamos el boton guardar para que no se cree un nuevo expediente y los select contratos y procesos
			$('#contratos').css('pointer-events','none');
			$('#procesos').css('pointer-events','none');
			// habilitamos la opcion de modificar solo para los procesos que no sean "procesos directos"
			if($('#proc'+$seleccion).val()!='N'){
				$('#modificar').css('pointer-events','auto');
				$('#nuevaConvo').css('pointer-events','auto');
			}
		}
		$('.cerrar').click();
	});
	$('.cerrar').on('click',function(evento){
		evento.preventDefault();
		var $ventana = $($(this).parents().get(1));
		$ventana.fadeOut(300,function(){
			$(this).remove();
			$('#overlay').fadeOut(500,function(){
				$(this).remove();
			});
		});
	});
});