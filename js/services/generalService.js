(function() {

	angular.module('healthmastersApp')
	.factory('generalService', function($rootScope, $http) {

		var generalServiceFactory = {};

		generalServiceFactory.getUserList = function() {
			var endpoint = '/trainee/all/get';
			var url = $rootScope.healthmastersAPI + endpoint;

			return $http({
				method: "GET",
				url: url,
				headers: { 'Content-Type': 'application/json' }
			});
		};

		generalServiceFactory.insertNewTrainee = function(newTrainee) {
			var endpoint = '/trainee/new/insert';
			var url = $rootScope.healthmastersAPI + endpoint;

			var preparedNewTrainee = {
				name: newTrainee.name,
				surname: newTrainee.surname,
				age: newTrainee.age,
				gender: newTrainee.gender
			};

			return $http({
				method: "POST",
				url: url,
				headers: { 'Content-Type': 'application/json' },
				data: preparedNewTrainee
			});
		};

		return generalServiceFactory;

	});

})();
