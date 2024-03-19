<script type="text/javascript" src="JS/funciones.js"></script>
<script type="text/javascript" src="JS/cargarPac.js"></script>
<div class="cajaContenido">
	<table>
		<tr>
			<td align="center" colspan="8"><label class="titulo">Cargar PAC</label></td>
		</tr>
		<tr>
			<td>
				<form name="formulario" method="post" enctype="multipart/form-data">
					<input type="file" class="entrada" name="excel" id="excel" accept=".csv" />
					<input type="hidden" name="MAX_FILE_SIZE" value="20000" />
				</form>
			</td>
		</tr> 
	</table>
	<div align="center">
		<a href="#" id="importar" class="botonExp">Importar</a>
		<a href="#" id="cerrar" class="botonExp">Cerrar</a>
	</div>
	<div>
		<table id="listaProcesos">
			<tr>
				<td align="center" colspan="8"><label class="titulo">Datos Seguimiento PAC</label></td>
			</tr>
			<tr>
				<th class="cabeceraC"><label class="etiquetaExp">nro. Proceso</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Objeto</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Proceso</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Valor Referencial</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Fecha</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Responsable</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Cuenta PAC</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Especificacion</label></th>
				<th class="cabeceraC"><label class="etiquetaExp">Observacion</label></th>
			</tr>
		</table>
	</div>
</div>