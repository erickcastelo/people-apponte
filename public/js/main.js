    angular.module('alurapic', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $qProvider, $httpProvider) {

        $qProvider.errorOnUnhandledRejections(false);
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
        $httpProvider.defaults.headers.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;

        $locationProvider.html5Mode(true);

        $routeProvider.when('/principal', {
            templateUrl: 'partials/principal.html',
            controller: 'PrincipalController'
        });


        $routeProvider.when('/cadastrar', {
            templateUrl: 'partials/formulario.html',
            controller: 'FormularioController'
        });

        $routeProvider.when('/editar/:id', {
            templateUrl: 'partials/formulario.html',
            controller: 'FormularioController'
        });

        $routeProvider.otherwise( { redirectTo: '/principal'} );
    });