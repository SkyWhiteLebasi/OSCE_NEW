<?php
require_once 'db_funciones.php';
$operacion = $_POST["operacion"];

function obtenerCentros(){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT * FROM centros_asistenciales";
    $resultado = $conexion->query($consulta) or die($conexion->error);
    while($registro = $resultado->fetch_assoc()){
        $final[] = array(
            'codcen' => $registro['codcen'],
            'descripcion' => $registro['descripcion']
        );
    }
    cerrarConexion($conexion);
    return $final;
}

function obtenerCostos($centro){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT CC.codigo_generado,
                        CA.descripcion_ceco,
                        ES.valor,
                        CA.sociedad,
                        CA.division
                    FROM costos_asistenciales AS CA
                    INNER JOIN centros_costos AS CC ON CC.ca_ceco = CA.ceco
                    INNER JOIN estructura AS ES ON ES.codigo = CC.cod_estructura
                    WHERE CC.cea_cedcon = '$centro'";
    $resultado = $conexion->query($consulta) or die($conexion->error);
    while($registro = $resultado->fetch_assoc()){
        $final[] = array(
            'codigo' => $registro['codigo_generado'],
            'descripcion' => $registro['descripcion_ceco'],
            'estructura' => $registro['valor'],
            'sociedad' => $registro['sociedad'],
            'division' => $registro['division']
        );
    }
    cerrarConexion($conexion);
    return $final;
}

if(strcmp($operacion,"centros")==0){
    $respuesta = obtenerCentros();
}else if(strcmp($operacion,"costos")==0){
    $respuesta = obtenerCostos($_POST["centro"]);
}
echo json_encode($respuesta);
?>
