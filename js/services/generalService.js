(function() {

	angular.module('healthmastersApp')
	.factory('generalService', function($rootScope, $http, generalUtility) {

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
			var endpoint = '/trainee/insert';
			var url = $rootScope.healthmastersAPI + endpoint;

			var preparedNewTrainee = {
				name: newTrainee.name,
				surname: newTrainee.surname,
				fathername: newTrainee.fathername,
				address: newTrainee.address,
				birth_date: generalUtility.prepareDate(newTrainee.birth_date),
				adt: newTrainee.adt,
				occupation: newTrainee.occupation,
				contact_phone: newTrainee.contact_phone,
				emergency_phone: newTrainee.emergency_phone,
				registration_date: generalUtility.prepareDate(newTrainee.registration_date),
				height: newTrainee.height,
				weight: newTrainee.weight,
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
