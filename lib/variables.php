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

function obtenerVariables(){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT * FROM variables_sistema";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    while ($registro = $resultado->fetch_assoc()) {
        $final[] = $registro;
    }
    cerrarConexion($conexion);
    return $final;
}

function obtenerVariable($nombre){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT valor FROM variables_sistema WHERE nombre = ?";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bind_param("s", $nombre);
    $sentencia->execute();
    $resultado = $sentencia->get_result();
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    while ($registro = $resultado->fetch_assoc()) {
        $final[] = $registro;
    }
    cerrarConexion($conexion);
    return $final;
}

function guardarVariable($nombre, $valor){
    $conexion = conectar();
    $consulta = "UPDATE variables_sistema SET valor = ? WHERE nombre = ?";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->bind_param("ss", $valor, $nombre);
    $sentencia->execute();
    if ($sentencia->affected_rows === -1) {
        die("Error en la consulta: " . $conexion->error);
    }
    cerrarConexion($conexion);
    return 1;
}

if (strcmp($operacion, "variables") == 0) {
    $respuesta = obtenerVariables();
} elseif (strcmp($operacion, "guardar") == 0) {
    $respuesta = guardarVariable($_POST["nombre"], $_POST["valor"]);
} elseif (strcmp($operacion, "obtener") == 0) {
    $respuesta = obtenerVariable($_POST["nombre"]);
}
echo json_encode($respuesta);
?>
