// JavaScript Document
$(document).ready(function(){
	$('#ingresar').on('click',function(evento){
		evento.preventDefault();
		var usuario = $('#usuario');
		var password = $('#pass');
		// crompovamos que se haya ingresado contenido
		if(usuario.val()==""){
			alert("Ingrese un Usuario");
			return;
		}else if(password.val()==""){
			alert("Ingrese la Contraseña");
			return;
		}
		// buscamos si el usuario existe
		$.ajax({
			type: 'POST',
			url: 'lib/consultas.php',
			data: {"operacion":"login",
				   "usuario":usuario.val(),
				   "pass":password.val()},
			dataType: 'json',
			success: function(data){
				var estado = 0;
				var tipoUsuario = $('#tipoUsuario');
				var centro = $('#centro');
				var formulario = $('#clientForm');
				$.each(data, function(indice,registro){
					if(usuario.val()==registro.usuario){
						// mandamos a la pagina asu destino
						tipoUsuario.val(registro.tipo);
						centro.val(registro.centro);
						estado = 1;
						formulario.submit();
					}
				});
				if(estado==0){
					alert("el usuario no exite")
					password.val("");
				}
			},
			error: function(e){
				alert("Ha ocurrido un problema");
			}
		});
	});
});

