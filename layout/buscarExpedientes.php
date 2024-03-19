<script type="text/javascript" src="JS/buscar_expediente.js"></script>
<div class="clsVenTitulo">
	<strong>Buscar Expedientes</strong>
	<a href="" class="cerrar">Cerrar</a>
</div>
<div class="clsVenCont" align="center">
	<table>
		<tr>
			<td>
				<select class="entrada" id="segun">
					<option value="1">Nro. Expediente</option>
					<option value="2">Fecha</option>
                    <option value="3">Tipo Contrato</option>
                    <option value="4">Tipo Proceso</option>
                    <option value="5">Responsable</option>
					<option value="6">Palabra Clave</option>
				</select>
			</td>
            <td id="entrada"><input type="text" id="valorBuscar" class="entrada" /></td>
            <td><a class="botonExp" id="buscarExp" href="#">Buscar</a></td>
		</tr>
        <tr>
        	<table id="contSeg">
				<thead>
					<tr>
						<th></th>
						<th class="cabeceraC">Nro. Proceso</th>
						<th class="cabeceraC">Proceso</th>
						<th class="cabeceraC">Objeto</th>
                    	<th class="cabeceraC">Monto</th>
						<th class="cabeceraC">Fecha</th>
						<th class="cabeceraC">Responsable</th>
						<th class="cabeceraC">Cuenta PAC</th>
						<th class="cabeceraC">Descripcion</th>
						<th class="cabeceraC">Observacion</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
        </tr>
        <tr>
			<td colspan="3" align="center"><a class="botonExp" id="aceptar" href="#">Aceptar</a></td>
		</tr>
	</table>
</div>
