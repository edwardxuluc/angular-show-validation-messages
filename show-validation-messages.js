'use strict';

angular.module('show.validation.messages', [])

.constant('showValidationList', [
	{ name : 'required', message : 'es requerido.' },
	{ name : 'minlength', message : 'es muy corto.' },
	{ name : 'maxlength', message : 'es muy largo.' },
	{ name : 'float', message : 'no es una cantidad valida.' },
	{ name : 'url', message : 'no es una url valida.' },
	{ name : 'pattern', message : 'no tiene el formato requerido.' },
	{ name : 'maxsize', message : 'es un archivo muy grande.' },
	{ name : 'unique', message : 'se encuentra repetido.' },
	{ name : 'distinct', message : 'no coincide.' },
	{ name : 'maxnumber', message : 'es una cantidad muy grande.' },
	{ name : 'minnumber', message : 'es un cantidad muy pequeña.' },
	{ name : 'date', message : 'no es una fecha valida.' },
	{ name : 'integer', message : 'no es un entero valido.' },
	{ name : 'email', message : 'no es un e-mail valido.' },
	{ name : 'rfc', message : 'no es un RFC valido', },
	{ name : 'curp', message : 'no es un curp valido' },
	{ name : 'file', message : 'no es un archivo valido' },
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
			template += '<span ng-show="$parent.{{form}}.{{name}}.$error.'+ error.name +' && !$parent.{{form}}.{{name}}.$pristine">{{title}} {{errorMessages[\''+ error.name +'\']}} </span>';
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
        		// console.log( item );
        		scope.errorMessages[ item.name ] = attributes[ item.name + 'Message' ] || item.message;
        	})
        },
        template : createTemplate(),
    };
})