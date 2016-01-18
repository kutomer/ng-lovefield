'use strict';

angular.module('ng-lovefield-demo', ['ngRoute', 'kutomer.ng-lovefield']).
		config(['$routeProvider', '$locationProvider',
			function($routeProvider, $locationProvider) {

				//can't use this with github demo / if don't have access to the server
				$locationProvider.html5Mode(false);

				var staticPath = '/';
				var appPathRoute = '/';
				var pagesPath = staticPath + 'demo/';

				$routeProvider.when(appPathRoute + 'main', {templateUrl: pagesPath + 'main/main.html'});
				$routeProvider.otherwise({redirectTo: appPathRoute + 'main'});
			}]
		)
		.config(['lovefieldProvider',
			function(lovefieldProvider) {
				var schemaBuilder = lovefieldProvider.create('test', 1);

				schemaBuilder.createTable('first').
				addColumn('str_col', lovefieldProvider.Type.STRING).
				addColumn('num_col', lovefieldProvider.Type.NUMBER).
				addPrimaryKey(['str_col']);
			}]
		);