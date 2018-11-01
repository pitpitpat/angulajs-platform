(function() {

	angular.module('healthmastersApp')
		.controller('findTraineeCtrl', function($rootScope, $scope, generalService) {

			$rootScope.currentPage = 'find';

			$scope.goToTraineeInfo = function(traineeId) {
				window.location.href = '#!/measurements/show/' + traineeId;
			}

			/* ================= On start ================= */

		});

})();