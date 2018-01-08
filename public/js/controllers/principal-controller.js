angular.module('alurapic').controller('PrincipalController', PrincipalController);

function PrincipalController($scope, PeopleService) {

    $scope.peoples = [];

    $scope.orderByField = 'name';
    $scope.reverseSort = false;
    $scope.next = "";
    $scope.previous = "";
    $scope.tamanhoMaximo = 0;
    $scope.numeracao = 0;
    $scope.aux = 0;
    $scope.index = 0;

    PeopleService.peoples().then(function (value) {
        $scope.peoples = value.data.results;
        $scope.next = value.data.next;
        $scope.previous = value.data.previous;
        $scope.tamanhoMaximo = Math.round(value.data.count / 10);
        console.log($scope.tamanhoMaximo);
    }).catch(function (error) {
        console.log(error);
    });

    $scope.proximo = function () {
        var active = document.querySelector('.active');
        var numeracao = 0;
        numeracao = (parseInt(active.id) + 1) === $scope.tamanhoMaximo + 1 ? numeracao: (parseInt(active.id) + 1);

        document.getElementById(numeracao).classList.add('active');

        if ($scope.aux !== 0)
            document.getElementById($scope.aux).classList.remove('active');

        if ($scope.aux === 0)
            document.getElementById(1).classList.remove('active');

        $scope.aux = numeracao;

        PeopleService.active($scope.aux).then(function (value) {
            $scope.peoples = value.data.results;
            $scope.next = value.data.next;
            $scope.previous = value.data.previous;
        }).catch(function (error) {
            console.log(error);
        });
    };

    $scope.anterior = function () {
        var active = document.querySelector('.active');
        var numeracao = 0;
        numeracao = (parseInt(active.id) - 1) === 0 ? numeracao: (parseInt(active.id) - 1);

        document.getElementById(numeracao).classList.add('active');

        if ($scope.aux !== 0)
            document.getElementById($scope.aux).classList.remove('active');

        if ($scope.aux === 0)
            document.getElementById(1).classList.remove('active');

        $scope.aux = numeracao;

        PeopleService.active($scope.aux).then(function (value) {
            $scope.peoples = value.data.results;
            $scope.next = value.data.next;
            $scope.previous = value.data.previous;
        }).catch(function (error) {
            console.log(error);
        });
    };

    $scope.active = function (numeracao) {
        document.getElementById(numeracao).classList.add('active');

        if ($scope.aux !== 0)
            document.getElementById($scope.aux).classList.remove('active');

        if ($scope.aux === 0)
            document.getElementById(1).classList.remove('active');

        $scope.aux = numeracao;

        PeopleService.active($scope.aux).then(function (value) {
            $scope.peoples = value.data.results;
            $scope.next = value.data.next;
            $scope.previous = value.data.previous;
        }).catch(function (error) {
            console.log(error);
        });
    };

    $scope.getNumber = function(num) {
        return new Array(num);
    };
}