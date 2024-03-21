<?php
	$operacion = $_POST["operacion"];
	function conectar(){
		$servidor = "localhost";
		$baseDatos = "pac";
		$usuario = "root";
		$pass = "essalud";
		$conexion = new mysqli($servidor, $usuario, $pass, $baseDatos);
		if ($conexion->connect_error) {
			die("Error de conexión: " . $conexion->connect_error);
		}
		return $conexion;
	}
	function cerrarConexion($conexion){
		$conexion->close();
	}
	function logeo($user, $pass){
		$final = array();
		$conexion = conectar();
		$user = $conexion->real_escape_string($user);
		$pass = $conexion->real_escape_string($pass);
		$consulta = "SELECT US.cuenta_usuario, US.id_tipo_usuario, VS.valor
					FROM usuarios AS US
					INNER JOIN variables_sistema AS VS ON US.cuenta_usuario = '$user' AND US.password_usuario = '$pass' AND VS.nombre = 'centro'";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		while($registro = $resultado->fetch_assoc()){
			$final[] = array(
				'usuario' => $registro['cuenta_usuario'],
				'tipo' => $registro['id_tipo_usuario'],
				'centro' => $registro['valor']
			);
		}
		cerrarConexion($conexion);
		return $final;
	}
	function buscarUsuario($user){
		$final = NULL;
		$conexion = conectar();
		$user = $conexion->real_escape_string($user);
		$consulta = "SELECT cuenta_usuario
					FROM usuarios 
					WHERE cuenta_usuario = '$user'";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		if ($resultado->num_rows) {
			$temp = $resultado->fetch_assoc();
			$final = $temp['cuenta_usuario'];
		}
		cerrarConexion($conexion);
		return $final;
	}
	function crearUsuario($tipoUsuario, $usuario, $pass, $nombre, $apellidoP, $apellidoM, $dni, $telefono){
		$conexion = conectar();
		$tipoUsuario = $conexion->real_escape_string($tipoUsuario);
		$usuario = $conexion->real_escape_string($usuario);
		$pass = $conexion->real_escape_string($pass);
		$nombre = $conexion->real_escape_string($nombre);
		$apellidoP = $conexion->real_escape_string($apellidoP);
		$apellidoM = $conexion->real_escape_string($apellidoM);
		$dni = $conexion->real_escape_string($dni);
		$telefono = $conexion->real_escape_string($telefono);
	
		$consulta = "INSERT INTO usuarios(cod_usuario,
								nombre_usuario,
								apellido_paterno,
								apellido_materno,
								DNI_usuario,
								telefono,
								cuenta_usuario,
								password_usuario,
								id_tipo_usuario) ";
		$consulta .= "VALUES (NULL,'$nombre','$apellidoP','$apellidoM','$dni','$telefono','$usuario','$pass','$tipoUsuario')";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		cerrarConexion($conexion);
		return $conexion->insert_id;
	}
	function contratos(){
		$final = array();
		$conexion = conectar();
		$consulta = "SELECT * FROM tipo_contrato";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		while($registro = $resultado->fetch_array()){
			list($id, $nombre) = $registro;
			$final[] = array(
				'id' => $id,
				'nombre' => $nombre
			);
		}
		cerrarConexion($conexion);
		return $final;
	}
	function procesos($objeto){
		$final = array();
		$conexion = conectar();
		$objeto = $conexion->real_escape_string($objeto);
	
		$consulta = "SELECT TP.* 
					FROM tipo_proceso as TP,
						 proceso_contrado as PC
					WHERE PC.id_contrato = $objeto AND
						  PC.clave_proceso = TP.clave";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		while($registro = $resultado->fetch_array()){
			list($clave, $sigla, $nombre) = $registro;
			$final[] = array(
				'clave' => $clave,
				'sigla' => $sigla,
				'nombre' => $nombre
			);
		}
		cerrarConexion($conexion);
		return $final;
	}
	function procesosTodos(){
		$final = array();
		$conexion = conectar();
		$consulta = "SELECT clave, nombre FROM tipo_proceso";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		while($registro = $resultado->fetch_array()){
			list($clave, $nombre) = $registro;
			$final[] = array(
				'clave' => $clave,
				'nombre' => $nombre
			);
		}
		cerrarConexion($conexion);
		return $final;
	}
	function buscarTopes($clave, $objeto){
		$final = array();
		$conexion = conectar();
		$clave = $conexion->real_escape_string($clave);
		$objeto = $conexion->real_escape_string($objeto);
	
		$consulta = "SELECT TP.intervalo_inf,
							TP.valor_inf,
							TP.intervalo_sup,
							TP.valor_sup
					FROM topes AS TP, proceso_contrado AS PC
					WHERE TP.id_cont_proc = PC.id
						AND PC.id_contrato = $objeto
						AND PC.clave_proceso = '$clave'";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		while($registro = $resultado->fetch_array()){
			list($intervaloInf, $valorInf, $intervaloSup, $valorSup) = $registro;
			$final[] = array(
				'interInf' => $intervaloInf,
				'valorInf' => $valorInf,
				'interSup' => $intervaloSup,
				'valorSup' => $valorSup
			);
		}
		cerrarConexion($conexion);
		return $final;
	}
	function buscarCorrelacional($proceso){
		$final = array();
		$conexion = conectar();
		$proceso = $conexion->real_escape_string($proceso);
	
		$consulta = "SELECT correlacional
					FROM correlacional_proceso
					WHERE clave_proceso = '$proceso'";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		while($registro = $resultado->fetch_array()){
			list($corre) = $registro;
			$final[] = array('corre' => $corre);
		}
		cerrarConexion($conexion);
		return $final;
	}
	function nuevoExpediente($nro_proceso, $indice, $objeto, $proceso, $monto_ref, $fecha, $usuario, $cuenta_pac, $descripcion, $observacion, $correlativo){
		$final = array();
		$conexion = conectar();
		$nro_proceso = $conexion->real_escape_string($nro_proceso);
		$indice = (int)$indice;
		$objeto = (int)$objeto;
		$proceso = $conexion->real_escape_string($proceso);
		$monto_ref = (float)$monto_ref;
		$fecha = $conexion->real_escape_string($fecha);
		$usuario = $conexion->real_escape_string($usuario);
		$cuenta_pac = (int)$cuenta_pac;
		$descripcion = $conexion->real_escape_string($descripcion);
		$observacion = $conexion->real_escape_string($observacion);
		$correlativo = (int)$correlativo;
	
		$consulta = "INSERT INTO datos_pac(
			nro_proceso,
			indice,
			objeto,
			tipo_proceso,
			monto_referencial,
			fecha,
			usuario,
			cuenta_pac,
			descripcion,
			observacion)
			VALUES ('$nro_proceso', $indice, $objeto, '$proceso', $monto_ref, '$fecha', '$usuario', $cuenta_pac, '$descripcion', '$observacion')";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
	
		// Actualizamos el correlacional
		cerrarConexion($conexion);
		actualizarCorrelativo($proceso, $correlativo);
		return $conexion->insert_id;
	}
	
	function modificarProceso($nro_proceso, $monto, $descripcion, $observacion){
		$conexion = conectar();
		$nro_proceso = $conexion->real_escape_string($nro_proceso);
		$monto = (float)$monto;
		$descripcion = $conexion->real_escape_string($descripcion);
		$observacion = $conexion->real_escape_string($observacion);
	
		$consulta = "UPDATE datos_pac SET monto_referencial = $monto, descripcion = '$descripcion', observacion = '$observacion' WHERE nro_proceso = '$nro_proceso'";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
	
		// Actualizamos el correlacional
		cerrarConexion($conexion);
		return $conexion->insert_id;
	}
	
	function buscarCorrelativos(){
		$final = array();
		$conexion = conectar();
	
		$consulta = "SELECT TP.nombre, CP.clave_proceso, CP.correlacional FROM correlacional_proceso AS CP, tipo_proceso AS TP WHERE CP.clave_proceso = TP.clave";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		while($registro = $resultado->fetch_array()){
			list($nombre, $clave, $corre) = $registro;
			$final[] = array('nombre' => $nombre, 'clave' => $clave, 'correlativo' => $corre);
		}
		cerrarConexion($conexion);
		return $final;
	}
	
	function actualizarCorrelativo($proceso, $valor){
		$conexion = conectar();
		$proceso = $conexion->real_escape_string($proceso);
		$valor = (int)$valor;
	
		$consulta = "UPDATE correlacional_proceso SET correlacional = $valor WHERE clave_proceso = '$proceso'";
		$resultado = $conexion->query($consulta);
		if (!$resultado) {
			die("Error en la consulta: " . $conexion->error);
		}
		cerrarConexion($conexion);
		return $conexion->insert_id;
	}
	function actualizarCorre($l, $c, $p, $s, $m, $n){
		// Actualizamos todos los correlacionales
		$conexion = conectar();
	
		$consulta = "UPDATE correlacional_proceso SET correlacional = ? WHERE clave_proceso = ?";
		$stmt = $conexion->prepare($consulta);
		if (!$stmt) {
			die("Error en la preparación de la consulta: " . $conexion->error);
		}
	
		// Bind de parámetros y ejecución para cada clave de proceso
		$stmt->bind_param("is", $l, $clave);
		$clave = 'L';
		$stmt->execute();
	
		$clave = 'C';
		$stmt->execute();
	
		$clave = 'P';
		$stmt->execute();
	
		$clave = 'S';
		$stmt->execute();
	
		$clave = 'M';
		$stmt->execute();
	
		$clave = 'N';
		$stmt->execute();

		$clave = 'A';
		$stmt->execute();

		$clave = 'I';
		$stmt->execute();

		$clave = 'K';
		$stmt->execute();
	
		$stmt->close();
		cerrarConexion($conexion);
	}	
	// buscamos la operacion a realizarse
	if (strcmp($operacion, "contratos") == 0) {
		$respuesta = contratos();
	} elseif (strcmp($operacion, "procesos") == 0) {
		$respuesta = procesos((int)$_POST["valor"]);
	} elseif (strcmp($operacion, "login") == 0) {
		$respuesta = logeo($_POST["usuario"], $_POST["pass"]);
	} elseif (strcmp($operacion, "buscar") == 0) {
		$respuesta = buscarUsuario($_POST["usuario"]);
	} elseif (strcmp($operacion, "crear") == 0) {
		$respuesta = crearUsuario($_POST["tipoUsuario"], $_POST["usuario"], $_POST["pass"], $_POST["nombre"], $_POST["apellidoP"], $_POST["apellidoM"], $_POST["dni"], $_POST["telefono"]);
	} elseif (strcmp($operacion, "correlacional") == 0) {
		$respuesta = buscarCorrelacional($_POST["proceso"]);
	} elseif (strcmp($operacion, "nuevoExp") == 0) {
		$respuesta = nuevoExpediente($_POST["numeroExp"], $_POST["correlativo"], $_POST["objeto"], $_POST["proceso"], $_POST["monto"], $_POST["fecha"], $_POST["responsable"], $_POST["cuentaPac"], $_POST["descripcion"], $_POST["observacion"], $_POST["correlativo"]);
	} elseif (strcmp($operacion, "correlativos") == 0) {
		$respuesta = buscarCorrelativos();
	} elseif (strcmp($operacion, "actCorre") == 0) {
		$respuesta = actualizarCorre($_POST['L'], $_POST['C'], $_POST['P'], $_POST['S'], $_POST['M'], $_POST['N']);
	} elseif (strcmp($operacion, "topes") == 0) {
		$respuesta = buscarTopes($_POST["proceso"], $_POST["contrato"]);
	} elseif (strcmp($operacion, "procesosBuscar") == 0) {
		$respuesta = procesosTodos();
	} elseif (strcmp($operacion, "modProceso") == 0) {
		$respuesta = modificarProceso($_POST["nroProceso"], $_POST["monto"], $_POST["descripcion"], $_POST["observacion"]);
	}
	
	echo json_encode($respuesta);
?>