// JavaScript Document
$(document).ready(function(e){
	var tipoUsuario = $('#tipoTemp').val();
	$('#tipoUsuario').val(tipoUsuario);
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
	$('#modificar').on('click',function(evento){
		evento.preventDefault();
		// obtenemos los  datos del formulario
		var codigo = $('#codigo').val();
		var nombre = $('#nombre').val();
		var apellidoP = $('#apellidoP').val();
		var apellidoM = $('#apellidoM').val();
		var dni = $('#dni').val();
		var telefono = $('#telefono').val();
		var cuenta = $('#cuenta').val();
		var tipo = $('#tipoUsuario').val();
		var pass = $('#pass').val();
		var repass = $('#repass').val();
		// comprovamos si las entradas son diferentes de ""
		if(vacio(nombre)){
			alert("Debe Ingresar su Nombre");
			return;
		}
		if(vacio(apellidoP)){
			alert("Debe ingresar el Apellido Paterno");
			return;
		}
		if(vacio(apellidoM)){
			alert("Debe Ingresar el Apellido Materno");
			return;
		}
		if(vacio(dni)){
			alert("Debe Ingresar el DNI");
			return;
		}
		if(vacio(telefono)){
			alert("Debe Ingresar el Numero Telefonico");
			return;
		}
		if(vacio(cuenta)){
			alert("Debe Ingresar la Cuenta");
			return;
		}
		if(vacio(pass)){
			alert("Debe Ingresar la Contraseña");
			return;
		}else{
			// comprobamos si las ocntraseñas son iguales
			if(pass!=repass){
				alert("Las Contraseñas no son Iguales!");
				return;
			}
		}
		if(confirm("Desea Midificar el Usuario?")){
			$.ajax({
				type: 'POST',
				url: 'lib/ver_usuarios.php',
				data: {
					"operacion":"modificarPass",
					"codigo":codigo,
					"nombre":nombre,
					"apellidop":apellidoP,
					"apellidom":apellidoM,
					"dni":dni,
					"telefono":telefono,
					"cuenta":cuenta,
					"pass":pass,
					"tipo":tipo
				},
				dataType: 'json',
				success: function(data){
					alert("El Usuario se Modifico Correctamente");
				},
				error:function(e){
					alert("Ha ocurrido un problema");
				}
			});
		}
		$('.cerrar').click();
		$('#ver').click();
	});
	function vacio(cadena){
		return cadena=="";
	}
});