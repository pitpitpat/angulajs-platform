(function() {

	angular.module('healthmastersApp')
	.controller('addTraineeCtrl', function($rootScope, $scope, generalService, generalUtility) {

		$rootScope.currentPage = 'add';
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
				var preparedNewTrainee = generalUtility.prepareNewTrainee($scope.newTrainee, response.data.new_trainee_id);
				$rootScope.allTrainees.push(preparedNewTrainee);
				console.log($rootScope.allTrainees);
				initNewTrainee();
			});
		}

		/* ================= On start ================= */

		initNewTrainee();

	});

})();
