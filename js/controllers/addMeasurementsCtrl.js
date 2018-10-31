(function() {

	angular.module('healthmastersApp')
		.controller('addMeasurementsCtrl', function($rootScope, $scope, generalService) {

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
			}

			$scope.insertNewMeasurement = function() {
				console.log($scope.newMeasurement);
				generalService.insertNewMeasurement($scope.newMeasurement).then(function(response) {
					console.log(response.data);
					initNewMeasurement();
				});
			}

			/* ================= On start ================= */

			initNewMeasurement();

		});

})();