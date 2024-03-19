// JavaScript Document
$(document).ready(function(e){
	// mostraremos todos los usuarios de lsistema 
	// esta opcion solo esta disponible para administradores
	$.ajax({
		type: 'POST',
		url: 'lib/ver_usuarios.php',
		data: {"operacion":"usuarios"},
		dataType: 'json',
		success: function(data){
			var contenedor = $('#listaUsuarios');
			$.each(data, function(indice,valor){	
				var filaNueva = $('<tr>');
				filaNueva.append($('<td>',{'text':valor.nombre_usuario,'class':'etiquetaExp','id':"nombre"+valor.codigo}));
				filaNueva.append($('<td>',{'text':valor.apellido_paterno,'class':'etiquetaExp','id':"ap"+valor.codigo}));
				filaNueva.append($('<td>',{'text':valor.apellido_materno,'class':'etiquetaExp','id':"am"+valor.codigo}));
				filaNueva.append($('<td>',{'text':valor.DNI_usuario,'class':'etiquetaExp','id':"dni"+valor.codigo}));
				filaNueva.append($('<td>',{'text':valor.telefono,'class':'etiquetaExp','id':"telefono"+valor.codigo}));
				filaNueva.append($('<td>',{'text':valor.cuenta_usuario,'class':'etiquetaExp','id':"cuenta"+valor.codigo}));
				var tipo = $('<td>',{'text':valor.nom_tipo_usuario,'class':'etiquetaExp','id':"tipo"+valor.codigo});
				tipo.append($('<input>',{'type':"hidden",'value':valor.tipoU,'id':"tipoU"+valor.codigo}));
				filaNueva.append(tipo);
				var operaciones = $('<td>');
				var imgModificar = $('<img>',{'src':"images/modificarlisto.jpg",'width':"15",'height':"14"});
				var modificar = $('<a>',{'id': valor.codigo,'class':"botonExp",'href': "layout/modificar_usuario.php",'click': modificarUsuario});
				modificar.append(imgModificar);
				modificar.append("Modificar");
				var imgEliminar = $('<img>',{'src':"images/eliminarlisto.jpg",'width':"15",'height':"14"});
				var eliminar = $('<a>',{'id': valor.codigo,'class': "botonExp",'href': "#",'click': eliminarUsuario});
				eliminar.append(imgEliminar);
				eliminar.append("Eliminar");
				operaciones.append(modificar);
				operaciones.append(eliminar);
				filaNueva.append(operaciones);
				contenedor.append(filaNueva);
			});
		},
		error:function(e){
			alert("Ha ocurrido un problema");
		}
	});
	function modificarUsuario(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		var codigo = $(this).attr('id');
		var $ventana = $('<div>',{'class':"clsVentana"});
		$ventana.css({'width':"500px",'margin-left':"-250px"});
		//obtenemos los datos del usuario a modificar
		var nombre = $('#nombre'+codigo).text();
		var ap = $('#ap'+codigo).text();
		var am = $('#am'+codigo).text();
		var dni = $('#dni'+codigo).text();
		var telefono = $('#telefono'+codigo).text();
		var cuenta = $('#cuenta'+codigo).text();
		var tipo = $('#tipoU'+codigo).val();
		$ventana.load(pagina,{
			codigo:codigo,
			nombre:nombre,
			ap:ap,
			am:am,
			dni:dni,
			telefono:telefono,
			cuenta:cuenta,
			tipo:tipo
		});
		
		var $overlay = $('<div id="overlay">').css({
			opacity: .5,
			display: 'none'
		});
		$('body').append($overlay);
		$overlay.fadeIn(function(){
			$('body').append($ventana);
			$ventana.fadeIn();
		});
	}
	function eliminarUsuario(evento){
		evento.preventDefault();
		var $fila = $($(this).parents().get(1));
		var codigo = $(this).attr('id');
		if(confirm("Desea Eliminar este Usuario")){
			$.ajax({
				type: 'POST',
				url: 'lib/ver_usuarios.php',
				data: {"operacion":"eliminar",codigo:codigo},
				dataType: 'json',
				success: function(data){
					$fila.fadeOut(250);
				},
				error:function(e){
					alert("Ha ocurrido un problema");
				}
			});
		}
		// eliminamos el usuario
	}
});