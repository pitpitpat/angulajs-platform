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

		$scope.deleteMeasurement = function(id) {
			var trainee_id = $scope.mergedMeasurements.trainee_id;
			var measurement = $scope.mergedMeasurements.allMeasurements.find(function(measurement) {
				return measurement._id === id;
			});

			generalService.deleteMeasurement(trainee_id, measurement._id, measurement.measurement_date).then(function(response) {
				var index = $scope.mergedMeasurements.allMeasurements.indexOf(measurement);
				$scope.mergedMeasurements.allMeasurements.splice(index, 1);		// Must fix: not removed from $scope.measurementsByMonth
				console.log(response.data);
				generalUtility.showToast("Η μέτρηση διαγράφηκε.", "success");
			});
		}

		/* ================= On start ================= */

		$scope.getMeasurementsOfTrainee();

	});

})();