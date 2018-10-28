(function() {

	angular.module('healthmastersApp')
	.controller('updateTraineeCtrl', function($rootScope, $scope, $routeParams, generalService, generalUtility) {

		$rootScope.currentPage = 'show-update';
		$scope.traineeLoaded = false;
		$scope.$watch('allTrainees', function(newAllTrainees) {
			if (newAllTrainees) {
				$scope.trainee = newAllTrainees.find(function(trainee) {
					return trainee.id === $routeParams.ID;
				});
				$scope.traineeLoaded = true;
			}
		});

		$scope.updateTrainee = function() {
			generalService.updateTrainee($scope.trainee).then(function(response) {
				console.log(response.data);
				var preparedTrainee = generalUtility.prepareTrainee($scope.trainee, response.data.id);
				$rootScope.allTrainee = generalUtility.updateListItem($rootScope.allTrainees, preparedTrainee, response.data.id);
				console.log($rootScope.allTrainees);
			});
		}

		/* ================= On start ================= */

	});

})();