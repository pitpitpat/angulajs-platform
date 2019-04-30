angular.module('healthmastersApp')
.controller('addMeasurementsCtrl', function($rootScope, $scope, generalService, generalUtility) {

	$rootScope.currentPage = 'add';
	$scope.newMeasurement = {};

	var initNewMeasurement = function() {
		$scope.newMeasurement = {
			trainee_id: null,
			measurement_date: null,
			weight: null,
			fat: null,
			muscle: null,
			bmi: null,
			rm: null,
			visceral: null
		};
	};

	$scope.querySearch = function(query) {
		var results = $rootScope.allTrainees;
		if (query) {
			results = $rootScope.allTrainees.filter((trainee) => {
				return trainee.fullname.toLowerCase().includes(query.toLowerCase());
			});
		}
		return results;
	};

	$scope.selectedItemChange = function(traineeId) {
		$scope.newMeasurement.trainee_id = traineeId;
	};

	$scope.insertNewMeasurement = function() {
		generalService.insertNewMeasurement($scope.newMeasurement).then(function(response) {
			initNewMeasurement();
			generalUtility.showToast("Η μέτρηση προστέθηκε.", "success");
		});
	};

	/* ================= On start ================= */

	initNewMeasurement();

});
