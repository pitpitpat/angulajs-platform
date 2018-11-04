(function() {

	angular.module('healthmastersApp')
		.controller('findTraineeCtrl', function($rootScope, $scope, generalService) {

			$rootScope.currentPage = 'find';

			$scope.goToTraineeMeasurements = function(traineeId) {
				window.location.href = '#!/measurements/show/' + traineeId;
			};

			$scope.goToTraineeInfo = function(traineeId) {
				window.location.href = '#!/trainee/show-update/' + traineeId;
				$('[data-toggle="tooltip"]').tooltip('hide');
			};

			/* ================= On start ================= */

		});

})();