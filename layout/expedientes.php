<script type="text/javascript" src="JS/funciones.js"></script>
<script type="text/javascript" src="JS/expedientes.js"></script>
<div class="cajaContenido">
	<table>
		<tr><td align="center" colspan="4"><label class="titulo">FORMULARIO PARA CREAR NUEVOS PROCESOS</label></td></tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="nro_expe">Nro Proceso:</label></td>
			<td>
				<span class="etiquetaExp" id="nro_expe"></span>
				<input type="hidden" id="correlativo" />
				<input type="hidden" id="indice" />
			</td>
			<td><label class="etiquetaExp" for="responsable">Responsable:</label></td>
			<td><span class="etiquetaExp" id="responsable"></span></td>
		</tr align="left">
		<tr align="left">
			<td><label class="etiquetaExp" for="fecha">Fecha:</label></td>
			<td><span class="etiquetaExp" id="fecha"></span></td>
			<td><label class="etiquetaExp" for="sol-pedido">Sol. Pedido</label></td>
			<td><input class="entrada" type="text" name="sol-pedido" id="sol-pedido" size="10" /></td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="contratos">Tipo Objeto:</label></td>
			<td><select class="entrada" id="contratos"></select></td>
			<td><label class="etiquetaExp" for="valor">Valor:</label></td>
			<td><input class="entrada" type="text" name="valor" id="valor" size="10"/><span class="etiquetaExp">/S.</span></td>
		</tr>
        <tr align="left">
			<td><label class="etiquetaExp" for="procesos">Tipo Proceso:</label></td>
			<td><select class="entrada" id="procesos"></select></td>
			<td><label class="etiquetaExp" for="segCon">Cuenta con N&ordm; de PAC?:</label></td>
			<td>
            	<a href="layout/cuenta_pac.php" id="esCuentaPac" class="botonExp">Si</a>
                <input type="hidden" id="cuentaPac" value="1" />
            </td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="descripcion">Descripcion:</label></td>
			<td>
				<textarea class="entrada" name="descripcion" id="descripcion" rows="5" cols="25"></textarea>
				<input type="hidden" id="valorInf" /><input type="hidden" id="interInf" />
				<input type="hidden" id="valorSup" /><input type="hidden" id="interSup" />
			</td>
			<td>
				<p class="etiquetaExp">tope superior</p>
				<p class="etiquetaExp">tope inferior</p>
			</td>
            <td>
				<p class="etiquetaExp" id="topeSup"></p>
				<p class="etiquetaExp" id="topeInf"></p>
			</td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="observacion">Observacion:</label></td>
			<td colspan="3"><input class="entrada" type="text" name="observacion" id="observacion" size="75" /></td>
		</tr>
	</table>
	<div align="center">
		<a href="#" id="nuevo" class="botonExp"><img src="images/nuevolisto.jpg" width="10" height="14" />Nuevo</a>
		<a href="#" id="guardar" class="botonExp"><img src="images/guardarlisto.jpg" width="16" height="14" />Guardar</a>
		<a href="layout/buscarExpedientes.php" id="buscar" class="botonExp"><img src="images/buscarlisto.jpg" width="15" height="14" />Buscar</a>
		<a href="#" id="modificar" class="botonExp"><img src="images/modificarlisto.jpg" width="15" height="14" />Modificar</a>
		<a href="#" id="nuevaConvo" class="botonExp"><img src="images/modificarlisto.jpg" width="15" height="14" />Nueva Convocatoria</a>
		<a href="#" id="cerrar" class="botonExp"><img src="images/eliminarlisto.jpg" width="14" height="14" />Cerrar</a>
	</div>
</div>