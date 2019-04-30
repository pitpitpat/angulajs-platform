angular.module('healthmastersApp')
.factory('traineeService', function($rootScope, $http) {

    var traineeService = {};

    traineeService.listTrainees = function(filters={}) {
        var endpoint = '/trainee/list';
        var data = filters;

        return $http({
            method: "POST",
            url: $rootScope.healthmastersAPI + endpoint,
            headers: {'Content-Type': 'application/json'},
            data: data
        });
    };

    return traineeService;

});
