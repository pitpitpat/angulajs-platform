(function() {

	angular.module('healthmastersApp')
	.controller('showMeasurementsCtrl', function($rootScope, $scope, $routeParams, generalService, generalUtility) {

		$rootScope.currentPage = 'show';
		$scope.trainee_id = $routeParams.ID;
		$scope.measurementsByMonth = null;
		$scope.mergedMeasurements = null;

		$scope.getMeasurementsOfTrainee = function() {
			generalService.getMeasurementsOfTrainee($scope.trainee_id).then(function(response) {
				$scope.measurementsByMonth = generalUtility.prepareMeasurementsByMonth(response.data.measurements);
				$scope.mergedMeasurements = generalUtility.mergeMeasurements($scope.measurementsByMonth);
				console.log($scope.measurementsByMonth);
				console.log($scope.mergedMeasurements);
			});
		}

		/* ================= On start ================= */

		$scope.getMeasurementsOfTrainee();

	});

})();