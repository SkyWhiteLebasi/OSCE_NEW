<?php
function conectar(){
    $servidor = "localhost";
    $baseDatos = "pac";
    $usuario = "root";
    $pass = "essalud";
    
    // Conexión a la base de datos utilizando MySQLi
    $conexion = new mysqli($servidor, $usuario, $pass, $baseDatos);

    // Verificar si hay errores de conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }

    return $conexion;
}

function cerrarConexion($conexion){
    $conexion->close();
}

function listarObjetos(){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT id, nombre FROM tipo_contrato";
    $resultado = $conexion->query($consulta) or die($conexion->error);
    while($registro = $resultado->fetch_assoc()){
        $final[$registro['nombre']] = $registro['id'];
    }
    cerrarConexion($conexion);
    return $final;
}

function listarProcesos(){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT clave, siglas FROM tipo_proceso";
    $resultado = $conexion->query($consulta) or die($conexion->error);
    while($registro = $resultado->fetch_assoc()){
        $final[$registro['siglas']] = $registro['clave'];
    }
    cerrarConexion($conexion);
    return $final;
}

function obtenerProcesos(){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT DP.nro_proceso,
                        TC.nombre,
                        TP.siglas,
                        DP.monto_referencial,
                        DP.fecha,
                        CONCAT_WS(' ', US.nombre_usuario, US.apellido_paterno, US.apellido_materno),
                        DP.cuenta_pac,
                        DP.descripcion,
                        DP.observacion 
                FROM datos_pac AS DP
                INNER JOIN tipo_contrato AS TC ON DP.objeto = TC.id
                INNER JOIN tipo_proceso AS TP ON DP.tipo_proceso = TP.clave
                INNER JOIN usuarios AS US ON DP.usuario = US.cuenta_usuario";
    $resultado = $conexion->query($consulta) or die($conexion->error);
    while($registro = $resultado->fetch_assoc()){
        $final[] = array(
            'nroProc' => $registro['nro_proceso'],
            'objeto' => $registro['nombre'],
            'proceso' => $registro['siglas'],
            'monto' => $registro['monto_referencial'],
            'fecha' => $registro['fecha'],
            'responsable' => $registro['CONCAT_WS(\' \', US.nombre_usuario, US.apellido_paterno, US.apellido_materno)'],
            'cuentaPac' => $registro['cuenta_pac'],
            'descripcion' => $registro['descripcion'],
            'observacion' => $registro['observacion']
        );
    }
    cerrarConexion($conexion);
    return $final;
}
?>
