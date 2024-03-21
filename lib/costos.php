<?php
    $operacion = $_POST["operacion"];

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

    function obtenerTopes($contrato){
        $final = array();
        $conexion = conectar();
        $consulta = "SELECT PC.clave_proceso,
                            TP.nombre,
                            TS.intervalo_inf,
                            TS.valor_inf,
                            TS.intervalo_sup,
                            TS.valor_sup
                    FROM    topes AS TS,
                            proceso_contrado AS PC,
                            tipo_proceso AS TP
                    WHERE   PC.id = TS.id_cont_proc
                            AND TP.clave = PC.clave_proceso
                            AND PC.id_contrato = $contrato";

        $resultado = $conexion->query($consulta);

        if ($resultado->num_rows > 0) {
            while($registro = $resultado->fetch_assoc()) {
                $final[] = $registro;
            }
        }

        cerrarConexion($conexion);
        return $final;
    }

    function actualizarTopes($contrato, $proceso, $inferior, $superior){
        $conexion = conectar();
        $consulta = "UPDATE topes AS TS,
                            proceso_contrado AS PC
                    SET     TS.valor_inf = $inferior,
                            TS.valor_sup = $superior 
                    WHERE   TS.id_cont_proc = PC.id AND
                            PC.id_contrato = $contrato AND
                            PC.clave_proceso = '$proceso'";

        $resultado = $conexion->query($consulta);
        cerrarConexion($conexion);

        return $resultado;
    }

    if(strcmp($operacion,"topes") == 0){
        $respuesta = obtenerTopes($_POST["contrato"]);
    } elseif(strcmp($operacion,"actTopes") == 0){
        $respuesta = actualizarTopes($_POST["contrato"], $_POST["proceso"], $_POST["inferior"], $_POST["superior"]);
    }

    echo json_encode($respuesta);
?>
