(function() {

	angular.module('healthmastersApp')
	.controller('overviewCtrl', function($rootScope, $scope, generalService, generalUtility) {

		$rootScope.currentPage = 'overview';

		/* ================= On start ================= */

		$scope.$watch('allTrainees', function(newAllTrainees) {
			if (newAllTrainees) {
				maleTrainees = $rootScope.allTrainees.filter(function(trainee) {
					return trainee.gender === "male";
				});
				femaleTrainees = $rootScope.allTrainees.filter(function(trainee) {
					return trainee.gender === "female";
				});
				console.log(maleTrainees.length, femaleTrainees.length);
				var data = {
					datasets: [{
						data: [maleTrainees.length, femaleTrainees.length],
						backgroundColor: [
							"#42a5f5",
							"#f06292"
						]
					}],
					labels: [
						'Άνδρες',
						'Γυναίκες'
					]
				};

				var ctx = document.getElementById("pieOverview");
				var doughnutChart = new Chart(ctx, {
					type: 'pie',
					data: data
				});

				var allTraineeAges = $rootScope.allTrainees.map(function(trainee) {
					today =  new Date();
					return today.getFullYear() - trainee.birth_date.getFullYear();
				});

				ages0to17 = allTraineeAges.filter(function(age) {
					return age >= 0 && age <= 17;
				});
				ages18to25 = allTraineeAges.filter(function(age) {
					return age >= 18 && age <= 25;
				});
				ages26to35 = allTraineeAges.filter(function(age) {
					return age >= 26 && age <= 35;
				});
				ages36to45 = allTraineeAges.filter(function(age) {
					return age >= 36 && age <= 45;
				});
				ages46plus = allTraineeAges.filter(function(age) {
					return age >= 46;
				});

				data = {
					datasets: [{
						label: "Αριθμός ασκούμενων ανα ηλικία",
						backgroundColor: "#33b5e5",
						data: [ages0to17.length, ages18to25.length, ages26to35.length, ages36to45.length, ages46plus.length]
					}],
					labels: ["0-17", "18-25", "26-35", "36-45", "46+"]
				}
				var ctx2 = document.getElementById("barOverview");
				var myBarChart = new Chart(ctx2, {
					type: 'bar',
					data: data
				});
			}
		});

	});

})();
