<script type="text/javascript" src="JS/funciones.js"></script>
<script type="text/javascript" src="JS/consultasProcesos.js"></script>
<div class="cajaContenido">
	<table id="listaProcesos">
		<thead>
			<tr>
				<td align="center" colspan="8"><label class="titulo">SEGUIMIENTO DE LOS PROCESOS</label></td>
			</tr>
			<tr>
				<td colspan="2" align="center"><strong class="etiquetaExp">Buscar Por:</strong></td>
				<td colspan="6" align="left">
					<select class="entrada">
						<option value="1">Todos...</option>
						<option value="2">Procesos</option>
						<option value="3">Todos...</option>
						<option value="4">Todos...</option>
						<option value="5">Todos...</option>
						<option value="6">Todos...</option>
					</select>
				</td>
			</tr>
			<tr>
				<th class="cabeceraC"><label class="etiquetaExp">Nro Proceso</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Objeto</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Proceso</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Monto Referencial</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Fecha</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Usuario</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Descripcion</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Observacion</label></th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	<div align="center">
		<a href="#" id="exportar" class="botonExp">Exportar a Excel</a>
		<a href="#" id="cerrar" class="botonExp">Cerrar</a>
		<form action="lib/exportarExcel.php" method="post" target="_blank" id="exportarExcel">
			<input type="hidden" id="datos" name="datos" value="administrador" />
		</form>
	</div>
</div>