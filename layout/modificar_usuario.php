<script type="text/javascript" src="JS/modificar_usuario.js"></script>
<div class="clsVenTitulo">
	<strong>MODIFICAR USUARIO</strong>
	<a href="" class="cerrar">Cerrar</a>
</div>
<div class="clsVenCont" align="center">
	<table id="">
		<tr>
			<td colspan="2"><label class="tituloC">Datos de Usuario:</label></td>
		</tr>
		<tr>
			<td align="right"><label class="etiqueta" for="tipoUsuario">Tipo Usuario</label></td>
			<td>
				<input type="hidden" id="tipoTemp" value="<?php echo $_POST['tipo']?>"/>
				<select class="entrada" id="tipoUsuario">
					<option value="1">Administrador</option>
					<option value="2">Trabajador</option>
				</select>
			</td>
		</tr>
		<tr>
			<td align="right"><label class="etiqueta" for="cuenta">Usuario</label></td>
			<td><input class="entrada" type="text" id="cuenta" value="<?php echo $_POST['cuenta']?>"/></td>
		</tr>
		<tr>
			<td align="right"><label for="" class="etiqueta">Contrase&ntilde;a</label></td>
			<td><input class="entrada" type="password" id="pass"/></td>
		</tr>
		<tr>
			<td align="right"><label for="" class="etiqueta">Repetir Contrase&ntilde;a</label></td>
			<td><input class="entrada" type="password" id="repass"/></td>
		</tr>
		<tr>
			<td colspan="2"><label class="tituloC">Datos Personales:</label></td>
		</tr>
		<tr>
			<td align="right"><label for="nombre" class="etiqueta">Nombre</label></td>
			<td><input class="entrada" type="text" id="nombre" value="<?php echo $_POST['nombre']?>"/></td>
		</tr>
		<tr>
			<td align="right"><label for="" class="etiqueta">Apellido Paterno</label></td>
			<td><input class="entrada" type="text" id="apellidoP" value="<?php echo $_POST['ap']?>"/></td>
		</tr>
		<tr>
			<td align="right"><label for="" class="etiqueta">Apellido Materno</label></td>
			<td><input class="entrada" type="text" id="apellidoM" value="<?php echo $_POST['am']?>"/></td>
		</tr>
		<tr>
			<td align="right"><label for="" class="etiqueta">DNI</label></td>
			<td><input class="entrada" type="text" id="dni" value="<?php echo $_POST['dni']?>"/></td>
		</tr>
		<tr>
			<td align="right"><label for="" class="etiqueta">Telefono</label></td>
			<td><input class="entrada" type="text" id="telefono" value="<?php echo $_POST['telefono']?>"/></td>
		</tr>
        <tr>
        	<td><input type="hidden" id="codigo" value="<?php echo $_POST['codigo']?>" /></td>
        </tr>
		<tr>
			<td colspan="2" align="center"><a class="botonExp" id="modificar" href="#">Modificar</a></td>
		</tr>
	</table>
</div>