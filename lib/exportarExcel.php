<?php
	require_once 'reader/Classes/PHPExcel.php';
	require_once 'db_funciones.php';
	
	// preparamos el objeto para ser exportado a un documento excel
	$objPHPExcel = new PHPExcel();
	$objPHPExcel->getProperties()
        ->setCreator("PAC Juliaca")
        ->setLastModifiedBy("PAC Juliaca")
        ->setTitle("Seguimientos de los Procesos")
        ->setSubject("Documento Generado")
        ->setDescription("Documento generado con PHPExcel")
        ->setKeywords("usuarios phpexcel")
        ->setCategory("reportes");
	
	// obtenoemos la informacion de la base de datos,
	// en este caso la lista de todos los procesos
	$datosProcesos = array();
	// obtenemos la listoa de todos los procesos de todos los usuarios
	$datosProcesos = obtenerProcesos();
	// insertamos los datos en el objeto
	$fila = 1;
	foreach($datosProcesos as $registro){
		$columna = 0;
		foreach($registro as $clave => $valor){
			$objPHPExcel->setActiveSheetIndex(0)->setCellValueByColumnAndRow($columna,$fila,$valor);
			$columna++;
		}
		$fila++;
	}
	// damos los ultimos toques al objeto 
	$objPHPExcel->getActiveSheet()->setTitle('lista de Procesos');
	$objPHPExcel->setActiveSheetIndex(0);
	header('Content-Type: application/vnd.ms-excel');
	header('Content-Disposition: attachment;filename="lista-procesos.xls"');
	header('Cache-Control: max-age=0');
	// se crea el documento excel que sera mostrado para su descarga
	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
	$objWriter->save('php://output');
	exit;
?>