(function() {

	angular.module('healthmastersApp')
		.controller('findTraineeCtrl', function($rootScope, $scope, generalService) {

			$rootScope.currentPage = 'find';

			$scope.goToTraineeMeasurements = function(traineeId) {
				window.open(
					'#!/measurements/show/' + traineeId,
					'_blank' // <- This is what makes it open in a new window.
				);
			}

			$scope.goToTraineeInfo = function(traineeId) {
				window.location.href = '#!/trainee/show-update/' + traineeId;
				$('[data-toggle="tooltip"]').tooltip('hide');
			}

			/* ================= On start ================= */

		});

})();