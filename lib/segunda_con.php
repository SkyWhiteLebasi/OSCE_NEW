<?php
// funciones para la segunda convocatoria
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

// para la segunda convocatoria
function segundaConvocatoria($objeto, $proceso){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT SP.codigo_pac,
                        SP.nro_proceso,
                        TC.nombre,
                        TP.siglas,
                        SP.costo_referencial,
                        SP.fecha,
                        SP.responsable,
                        SP.especificacion,
                        SP.observacion
                FROM seguimiento_pac AS SP
                INNER JOIN tipo_contrato AS TC ON SP.objeto = TC.id
                INNER JOIN tipo_proceso AS TP ON SP.tipo_proceso = TP.clave
                WHERE SP.tipo_proceso = ? AND SP.objeto = ?";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bind_param("si", $proceso, $objeto);
    $sentencia->execute();
    $resultado = $sentencia->get_result();
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    while ($registro = $resultado->fetch_assoc()) {
        $final[] = $registro;
    }
    $sentencia->close();
    $conexion->close();
    return $final;
}

function esSegundaCon($objeto, $proceso){
    $conexion = conectar();
    $consulta = "SELECT COUNT(codigo_pac) 
                FROM seguimiento_pac 
                WHERE tipo_proceso = ? AND objeto = ?";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bind_param("si", $proceso, $objeto);
    $sentencia->execute();
    $resultado = $sentencia->get_result();
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    $registro = $resultado->fetch_row();
    $sentencia->close();
    $conexion->close();
    return $registro[0];
}

if (strcmp($operacion, "segCon") == 0) {
    $respuesta = segundaConvocatoria($_POST["objeto"], $_POST["proceso"]);
} elseif (strcmp($operacion, "esSegCon") == 0) {
    $respuesta = esSegundaCon($_POST["objeto"], $_POST["proceso"]);
}
echo json_encode($respuesta);
?>
