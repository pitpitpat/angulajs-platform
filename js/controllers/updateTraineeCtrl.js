angular.module('healthmastersApp')
.controller('updateTraineeCtrl', function($rootScope, $scope, $stateParams, generalService, generalUtility) {

	$rootScope.currentPage = 'update';
	$scope.trainee = $rootScope.allTrainees.find(function(trainee) {
		return trainee.id === $stateParams.ID;
	});

	$scope.updateTrainee = function() {
		generalService.updateTrainee($scope.trainee).then(function(response) {
			console.log(response.data);
			var preparedTrainee = generalUtility.prepareTrainee($scope.trainee, response.data.id);
			$rootScope.allTrainee = generalUtility.updateListItem($rootScope.allTrainees, preparedTrainee, response.data.id);
			generalUtility.showToast("Τα στοιχεία ενημερώθηκαν.", "success");
			console.log($rootScope.allTrainees);
		});
	}

	/* ================= On start ================= */

});
