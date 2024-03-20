// // JavaScript Document
// (function(a){
// 	a.fn.validCampo=function(b){
// 		a(this).on({keypress:function(a){
// 			var c=a.which,d=a.keyCode,e=String.fromCharCode(c).toLowerCase(),f=b;
// 			(-1!=f.indexOf(e)||9==d||37!=c&&37==d||39==d&&39!=c||8==d||46==d&&46!=c)&&161!=c||a.preventDefault()
// 		}})
// 	}
// })(jQuery);
// JavaScript Document
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
// variables que guardaran los nombres de los componentes
var TXT_NRO_PROCESO = "#nro_expe";
var TXT_FECHA = "#fecha";
var TXT_RESPONSABLE = "#responsable";
var TXT_TOPE_SUP = "#";
var TXT_TOPE_INF = "#";
var TA_DESCRIPCION = "#descripcion";
var SLT_OBJETO = "#contratos";
var SLT_PROCESO = "#procesos";
var INP_COSTO = "#valor";
var INP_OBSERVACION = "#observacion";
var BTN_NUEVO = "#nuevo";
var BTN_GUARDAR = "#guardar";
var BTN_BUSCAR = "#buscar";
var BTN_MODIFICAR = "#modificar";
var BTN_NUEVA_CONVO = "#nuevaConvo";
var BTN_CERRAR = "#cerrar";
$(document).ready(function(){
	// bloqueamos los botones de modificar y nueva convocatoria 
	$(BTN_MODIFICAR).css('pointer-events','none');
	$(BTN_NUEVA_CONVO).css('pointer-events','none');
	
	// Ingresamos la fecha
    $(TXT_RESPONSABLE).text($('#usuario').val());
    $(INP_OBSERVACION).val("Ninguna");
    $(TA_DESCRIPCION).val("Descripcion");
    const fecha = new Date();
    const usuario = $(TXT_RESPONSABLE).val();
    $(TXT_FECHA).text(`${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`);
    $(INP_COSTO).val("");
    $(INP_COSTO).validCampo('0123456789');
    obtenerCentro();
	// // llenamos los tipos de contratos
	
	$.ajax({
        type: 'POST',
        url: 'lib/consultas.php',
        data: {"operacion":"contratos"},
        dataType: 'json',
        success: function(data) {
            $(SLT_OBJETO).empty();
            $.each(data, function(indice, registro) {
                $(SLT_OBJETO).append($('<option>', {'value': registro.id, 'text': registro.nombre}));
            });
            const objeto = $(SLT_OBJETO).val();
            actualizarProcesos(objeto);
            // Mostramos los topes
        },
        error:function(e){
            alert("Ha ocurrido un problema con los Objetos");
        }
    });
	
	    // Llenamos los tipos de procesos
		$(SLT_OBJETO).change(function() {
			const objeto = $(this).val();
			actualizarProcesos(objeto);
			$(TA_DESCRIPCION).val("Descripcion");
			$(INP_OBSERVACION).val("Ninguna");
			$(BTN_GUARDAR).css('pointer-events', 'auto');
		});

	// Buscamos los límites para el tipo de proceso
    $(SLT_PROCESO).change(function() {
        const objeto = $(SLT_OBJETO).val();
        const proceso = $(this).val();
        actualizarLimites(objeto, proceso);
        obtenerCorrelacional(proceso);
        $(BTN_GUARDAR).css('pointer-events', 'auto');
        cuentaPAC();
    });

	
	$(INP_COSTO).on('click', function(evento) {
        evento.preventDefault();
        $(this).val("");
    });
	
	$(INP_OBSERVACION).on('click',function(evento){
		$(this).val("");
	});

	  // Para crear un nuevo proceso
	  $(BTN_NUEVO).on('click', function(evento) {
        evento.preventDefault();
        // Limpiamos todos los campos
        $(TXT_NRO_PROCESO).text("");
        $(TA_DESCRIPCION).val("Descripcion");
        $(INP_OBSERVACION).val("Ninguna");
        $(INP_COSTO).val("");
        $('#cuentaPac').val("1");
        // Activamos el boton de guardar y los select objeto y proceso
        $(BTN_GUARDAR).css('pointer-events', 'auto');
        $(SLT_OBJETO).prop('disabled', false);
        $(SLT_PROCESO).prop('disabled', false);
        // Bloqueamos los botones de modificar y nueva convocatoria
        $(BTN_MODIFICAR).css('pointer-events', 'none');
        $(BTN_NUEVA_CONVO).css('pointer-events', 'none');
    });
	
	 // Obtenemos los valores para crear el número de expediente
	 $(BTN_GUARDAR).on('click', function(evento) {
        evento.preventDefault();
        const monto = $(INP_COSTO).val();
        const proceso = $(SLT_PROCESO).val();
        const objeto = $(SLT_OBJETO).val();
        const descripcion = $(TA_DESCRIPCION).val();
        const observacion = $(INP_OBSERVACION).val();
        // Verificamos que el valor pasado será diferente de ""
        if (monto === "") {
            alert("Ingrese una Cantidad para Valor");
            return;
        }
        // Verificamos si el valor pasado está entre los topes
        if (compararValor(monto, proceso) !== 1) {
            return;
        }
        // Vemos si tiene una descripción
        if (descripcion === "") {
            alert("Ingrese una Descripción");
            return;
        }
        const fechaTexto = $(TXT_FECHA).text();
        obtenerCorrelacional(proceso);
        let correlativo = parseInt($('#correlativo').val());
        let cuentaPac = $('#cuentaPac').val();
        const responsable = $('#usuario').val();
        const fecha = new Date();
        const anio = fecha.getFullYear() - 2000;
        const centro = $('#centroP').val();
        let numeroExp = "";
        correlativo++;
        const textoCorre = crearCorrelacional(proceso, correlativo);
        if (proceso === 'N' || proceso === 'U') {
            numeroExp = `${anio}${centro}${proceso}${textoCorre}`;
        } else {
            numeroExp = `${anio}${centro}${proceso}${textoCorre}${cuentaPac}`;
        }
        alert(numeroExp);
        if (confirm("¿Desea Crear el Expediente?")) {
            $.ajax({
                type: 'POST',
                url: 'lib/consultas.php',
                data: {
                    "operacion": "nuevoExp",
                    "numeroExp": numeroExp,
                    "objeto": objeto,
                    "proceso": proceso,
                    "monto": monto,
                    "fecha": fechaTexto,
                    "responsable": responsable,
                    "cuentaPac": cuentaPac,
                    "descripcion": descripcion,
                    "observacion": observacion,
                    "correlativo": correlativo
                },
                dataType: 'json',
                success: function(data) {
                    obtenerCorrelacional(proceso);
                    $(TXT_NRO_PROCESO).text(numeroExp);
                    // Anulamos el botón guardar
                    $(BTN_GUARDAR).css('pointer-events', 'none');
                    // Mostramos el expediente creado
                    const pagina = "layout/mostrarResultado.php";
                    const $ventana = $('<div>', {'class': "clsVentana"});
                    $ventana.css({'width': "400px", 'margin-left': "-200px"});
                    $ventana.load(pagina);

                    const $overlay = $('<div>', {'id': "overlay"}).css({
                        opacity: .5,
                        display: 'none'
                    });
                    $('body').append($overlay);
                    $overlay.fadeIn(function() {
                        $('body').append($ventana);
                        $ventana.fadeIn();
                    });
                },
                error:function(e) {
                    alert("Ha Ocurrido un Problema al Crear el Expediente");
                }
            });
        }
    });
	
	$('#buscar').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		var $ventana = $('<div>',{'class':"clsVentana"});
		$ventana.css({'width':"800px",'margin-left':"-400px"});
		$ventana.load(pagina);
		
		var $overlay = $('<div>',{id:"overlay"}).css({
			'opacity': .5,
			'display': 'none'
		});
		$('body').append($overlay);
		$overlay.fadeIn(function(){
			$('body').append($ventana);
			$ventana.fadeIn();
		});
	})
	
	//nueva convocatoria
	$('#nuevaConvo').on('click', function (evento) {
		evento.preventDefault();
		// Limpiamos todos los campos
		var cuentaPac = parseInt($('#cuentaPac').val());
		// Verificamos si el número de convocatorias no excede el máximo permitido
		if (cuentaPac >= 3) {
			alert("El número de convocatorias debe ser menor o igual a 3");
			return;
		}
		if (confirm('¿Deseas elevar a una Convocatoria Superior?')) {
			// Se modificará el expediente
			var numeroExp;
			var indice = parseInt($('#correlativo').val());
			var objeto = $('#SLT_OBJETO').val();
			var proceso = $('#SLT_PROCESO').val();
			var monto = $('#INP_COSTO').val();
			var fecha = new Date();
			var anio = fecha.getFullYear() - 2000;
			var centro = $('#centroP').val();
			var fechaTexto = $('#TXT_FECHA').text();
			var responsable = $('#usuario').val();
			cuentaPac = cuentaPac + 1;
			var descripcion = $('#TA_DESCRIPCION').val();
			var observacion = $('#INP_OBSERVACION').val();
			// Verificamos si los datos fueron ingresados correctamente
			if (monto == "") {
				alert("Ingrese una Cantidad para Valor");
				return;
			}
			// Verificamos si el valor pasado está entre los topes
			if (compararValor(monto, proceso) != 1) {
				return;
			}
			// Vemos si tiene una descripción
			if (descripcion == "") {
				alert("Ingrese una Descripción");
				return;
			}
			// Creamos otra vez el número de proceso con la cuenta de PAC actualizada
			var textoIndice = crearCorrelacional(proceso, indice);// Creamos el correlativo del número del expediente
			if (proceso == 'N') { // Si el expediente es proceso directo no tiene número de cuenta
				alert("No se puede crear nuevas convocatorias de procesos directos");
				return;
			} else {
				numeroExp = anio + centro + proceso + textoIndice + cuentaPac;
			}
			$.ajax({
				type: 'POST',
				url: 'lib/consultas.php',
				data: {
					"operacion": "nuevoExp",
					"numeroExp": numeroExp,
					"objeto": objeto,
					"proceso": proceso,
					"monto": monto,
					"fecha": fechaTexto,
					"responsable": responsable,
					"cuentaPac": cuentaPac,
					"descripcion": descripcion,
					"observacion": observacion,
					"correlativo": indice
				},
				dataType: 'json',
				success: function (data) {
					$('#TXT_NRO_PROCESO').text(numeroExp);
					$('#BTN_GUARDAR').css('pointer-events', 'none');
					$('#BTN_NUEVA_CONVO').css('pointer-events', 'none');
					var pagina = "layout/mostrarResultado.php";
					var $ventana = $('<div>', { 'class': "clsVentana" });
					$ventana.css({ 'width': "400px", 'margin-left': "-200px" });
					$ventana.load(pagina);
	
					var $overlay = $('<div>', { id: "overlay" }).css({
						'opacity': .5,
						'display': 'none'
					});
					$('body').append($overlay);
					$overlay.fadeIn(function () {
						$('body').append($ventana);
						$ventana.fadeIn();
					});
				},
				error: function (e) {
					alert("¡El expediente ya existe!");
				}
			});
			$('#SLT_PROCESO').css('pointer-events', 'auto');
			$('#SLT_OBJETO').css('pointer-events', 'auto');
			$('#BTN_NUEVA_CONVO').css('pointer-events', 'none');
		}
	});
	

	$('#modificar').on('click', function (evento) {
		evento.preventDefault();
		var nroProceso = $('#TXT_NRO_PROCESO').text();
		var monto = $('#INP_COSTO').val();
		var proceso = $('#SLT_PROCESO').val();
		var descripcion = $('#TA_DESCRIPCION').val();
		var observacion = $('#INP_OBSERVACION').val();
		// Verificamos si el costo referencial tiene un valor ingresado
		if (monto == "") {
			alert("Ingrese una Cantidad para Valor");
			return;
		}
		// Verificamos si el valor pasado está entre los topes
		if (compararValor(monto, proceso) != 1) {
			return;
		}
		// Vemos si tiene una descripción
		if (descripcion == "") {
			alert("Ingrese una Descripción");
			return;
		}
		if (confirm('¿Desea modificar el expediente?')) {
			$.ajax({
				type: 'POST',
				url: 'lib/consultas.php',
				data: {
					"operacion": "modProceso",
					"nroProceso": nroProceso,
					"monto": monto,
					"descripcion": descripcion,
					"observacion": observacion
				},
				dataType: 'json',
				success: function (data) {
					var pagina = "layout/mostrarResultado.php";
					var $ventana = $('<div>', { 'class': "clsVentana" });
					$ventana.css({ 'width': "400px", 'margin-left': "-200px" });
					$ventana.load(pagina);
	
					var $overlay = $('<div>', { id: "overlay" }).css({
						'opacity': .5,
						'display': 'none'
					});
					$('body').append($overlay);
					$overlay.fadeIn(function () {
						$('body').append($ventana);
						$ventana.fadeIn();
					});
				},
				error: function (e) {
					alert("¡El expediente no se pudo modificar!");
				}
			});
		}
	});
	// funciones para obtener datos
	function actualizarCuentaPac(){
		return $('#cuentaPac').val();
	}

	

	function compararValor(valorT, proceso) {
		var valor = parseInt(valorT);
		// Obtenemos los valores de los topes y los convertimos a número para compararlos con el valor que se ingresará
		var cadena = $('#valorInf').val();
		var valorInf = parseInt(cadena);
		cadena = $('#interInf').val();
		var interInf = parseInt(cadena);
		cadena = $('#valorSup').val();
		var valorSup = parseInt(cadena);
		cadena = $('#interSup').val();
		var interSup = parseInt(cadena);
		// Cuando no existen límites superiores
		if (proceso == 'V' || proceso == 'D' || proceso == 'L' || proceso == 'P' || proceso == 'G' || proceso == 'N') {
			if (interInf == 1) {
				if (valor >= valorInf) {} else {
					alert('Debe ingresar un valor mayor o igual a ' + valorInf + ' /S.');
					return 0;
				}
			} else if (interInf == 0) {
				if (valor > valorInf) {} else {
					alert('Debe ingresar un valor mayor a ' + valorInf + ' /S.');
					return 0;
				}
			}
			return 1;
		} else if (proceso == 'A' || proceso == 'I' || proceso == 'R' || proceso == 'U') { // Cuando tiene límites tanto inferiores como superiores
			if (comparar(valorInf, interInf, valor) && comparar(valor, interSup, valorSup)) {
				return 1;
			} else {
				alert('Debe ingresar un valor desde ' + valorInf + ' a ' + valorSup + ' /S.');
				$(this).select();
				return 0;
			}
		} else if (proceso == 'X') { // Cuando no haya límites inferiores
			if (interSup == 1) {
				if (valor > valorSup) {
					alert('Debe ingresar un valor menor o igual a ' + valorSup + ' /S.')
					return 0;
				}
				return 1;
			} else if (interSup == 0) {
				if (valor >= valorSup) {
					alert('Debe ingresar un valor menor a ' + valorSup + ' /S.')
					return 0;
				}
				return 1;
			}
		}
	}

	
	function actualizarProcesos(objeto) {
		$.ajax({
			type: 'POST',
			url: 'lib/consultas.php',
			data: { "operacion": "procesos", "valor": objeto },
			dataType: 'json',
			async: false,
			success: function (data) {
				$('#procesos').find('option').remove();
				$.each(data, function (indice, registro) {
					$('#procesos').append($('<option>', { 'value': registro.clave, 'text': registro.nombre }));
				});
				var proceso = $('#procesos').val();
				actualizarLimites(objeto, proceso);
				// Obtener correlacional(proceso);
				cuentaPAC();
			},
			error: function (e) {
				alert("Ha ocurrido un problema al actualizar procesos");
			}
		});
	}


function crearCorrelacional(proceso, correlativo) {
    var textoCorre;
    if (proceso == 'N') {
        if (correlativo < 10) {
            textoCorre = "0000" + correlativo;
        } else if (correlativo < 100) {
            textoCorre = "000" + correlativo;
        } else if (correlativo < 1000) {
            textoCorre = "00" + correlativo;
        }
    } else if (proceso == 'U') {
        if (correlativo < 10) {
            textoCorre = "0000" + correlativo;
        } else if (correlativo < 100) {
            textoCorre = "000" + correlativo;
        } else if (correlativo < 1000) {
            textoCorre = "00" + correlativo;
        }
    } else { // Por no tener segunda convocatoria
        if (correlativo < 10) {
            textoCorre = "000" + correlativo;
        } else if (correlativo < 100) {
            textoCorre = "00" + correlativo;
        } else if (correlativo < 1000) {
            textoCorre = "0" + correlativo;
        }
    }
    return textoCorre;
}
	//	esta funcion compara el valor1 con el valor2 de acuerdo con el intervalo
	//	si el intervalo es 1 es un '<=' => valor1 <= valor2
	//	si el intervalo es 0 es un '<' => valor1 < valor2	
	function comparar(valor1,intervalo,valor2){
		if(intervalo == 1){
			if(valor1<=valor2){
				return true;
			}else{return false;}
		}else{ // si es cero
			if(valor1<valor2){
				return true;
			}else{return false;}
		}
	}
	
	function actualizarLimites(contrato, proceso) {
		// Buscamos los topes para el tipo de contrato y proceso
		$.ajax({
			type: 'POST',
			url: 'lib/consultas.php',
			data: { "operacion": "topes", "contrato": contrato, "proceso": proceso },
			dataType: 'json',
			async: false,
			success: function (data) {
				$.each(data, function (indice, dato) {
					$('#interInf').val(dato.interInf);
					$('#valorInf').val(dato.valorInf);
					$('#interSup').val(dato.interSup);
					$('#valorSup').val(dato.valorSup);
					if (dato.valorInf != null) {
						$('#topeInf').text(dato.valorInf + " /S.");
					} else {
						$('#topeInf').text("Mayor que 0 /S.");
					}
					if (dato.valorSup != null) {
						$('#topeSup').text(dato.valorSup + " /S.");
					} else {
						$('#topeSup').text("Superior");
					}
				});
			},
			error: function (e) {
				alert("Ha ocurrido un problema al actualizar topes");
			}
		});
	}
	
	function obtenerCorrelacional(proceso){
		$.ajax({
			type: 'POST',
			url: 'lib/consultas.php',
			data: {"operacion":"correlacional","proceso":proceso},
			dataType: 'json',
			async:false,
			success: function(data){
				$.each(data, function(indice,dato){
					$('#correlativo').val(dato.corre);
				});
			},
			error:function(e){
				alert("Ha ocurrido un problema al Obtener Correlacional");
			}
		});
	}

function cuentaPAC() {
    $.ajax({
        type: 'POST',
        url: 'lib/segunda_con.php',
        data: { "operacion": "esSegCon", "proceso": $('#procesos').val(), "objeto": $('#contratos').val() },
        dataType: 'json',
        success: function (data) {
            if (data == 0) {
                $('#esCuentaPac').text("No");
                $('#esCuentaPac').css('pointer-events', 'none');
            } else {
                $('#esCuentaPac').text("Si");
                $('#esCuentaPac').css('pointer-events', 'auto');
            }
        },
        error: function (e) {
            alert("Ha ocurrido un problema con la cuenta PAC");
        }
    });
}
	function obtenerCentro(){
		$.ajax({
			type: 'POST',
			url: 'lib/variables.php',
			data: {"operacion":"obtener","nombre":"centro"},
			dataType: 'json',
			success: function(data){
				$.each(data, function(indice,valor){
					$('#centro').val(valor.variable);
				});
			},
			error:function(e){
				alert("Ha ocurrido un Problema al Obtener el Centro");
			}
		});
	}
	$('#esCuentaPac').on('click',function(evento){
		evento.preventDefault();
		var pagina = $(this).attr('href');
		var $ventana = $('<div>',{'class':"clsVentana"});
		$ventana.css({'width':"800px",'margin-left':"-400px"});
		$ventana.load(pagina);
		
		var $overlay = $('<div>',{id:"overlay"}).css({
			opacity: .5,
			display: 'none'
		});
		$('body').append($overlay);
		$overlay.fadeIn(function(){
			$('body').append($ventana);
			$ventana.fadeIn();
		});
	});
});

