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
		ages11_15 = generalUtility.getTraineesByAge($rootScope.allTrainees, 11, 15).length;
		ages16_20 = generalUtility.getTraineesByAge($rootScope.allTrainees, 16, 20).length;
		ages21_25 = generalUtility.getTraineesByAge($rootScope.allTrainees, 21, 25).length;
		ages26_30 = generalUtility.getTraineesByAge($rootScope.allTrainees, 26, 30).length;
		ages31_35 = generalUtility.getTraineesByAge($rootScope.allTrainees, 31, 35).length;
		ages36_40 = generalUtility.getTraineesByAge($rootScope.allTrainees, 36, 40).length;
		ages41_45 = generalUtility.getTraineesByAge($rootScope.allTrainees, 41, 45).length;
		ages46_50 = generalUtility.getTraineesByAge($rootScope.allTrainees, 46, 50).length;
		ages51 = generalUtility.getTraineesByAge($rootScope.allTrainees, 51, null).length;

		var ctx2 = document.getElementById("ageOverview");
		var myBarChart = new Chart(ctx2, {
			type: 'bar',
			data: {
				datasets: [{
					label: "Ασκούμενοι ανά ηλικιακή ομάδα",
					backgroundColor: "#26c6da", // "#7699D4", #FFD670", "#7494EA", "#9575cd"
					data: [ages10, ages11_15, ages16_20, ages21_25, ages26_30, ages31_35, ages36_40, ages41_45, ages46_50, ages51]
				}],
				labels: ["0-10", "11-15", "16-20", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51+"]
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
		maleAges11_15 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 11, 15), "male").length;
		maleAges16_20 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 16, 20), "male").length;
		maleAges21_25 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 21, 25), "male").length;
		maleAges26_30 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 26, 30), "male").length;
		maleAges31_35 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 31, 35), "male").length;
		maleAges36_40 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 36, 40), "male").length;
		maleAges41_45 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 41, 45), "male").length;
		maleAges46_50 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 46, 50), "male").length;
		maleAges51 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 51, null), "male").length;

		femaleAges10 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, null, 10), "female").length;
		femaleAges11_15 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 11, 15), "female").length;
		femaleAges16_20 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 16, 20), "female").length;
		femaleAges21_25 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 21, 25), "female").length;
		femaleAges26_30 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 26, 30), "female").length;
		femaleAges31_35 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 31, 35), "female").length;
		femaleAges36_40 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 36, 40), "female").length;
		femaleAges41_45 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 41, 45), "female").length;
		femaleAges46_50 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 46, 50), "female").length;
		femaleAges51 = generalUtility.getTraineesByGender(generalUtility.getTraineesByAge($rootScope.allTrainees, 51, null), "female").length;

		var ctx3 = document.getElementById("genderAgeOverview");
		var myBarChart = new Chart(ctx3, {
			type: 'bar',
			data: {
				datasets: [
				{
					label: "Άνδρες ανά ηλικιακή ομάδα",
					backgroundColor: "#33b5e5",
					data: [maleAges10, maleAges11_15, maleAges16_20, maleAges21_25, maleAges26_30, maleAges31_35, maleAges36_40, maleAges41_45, maleAges46_50, maleAges51]
				},
				{
					label: "Γυναίκες ανά ηλικιακή ομάδα",
					backgroundColor: "#f06292",
					data: [femaleAges10, femaleAges11_15, femaleAges16_20, femaleAges21_25, femaleAges26_30, femaleAges31_35, femaleAges36_40, femaleAges41_45, femaleAges46_50, femaleAges51]
				}
				],
				labels: ["0-10", "11-15", "16-20", "21-25", "26-30", "31-35", "36-40", "41-45", "46-50", "51+"]
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
