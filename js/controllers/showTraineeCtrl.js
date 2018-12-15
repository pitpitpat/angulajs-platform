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

			/* ================= On start ================= */

		});

})();