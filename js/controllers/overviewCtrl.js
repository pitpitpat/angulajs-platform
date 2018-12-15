(function() {

	angular.module('healthmastersApp')
	.controller('overviewCtrl', function($rootScope, $scope, generalService, generalUtility) {

		$rootScope.currentPage = 'overview';

		/* ================= On start ================= */

		maleTrainees = generalUtility.getTraineesByGender($rootScope.allTrainees, "male");
		femaleTrainees = generalUtility.getTraineesByGender($rootScope.allTrainees, "female");

		var ctx = document.getElementById("genderOverview");
		var doughnutChart = new Chart(ctx, {
			type: 'pie',
			data: {
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
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		});

		var allTraineeAges = $rootScope.allTrainees.map(function(trainee) {
			today =  new Date();
			return today.getFullYear() - trainee.birth_date.getFullYear();
		});

		ages10 = generalUtility.getTraineesByAge($rootScope.allTrainees, null, 10).length;
		ages11_17 = generalUtility.getTraineesByAge($rootScope.allTrainees, 11, 17).length;
		ages18_24 = generalUtility.getTraineesByAge($rootScope.allTrainees, 18, 24).length;
		ages25_30 = generalUtility.getTraineesByAge($rootScope.allTrainees, 25, 30).length;
		ages31_40 = generalUtility.getTraineesByAge($rootScope.allTrainees, 31, 40).length;
		ages41_50 = generalUtility.getTraineesByAge($rootScope.allTrainees, 41, 50).length;
		ages51 = generalUtility.getTraineesByAge($rootScope.allTrainees, 51, null).length;

		var ctx2 = document.getElementById("ageOverview");
		var myBarChart = new Chart(ctx2, {
			type: 'bar',
			data: {
				datasets: [{
					label: "Ασκούμενοι ανά ηλικιακή ομάδα",
					backgroundColor: "#A390E4", // "#7699D4", #FFD670", "#7494EA", "#9575cd"
					data: [ages10, ages11_17, ages18_24, ages25_30, ages31_40, ages41_50, ages51]
				}],
				labels: ["0-10", "11-17", "18-24", "25-30", "31-40", "41-50", "51+"]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [{
						barPercentage: 0.8
					}]
				}
			}
		});


		maleAges10 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, null, 10), "male").length;
		maleAges11_17 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 11, 17), "male").length;
		maleAges18_24 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 18, 24), "male").length;
		maleAges25_30 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 25, 30), "male").length;
		maleAges31_40 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 31, 40), "male").length;
		maleAges41_50 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 41, 50), "male").length;
		maleAges51 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 51, null), "male").length;

		femaleAges10 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, null, 10), "female").length;
		femaleAges11_17 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 11, 17), "female").length;
		femaleAges18_24 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 18, 24), "female").length;
		femaleAges25_30 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 25, 30), "female").length;
		femaleAges31_40 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 31, 40), "female").length;
		femaleAges41_50 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 41, 50), "female").length;
		femaleAges51 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 51, null), "female").length;

		var ctx3 = document.getElementById("genderAgeOverview");
		var myBarChart = new Chart(ctx3, {
			type: 'bar',
			data: {
				datasets: [
				{
					label: "Άνδρες ανά ηλικιακή ομάδα",
					backgroundColor: "#33b5e5",
					data: [maleAges10, maleAges11_17, maleAges18_24, maleAges25_30, maleAges31_40, maleAges41_50, maleAges51]
				},
				{
					label: "Γυναίκες ανά ηλικιακή ομάδα",
					backgroundColor: "#f06292",
					data: [femaleAges10, femaleAges11_17, femaleAges18_24, femaleAges25_30, femaleAges31_40, femaleAges41_50, femaleAges51]
				}
				],
				labels: ["0-10", "11-17", "18-24", "25-30", "31-40", "41-50", "51+"]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [{
						barPercentage: 0.7
					}]
				}
			}
		});

	});

})();
