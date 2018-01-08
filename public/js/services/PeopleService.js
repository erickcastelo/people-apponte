angular.module('alurapic')
    .service('PeopleService', function ($http) {

        return {
            peoples: function () {
                return $http({
                    method : 'get',
                    url : 'https://swapi.co/api/people/?format=json',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            },

            active: function (numeracao) {
                return $http({
                    method : 'get',
                    url : 'https://swapi.co/api/people/?page='+numeracao+'&format=json',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function(event){
                    return event;
                })
            }
        }
    });
