<?php
	require_once 'db_funciones.php';
	require_once 'reader/Classes/PHPExcel/IOFactory.php';
	
	$tipo = $_FILES['archivo']['type'];
	$tamanio = $_FILES['archivo']['size'];
	$tnombre = $_FILES['archivo']['tmp_name'];
	$nombre = $_FILES['archivo']['name'];
	$respuesta = new stdClass();
	if($nombre != ''){
		if($tipo == 'application/vnd.ms-excel'){
			// extension  excel  97
			$ext = 'xls';
		}else if($tipo == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
			// extension excel 2007 y 2010
			$ext = 'xlsx';
		}else{
			// extension no valida
			exit();
		}
		$xlsx = 'Excel2007';
        $xls  = 'Excel5';
		// creando el lector
		$objReader = PHPExcel_IOFactory::createReader($$ext);
		// cargamos el archivo
		$objPHPExcel = $objReader->load($tnombre);
		$dimension = $objPHPExcel->getActiveSheet()->calculateWorksheetDimension();
		// list coloca en array $start y $end
		list($inicio,$final) = explode(':',$dimension);
		if(!preg_match('#([A-Z]+)([0-9]+)#',$inicio,$resultado)){
			return false;
		}
		list($inicio,$inicio_h,$inicio_v) = $resultado;
		if(!preg_match('#([A-Z]+)([0-9]+)#',$final,$resultado)){
			return false;
		}
		list($final,$final_h,$final_v) = $resultado;
		// empezamos la lectura vertical
		
		$objetos = array();
		$procesos = array();
		
		$objetos = listarObjetos();
		$procesos = listarProcesos();
		
		$coneccion = conectar();
		for($v = $inicio_v;$v <= $final_v;$v++){
			// empezamos la lectura horizontal
			if($v != $inicio_v){
				$h = $inicio_h;
				$nro_proceso = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$objeto = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$proceso = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$costo_referencial = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$fecha = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$responsable = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$cuenta_pac = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$especificacion = get_cell($h.$v,$objPHPExcel);
				pp($h);
				$observacion = get_cell($h.$v,$objPHPExcel);
				
				$objetoAux = $objetos[$objeto];
				$procesoAux = $procesos[$proceso];
				
				$respuesta->datos[] = array(
					'nroProceso' => $nro_proceso,
					'objeto' => $objeto,
					'tipoProceso' => $proceso,
					'costoReferencial' => $costo_referencial,
					'fecha' => $fecha,
					'responsable' => $responsable,
					'cuentaPac' => $cuenta_pac,
					'especificacion' => $especificacion,
					'observacion' => $observacion
				);
				
				$consulta = "INSERT INTO seguimiento_pac(
					nro_proceso,
					objeto,
					tipo_proceso,
					costo_referencial,
					fecha,
					responsable,
					cuenta_pac,
					especificacion,
					observacion) 
				VALUES('$nro_proceso',$objetoAux,'$procesoAux',$costo_referencial,'$fecha','$responsable',$cuenta_pac,'$especificacion','$observacion')";
				$resultado = mysql_query($consulta) or die(mysql_error());
			}
		}
		cerrarConexion($coneccion);
		$respuesta->mensaje = "El Archivo se Cargo Exitosamente";
		$respuesta->estado = true;
	}else{
		$respuesta->mensaje = "El Archivo no Existe";
		$respuesta->estado = false;
	}
	echo json_encode($respuesta);
	// funciones 
	function get_cell($cell, $objPHPExcel){
		//select one cell
		$objCell = ($objPHPExcel->getActiveSheet()->getCell($cell));
		//get cell value
		return $objCell->getvalue();
	}
	function pp(&$var){
		$var = chr(ord($var)+1);
		return true;
	}
?>