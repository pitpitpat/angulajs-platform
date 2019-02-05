(function() {

	angular.module('healthmastersApp')
		.controller('showTraineeCtrl', function($rootScope, $scope, $state, generalService) {

			$rootScope.currentPage = 'find';

			$scope.goToTraineeMeasurements = function(traineeId) {
				$state.go("base.measurement.show", {ID: traineeId});
			};

			$scope.goToTraineeInfo = function(traineeId) {
				$('[data-toggle="tooltip"]').tooltip("hide");
				$state.go("base.trainee.update", {ID: traineeId});
			};

			$scope.deleteTrainee = function(traineeId) {
				$('[data-toggle="tooltip"]').tooltip("hide");
				generalService.deleteTrainee(traineeId).then(function(response) {
					console.log(response.data);
					var trainee_id = response.data.trainee_id;
					$rootScope.allTrainees = $rootScope.allTrainees.filter(function(trainee) {
						return trainee.id !== trainee_id;
					});
				});
			};

			/* ================= On start ================= */

		});

})();