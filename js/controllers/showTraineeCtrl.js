(function() {

	angular.module('healthmastersApp')
		.controller('showTraineeCtrl', function($rootScope, $scope, generalService) {

			$rootScope.currentPage = 'find';

			$scope.goToTraineeMeasurements = function(traineeId) {
				window.location.href = '#!/measurements/show/' + traineeId;
			};

			$scope.goToTraineeInfo = function(traineeId) {
				$('[data-toggle="tooltip"]').tooltip('hide');
				window.location.href = '#!/trainee/update/' + traineeId;
			};

			/* ================= On start ================= */

		});

})();