(function() {

	angular.module('healthmastersApp')
	.controller('showUpdateTraineeCtrl', function($rootScope, $scope, $routeParams, generalService, generalUtility) {

		$rootScope.currentPage = 'show-update';
		$scope.mode = 'show';
		$scope.$watch('allTrainees', function(newAllTrainees) {
			if (newAllTrainees) {
				$scope.trainee = newAllTrainees.find(function(trainee) {
					return trainee.id === $routeParams.ID;
				});
			}
		});

		// $scope.insertNewTrainee = function() {
		// 	generalService.insertNewTrainee($scope.newTrainee).then(function(response) {
		// 		console.log(response.data);
		// 		var preparedNewTrainee = generalUtility.prepareNewTrainee($scope.newTrainee, response.data.new_trainee_id);
		// 		$rootScope.allTrainees.push(preparedNewTrainee);
		// 		console.log($rootScope.allTrainees);
		// 		initNewTrainee();
		// 	});
		// }

		/* ================= On start ================= */

	});

})();