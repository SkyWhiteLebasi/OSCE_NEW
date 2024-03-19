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

function obtenerUsuarios(){
    $final = array();
    $conexion = conectar();
    $consulta = "SELECT US.cod_usuario,
                        US.nombre_usuario,
                        US.apellido_paterno,
                        US.apellido_materno,
                        US.DNI_usuario,
                        US.telefono,
                        US.cuenta_usuario,
                        TU.nom_tipo_usuario,
                        US.id_tipo_usuario
                FROM usuarios AS US
                INNER JOIN tipo_usuario AS TU ON TU.id_tipo_usuario = US.id_tipo_usuario";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    while ($registro = $resultado->fetch_assoc()) {
        $final[] = $registro;
    }
    $conexion->close();
    return $final;
}

function modificarUsuario($codigo, $nombre, $apellidop, $apellidom, $dni, $telefono, $cuenta, $tipo){
    $conexion = conectar();
    $consulta = "UPDATE usuarios 
                SET nombre_usuario='$nombre',
                    apellido_paterno='$apellidop',
                    apellido_materno='$apellidom',
                    DNI_usuario='$dni',
                    telefono='$telefono',
                    cuenta_usuario='$cuenta',
                    id_tipo_usuario=$tipo
                WHERE cod_usuario=$codigo";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    $conexion->close();
    return 1;
}

function modificarUsuarioPass($codigo, $nombre, $apellidop, $apellidom, $dni, $telefono, $cuenta, $pass, $tipo){
    $conexion = conectar();
    $pass_hash = password_hash($pass, PASSWORD_DEFAULT);
    $consulta = "UPDATE usuarios 
                SET nombre_usuario='$nombre',
                    apellido_paterno='$apellidop',
                    apellido_materno='$apellidom',
                    DNI_usuario='$dni',
                    telefono='$telefono',
                    cuenta_usuario='$cuenta',
                    password_usuario='$pass_hash',
                    id_tipo_usuario=$tipo
                WHERE cod_usuario=$codigo";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    $conexion->close();
    return 1;
}

function eliminarUsuario($codigo){
    $conexion = conectar();
    $consulta = "DELETE FROM usuarios WHERE cod_usuario=$codigo";
    $resultado = $conexion->query($consulta);
    if (!$resultado) {
        die("Error en la consulta: " . $conexion->error);
    }
    $conexion->close();
    return 1;
}

if(strcmp($operacion, "usuarios") == 0){
    $respuesta = obtenerUsuarios();
} elseif(strcmp($operacion, "modificar") == 0){
    $respuesta = modificarUsuario($_POST["codigo"], $_POST["nombre"], $_POST["apellidop"], $_POST["apellidom"], $_POST["dni"], $_POST["telefono"], $_POST["cuenta"], $_POST["tipo"]);
} elseif(strcmp($operacion, "modificarPass") == 0){
    $respuesta = modificarUsuarioPass($_POST["codigo"], $_POST["nombre"], $_POST["apellidop"], $_POST["apellidom"], $_POST["dni"], $_POST["telefono"], $_POST["cuenta"], $_POST["pass"], $_POST["tipo"]);
} elseif(strcmp($operacion, "eliminar") == 0){
    $respuesta = eliminarUsuario($_POST["codigo"]);
}
echo json_encode($respuesta);
?>
