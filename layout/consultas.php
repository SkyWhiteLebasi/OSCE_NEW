<script type="text/javascript" src="JS/funciones.js"></script>
<script type="text/javascript" src="JS/consultas.js"></script>
<div class="cajaContenido">
	<table id="listaProcesos">
		<tr>
			<td align="center" colspan="8"><label class="titulo">Seguimientos de los Procesos</label></td>
		</tr>
		<tr>
			<th class="cabeceraC"><label class="etiquetaExp">Nro PAC</label></th>
			<th class="cabeceraC"><label class="etiquetaExp">Contrato</label></th>
			<th class="cabeceraC"><label class="etiquetaExp">Proceso</label></th>
			<th class="cabeceraC"><label class="etiquetaExp">Monto</label></th>
			<th class="cabeceraC"><label class="etiquetaExp">Fecha</label></th>
			<th class="cabeceraC"><label class="etiquetaExp">Usuario</label></th>
			<th class="cabeceraC"><label class="etiquetaExp">Descripcion</label></th>
			<th class="cabeceraC"><label class="etiquetaExp">Observacion</label></th>
		</tr>
	</table>
	<div align="center">
		<a href="#" id="exportar" class="botonExp">Exportar a Excel</a>
		<a href="#" id="cerrar" class="botonExp">Cerrar</a>
		<form action="lib/ficheroExcel.php" method="post" target="_blank" id="exportarExcel">
			<input type="hidden" id="datos" name="datos" />
		</form>
	</div>
</div>