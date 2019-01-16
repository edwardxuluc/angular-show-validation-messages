'use strict';

angular.module('show.validation.messages', [])

.constant('showValidationList', [
	{ name : 'required', message : '%s% es requerido.' },
	{ name : 'minlength', message : '%s% es muy corto.' },
	{ name : 'maxlength', message : '%s% es muy largo.' },
	{ name : 'float', message : '%s% no es una cantidad valida.' },
	{ name : 'url', message : '%s% no es una url valida.' },
	{ name : 'pattern', message : '%s% no tiene el formato requerido.' },
	{ name : 'maxsize', message : '%s% es un archivo muy grande.' },
	{ name : 'unique', message : '%s% se encuentra repetido.' },
	{ name : 'distinct', message : '%s% no coincide.' },
	{ name : 'ngMax', message : '%s% es una cantidad muy grande.' },
	{ name : 'ngMin', message : '%s% es un cantidad muy pequeña.' },
	{ name : 'date', message : '%s% no es una fecha valida.' },
	{ name : 'integer', message : '%s% no es un entero valido.' },
	{ name : 'email', message : '%s% no es un e-mail valido.' },
	{ name : 'rfc', message : '%s% no es un RFC valido', },
	{ name : 'curp', message : '%s% no es un curp valido' },
	{ name : 'file', message : '%s% no es un archivo valido' },
])

.service('showValidationConfig', function ( showValidationList ) {
	return {
		// FUNCION PARA ACTUALIZAR LOS MENSAJES DE ERROR
		update : function( errorName, errorMessage ){
			angular.forEach( showValidationList, function ( error, index ){
				if( error.name == errorName ){
					showValidationList[ index ].message = errorMessage;
				}
			})
		},

		// FUNCION PARA AGREGAR NUEVOS ERRORES
		add : function( errorName, errorMessage ){
			if( errorName != undefined && errorMessage != undefined ){
				showValidationList.push({ name : errorName, message : errorMessage });
			}
		}
	}	
})

.directive("showValidationMessages", function ( showValidationList  ) {

	// FUNCION PARA CREAR EL TEMPLATE A UTILIZAR
	var createTemplate = function(){

		var template = '<p class="help-block">';

		angular.forEach( showValidationList, function ( error ){
			template += '<span ng-show="$parent.{{form}}[\'{{name}}\'].$error.'+ error.name +' && !$parent.{{form}}[\'{{name}}\'].$pristine">{{errorMessages[\''+ error.name +'\'].replace(\'%s%\', title )}} </span>';
		})

		template += '</p>';

		return template;
	}

    return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        scope:{
            form         : '@',
            name         : '@',
            title        : '@',
        },
        link : function( scope, element, attributes ){
        	// ARRAY PARA ALMACENAR LOS MENSAJES DE ERROR
        	scope.errorMessages = [];

        	// DETERMINAR SI HAY MENSAKES PERSONALIZADOS O SI SE USAR LOS MENSAJES POR DEFAULT
        	angular.forEach( showValidationList, function ( item, index ){
                var mensaje = attributes[ item.name + 'Message' ] || item.message;
                scope.errorMessages[ item.name ] = mensaje.charAt(0).toUpperCase() + mensaje.substr(1);
        	})
        },
        template : createTemplate(),
    };
});