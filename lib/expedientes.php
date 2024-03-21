<?php
require_once 'db_funciones.php';
$operacion = $_POST["operacion"];

function buscarProcesos($condicion, $valor){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT DP.nro_proceso,
                        DP.indice,
                        TC.id,
                        TC.nombre,
                        TP.clave,
                        TP.siglas,
                        DP.monto_referencial,
                        DP.fecha,
                        DP.usuario,
                        DP.cuenta_pac,
                        DP.descripcion,
                        DP.observacion 
                FROM datos_pac AS DP
                INNER JOIN tipo_contrato AS TC ON DP.objeto = TC.id
                INNER JOIN tipo_proceso AS TP ON DP.tipo_proceso = TP.clave
                WHERE 1 = 1"; // Always true condition for building the query

    if(strcmp($condicion, "1") == 0){
        $consulta .= " AND DP.nro_proceso = '$valor'";
    } elseif(strcmp($condicion, "2") == 0){
        $consulta .= " AND DP.fecha = '$valor'";
    } elseif(strcmp($condicion, "3") == 0){
        $consulta .= " AND DP.objeto = $valor";
    } elseif(strcmp($condicion, "4") == 0){
        $consulta .= " AND DP.tipo_proceso = '$valor'";
    } elseif(strcmp($condicion, "5") == 0){
        $consulta .= " AND DP.usuario = '$valor'";
    } elseif(strcmp($condicion, "6") == 0){
        $consulta .= " AND descripcion LIKE '%$valor%'";
    } elseif(strcmp($condicion, "7") == 0){
        $consulta;
    }
    $resultado = $conexion->query($consulta);
    if(!$resultado){
        die("Error en la consulta: " . $conexion->error);
    }

    while($registro = $resultado->fetch_array()){
        list($nro_proceso, $indice, $id, $objeto, $clave, $proceso, $monto_ref, $fecha, $responsable, $cuenta_pac, $descripcion, $observacion) = $registro;
        $final[] = array('nroProceso' => $nro_proceso,
                         'indice' => $indice,
                         'id' => $id,
                         'objeto' => $objeto,
                         'clave' => $clave,
                         'proceso' => $proceso,
                         'monto' => $monto_ref,
                         'fecha' => $fecha,
                         'responsable' => $responsable,
                         'cuentaPac' => $cuenta_pac,
                         'descripcion' => $descripcion,
                         'observacion' => $observacion);
    }
    cerrarConexion($conexion);
    return $final;
}

function modificarExpediente($exProceso, $nuevoProc, $monto, $fecha, $responsable, $cuenta_pac, $descripcion, $observacion){
    $conexion = conectar();
    $exProceso = $conexion->real_escape_string($exProceso);
    $nuevoProc = $conexion->real_escape_string($nuevoProc);
    $monto = (float)$monto;
    $fecha = $conexion->real_escape_string($fecha);
    $responsable = $conexion->real_escape_string($responsable);
    $cuenta_pac = (int)$cuenta_pac;
    $descripcion = $conexion->real_escape_string($descripcion);
    $observacion = $conexion->real_escape_string($observacion);

    $consulta = "UPDATE datos_pac
                SET nro_proceso = '$nuevoProc',
                    monto_referencial = '$monto',
                    fecha = '$fecha',
                    usuario = '$responsable',
                    cuenta_pac = $cuenta_pac,
                    descripcion = '$descripcion',
                    observacion = '$observacion'
                WHERE nro_proceso = '$exProceso'";
    $resultado = $conexion->query($consulta);
    if(!$resultado){
        die("Error en la consulta: " . $conexion->error);
    }
    cerrarConexion($conexion);
    return $conexion->insert_id;
}

if(strcmp($operacion, "consultas") == 0){
    $respuesta = obtenerProcesos();
} elseif(strcmp($operacion, "buscarExp") == 0){
    $respuesta = buscarProcesos($_POST["condicion"], $_POST["valor"]);
} elseif(strcmp($operacion, "modificarExp") == 0){
    $respuesta = modificarExpediente($_POST["exProceso"], $_POST["nuevoProc"], $_POST["monto"], $_POST["fecha"], $_POST["responsable"], $_POST["cuentaPac"], $_POST["descripcion"], $_POST["observacion"]);
}
echo json_encode($respuesta);
?>
