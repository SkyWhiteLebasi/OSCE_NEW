// JavaScript Document
$(document).ready(function(e){
	// obtenemos el centro de asistencia local
	$('#prefijo').text($('#centroP').val()+"_");
	// cuando se desea crear un usuario del sistema
    $('#nuevo').on('click',function(evento){
		evento.preventDefault();
		// PONESMO LA LISTA COMO TRABAJADOR
		var prefijo = $('#prefijo').text();
		var tipoUsuario = $('#tipoUsuario');
		var usuario = $('#usuarioNuevo');
		var password = $('#passNuevo');
		var rePassword = $('#repassNuevo');
		var nombre = $('#nombre');
		var apellidoPaterno = $('#apellidoPaterno');
		var apellidoMaterno = $('#apellidoMaterno');
		var dni = $('#dni');
		var telefono = $('#telefono');
		// comprobamos que se haya ingresado contenido
		if(usuario.val()==""){
			alert("Ingrese un Usuario");
			return;
		}else if(password.val()==""){
			alert("Ingrese la Contraseña");
			return;
		}else if(rePassword.val()==""){
			alert("Ingrese otra vez la Contraseña");
			return;
		}else if(nombre.val()==""){
			alert("Ingrese el nombre");
			return;
		}else if(apellidoPaterno.val()==""){
			alert("Ingrese el Apellidos Paterno");
			return;
		}else if(apellidoMaterno.val()==""){
			alert("Ingrese el Apellidos Materno");
			return;
		}else if(dni.val()==""){
			alert("Ingrese el DNI");
			return;
		}else if(telefono.val()==""){
			alert("Ingrese el Numero Telefonico");
			return;
		}
		// valiamos las contraseñas
		if(password.val()!=rePassword.val()){
			alert("Las Constraseñas no Coinciden");
			return;
		}
		// buscamos si existe ese usuario
		var usuarioSistema = prefijo+usuario.val();
		$.ajax({
			type: 'POST',
			url: 'lib/consultas.php',
			data: {"operacion":"buscar","usuario":usuarioSistema},
			dataType: 'json',
			success: function(data){
				if(usuarioSistema==data){
					// mandamos a la pagina asu destino
					alert("el usuario ya existe");
					return;
				}else{
					crearUsuario();
				}
			},
			error: function(e){
				alert("Ha ocurrido un problema");
			}
		});
		// si el usuario es unico entonces creamos al usuario
		function crearUsuario(){
			$.ajax({
				type: 'POST',
				url: 'lib/consultas.php',
				data: {
					"operacion":"crear",
					"tipoUsuario":tipoUsuario.val(),
					"usuario":usuarioSistema,
					"pass":password.val(),
					"nombre":nombre.val(),
					"apellidoP":apellidoPaterno.val(),
					"apellidoM":apellidoMaterno.val(),
					"dni":dni.val(),
					"telefono":telefono.val()
				},
				dataType: 'json',
				success: function(data){
					alert("El Usuario fue Creado Correctamente.");
					//limpiamos los campos
					usuario.val("");
					password.val("");
					rePassword.val("");
					nombre.val("");
					apellidoPaterno.val("");
					apellidoMaterno.val("");
					dni.val("");
					telefono.val("");
				},
				error: function(e){
					alert("Ha ocurrido un problema");
				}
			});
		}
	});
});