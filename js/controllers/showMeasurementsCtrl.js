angular.module('healthmastersApp')
.controller('showMeasurementsCtrl', function($rootScope, $scope, $stateParams, $anchorScroll, generalService, generalUtility, measurements) {

	$anchorScroll();
	$rootScope.currentPage = 'show';

	$scope.traineeId = $stateParams.ID;
	$scope.trainee = generalUtility.getTraineeById($rootScope.allTrainees, $scope.traineeId);
	$scope.measurements = generalUtility.prepareObjectListDates(measurements.data.measurements, "measurement_date");

	$scope.deleteMeasurement = function(id) {
		$('[data-toggle="tooltip"]').tooltip('hide');
		var measurement = $scope.measurements.find(function(measurement) {
			return measurement._id === id;
		});

		generalService.deleteMeasurement($scope.traineeId, measurement._id, measurement.measurement_date).then(function(response) {
			var index = $scope.measurements.indexOf(measurement);
			$scope.measurements.splice(index, 1);
			generalUtility.showToast("Η μέτρηση διαγράφηκε.", "success");
		});
	}

	/* ================= On start ================= */

	console.log($scope.measurements);

	$scope.measurements.sort(function(a, b) {			// Sort measurements by measurement date
		return a.measurement_date.getTime() - b.measurement_date.getTime();
	});

	measurementDates = $scope.measurements.map(function(measurement) {
		return measurement.measurement_date;
	});
	measurementWeights = $scope.measurements.map(function(measurement) {
		return measurement.weight;
	});
	measurementFats = $scope.measurements.map(function(measurement) {
		return measurement.fat;
	});
	measurementMuscles = $scope.measurements.map(function(measurement) {
		return measurement.muscle;
	});
	measurementBMI = $scope.measurements.map(function(measurement) {
		return measurement.bmi;
	});

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
