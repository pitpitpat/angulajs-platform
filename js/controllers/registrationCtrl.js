(function() {

	angular.module('healthmastersApp')
	.controller('registrationCtrl', function($rootScope, $scope, generalService) {

		$rootScope.currentPage = 'registration';
		$scope.newTrainee = {
			name: null,
			surname: null,
			age: null,
			gender: 'male'
		};

		$scope.insertNewTrainee = function() {
			// generalService.insertNewTrainee($scope.newTrainee).then(function(response) {
			// 	console.log(response.data);
			// });
		}

	});

})();
