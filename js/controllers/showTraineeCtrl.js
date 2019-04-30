angular.module('healthmastersApp')
.controller('showTraineeCtrl', function($rootScope, $scope, $state, $stateParams, generalService, traineeService, generalUtility) {

	$rootScope.currentPage = 'find';
	$scope.filteredTrainees = [];

	$scope.goToTraineeMeasurements = function(traineeId) {
		$state.go("base.content.measurement.show", {ID: traineeId});
	};

	$scope.goToTraineeInfo = function(traineeId) {
		$('[data-toggle="tooltip"]').tooltip("hide");
		$state.go("base.content.trainee.update", {ID: traineeId});
	};

	$scope.deleteTrainee = function(traineeId) {
		$('[data-toggle="tooltip"]').tooltip("hide");
		generalService.deleteTrainee(traineeId).then(function(response) {
			console.log(response.data);
			var trainee_id = response.data.trainee_id;
			$scope.filteredTrainees = $scope.filteredTrainees.filter(function(trainee) {
				return trainee.id !== trainee_id;
			});
		});
	};

	/* ================= On start ================= */

	$scope.query = $stateParams.query;

	var filters = {};
	if ($stateParams.query) {
		filters = {query: $stateParams.query};
	}
	traineeService.listTrainees(filters).then((response) => {
		$scope.filteredTrainees = response.data.trainees;
		$scope.filteredTrainees.forEach((trainee) => { trainee.fullname = trainee.name + ' ' + trainee.surname; });
		$scope.filteredTrainees = generalUtility.prepareObjectListDates($scope.filteredTrainees, "birth_date");
		$scope.filteredTrainees = generalUtility.prepareObjectListDates($scope.filteredTrainees, "registration_date");
	});

});
