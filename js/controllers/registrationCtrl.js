(function() {

	angular.module('healthmastersApp')
	.controller('registrationCtrl', function($rootScope, $scope, generalService) {

		$rootScope.currentPage = 'registration';
		$scope.newTrainee = {};

		var initNewTrainee = function() {
			$scope.newTrainee = {
				name: null,
				surname: null,
				fathername: null,
				address: null,
				birth_date: null,
				adt: null,
				occupation: null,
				contact_phone: null,
				emergency_phone: null,
				registration_date: null,
				height: null,
				weight: null,
				gender: null
			};
		}

		$scope.insertNewTrainee = function() {
			generalService.insertNewTrainee($scope.newTrainee).then(function(response) {
				console.log(response.data);
				initNewTrainee();
			});
		}

		/* ================= On start ================= */

		initNewTrainee();

	});

})();
