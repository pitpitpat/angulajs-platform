(function() {

	angular.module('healthmastersApp')
	.controller('showMeasurementsCtrl', function($rootScope, $scope, $stateParams, $anchorScroll, generalService, generalUtility, measurements) {

		$anchorScroll();
		$rootScope.currentPage = 'show';

		$scope.traineeId = $stateParams.ID;
		$scope.trainee = generalUtility.getTraineeById($rootScope.allTrainees, $scope.traineeId);

		$scope.measurementsByMonth = generalUtility.prepareMeasurementsByMonth(measurements.data.measurements);
		$scope.mergedMeasurements = generalUtility.mergeMeasurements($scope.measurementsByMonth);

		console.log($scope.measurementsByMonth);
		console.log($scope.mergedMeasurements);

		$scope.deleteMeasurement = function(id) {
			$('[data-toggle="tooltip"]').tooltip('hide');
			var measurement = $scope.mergedMeasurements.allMeasurements.find(function(measurement) {
				return measurement._id === id;
			});

			generalService.deleteMeasurement($scope.traineeId, measurement._id, measurement.measurement_date).then(function(response) {
				var index = $scope.mergedMeasurements.allMeasurements.indexOf(measurement);
				$scope.mergedMeasurements.allMeasurements.splice(index, 1);		// Must fix: not removed from $scope.measurementsByMonth
				console.log(response.data);
				generalUtility.showToast("Η μέτρηση διαγράφηκε.", "success");
			});
		}

		/* ================= On start ================= */

		$scope.mergedMeasurements.allMeasurements.sort(function(a, b) {			// Sort measurements by measurement date
			return a.measurement_date.getTime() - b.measurement_date.getTime();
		});

		measurementDates = $scope.mergedMeasurements.allMeasurements.map(function(measurement) {
			return measurement.measurement_date;
		});
		measurementWeights = $scope.mergedMeasurements.allMeasurements.map(function(measurement) {
			return measurement.weight;
		});
		measurementFats = $scope.mergedMeasurements.allMeasurements.map(function(measurement) {
			return measurement.fat;
		});
		measurementMuscles = $scope.mergedMeasurements.allMeasurements.map(function(measurement) {
			return measurement.muscle;
		});
		measurementBMI = $scope.mergedMeasurements.allMeasurements.map(function(measurement) {
			return measurement.bmi;
		});

		console.log(measurementDates, measurementWeights);

		var ctx = document.getElementById("weightEvolution");
		var myBarChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: measurementDates,
				datasets: [
				{
					label: 'Κιλά',
					fill: false,
					spanGaps: true,
					lineTension: 0.2,
					backgroundColor: "#ff9800",
					borderColor: "#ff9800",
					data: measurementWeights
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					mode: 'index',
					intersect: false
				},
				hover: {
					mode: 'nearest'
				},
				scales: {
					xAxes: [
						{
							type: 'time',
							time: {
								unit: 'month',
								displayFormats: {
									month: 'MMM YYYY'
								}
							}
						}
					]
				}
			}
		});

		var ctx2 = document.getElementById("fatMuscleEvolution");
		var myBarChart = new Chart(ctx2, {
			type: 'line',
			data: {
				labels: measurementDates,
				datasets: [
				{
					label: 'Λίπος %',
					fill: false,
					spanGaps: true,
					lineTension: 0.2,
					backgroundColor: "#e91e63",
					borderColor: "#e91e63",
					data: measurementFats
				},
				{
					label: 'Μυικότητα %',
					fill: false,
					spanGaps: true,
					lineTension: 0.2,
					backgroundColor: "#2196f3",
					borderColor: "#2196f3",
					data: measurementMuscles
				},
				{
					label: 'BMI',
					fill: false,
					spanGaps: true,
					lineTension: 0.2,
					backgroundColor: "#43a047",
					borderColor: "#43a047",
					data: measurementBMI
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				tooltips: {
					mode: 'index',
					intersect: false
				},
				hover: {
					mode: 'nearest'
				},
				scales: {
					xAxes: [
						{
							type: 'time',
							time: {
								unit: 'month',
								displayFormats: {
									month: 'MMM YYYY'
								}
							}
						}
					]
				}
			}
		});

	});

})();