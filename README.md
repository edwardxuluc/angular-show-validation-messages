## Autor
Edward paulino xuluc chulim
  
## Instalación

```bash
bower install angular-show-validation-messages
```

```
<script src="bower_components/angular-modal-confirm/angular-modal-confirm.js"></script>
```

## Importación

```javascript
angular.module('myModule', ['show.validation.messages']);
```
## Configuración

```javascript
.run(['showValidationConfig', function (showValidationConfig) {
    // %s% sera sustituido por el titulo
    // AGREGAR NUEVO MENSAJE DE VALIDACIÓN
    showValidationConfig.add('password', 'Contraseña no valida');   
    showValidationConfig.add('passwordFormat', 'debe contener entre 8 y 15 caracteres entre letras, numeros y simbolos especiales( # $ @ ;)');  
    showValidationConfig.add('codigopostal', '%s% no es valido');  
    showValidationConfig.add('validatemax', '%s% es una cantidad muy grande');
    showValidationConfig.add('validatemin', '%s% es una cantidad muy pequeña');
    showValidationConfig.add('mask', '%s% no es valido');

    // EDITAR MENSAJES DE VALIDACION
    showValidationConfig.update('email', '%s% no es valido');
}])

```

## Uso
```
<form name="usuarioForm" ng-submit="submit( usuarioForm )" novalidate submit-validate submit-focus>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <input type="text" name="usuario" ng-model="usuario.usuario" ng-required="true" class="form-control" placeholder="Usuario">
            
            <show-validation-messages form="usuarioForm" name="usuario" title="Usuario"></show-validation-messages>
        </div>    
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right">
            <button type="button" class="btn btn-default" ng-click="cancelar()">
                <i class="fa fa-arrow-left"></i> Cancelar
            </button>
            
            <button type="submit" class="btn btn-success">
                <i class="fa fa-save"></i> Guardar
            </button>
        </div>
    </div>
</form>
```