<script type="text/javascript" src="JS/funciones.js"></script>
<script type="text/javascript" src="JS/crear_usuario.js"></script>
<div class="cajaContenido">
	<table>
		<tr>
			<td colspan="2" align="center"><label class="titulo">CREAR NUEVO USUARIO</label></td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="tipoUsuario">Tipo Usuario</label></td>
			<td>
				<select class="entrada" id="tipoUsuario">
					<option value="2">Trabajador</option>
					<option value="1">Administrador</option>
				</select>
			</td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="usuarioNuevo">Usuario</label></td>
			<td>
				<div>
					<strong id="prefijo">34_</strong>
					<input class="entrada" name="usuarioNuevo" id="usuarioNuevo" size="16" type="text" style="text-transform:uppercase;" unkeyup="javascript:this.value.toUpperCase();" >
				</div>
			</td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="passNuevo">Constrase&ntilde;a</label></td>
			<td><input class="entrada" name="passNuevo" id="passNuevo" size="20" type="password"></td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="repassNuevo">Repetir Constrase&ntilde;a</label></td>
			<td><input class="entrada" name="repassNuevo" id="repassNuevo" size="20" type="password"></td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="nombre">Nombre</label></td>
			<td><input class="entrada" name="nombre" id="nombre" size="20" type="text"></td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="apellidoPaterno">Apellido Paterno</label></td>
			<td><input class="entrada" name="apellidoPaterno" id="apellidoPaterno" size="20" type="text"></td>
		</tr>
        <tr align="left">
			<td><label class="etiquetaExp" for="apellidoMaterno">Apellido Materno</label></td>
			<td><input class="entrada" name="apellidoMaterno" id="apellidoMaterno" size="20" type="text"></td>
		</tr>
		<tr align="left">
			<td><label class="etiquetaExp" for="dni">DNI</label></td>
			<td><input class="entrada" name="dni" id="dni" size="8" type="text"></td>
		</tr>
        <tr align="left">
			<td><label class="etiquetaExp" for="telefono">Telefono</label></td>
			<td><input class="entrada" name="telefono" id="telefono" size="8" type="text"></td>
		</tr>
	</table>
    <div align="center">
		<a href="#" id="nuevo" class="botonExp">Crear Usuario</a>
		<a href="#" id="cerrar" class="botonExp">Cerrar</a>
	</div>
</div>