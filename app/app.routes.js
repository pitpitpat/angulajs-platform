angular.module("healthmastersApp")
.config(function($stateProvider, $urlRouterProvider) {

	/* ================= Routes ================= */
	$stateProvider
	.state("base", {
		url: "?query",
		redirectTo: 'base.content'
	})
	.state("base.content", {
		url: "",
		templateUrl: '../templates/content.html',
		resolve: {
			user: function(generalService) {
				return generalService.getUserInfo();
			},
			allTrainees: function(traineeService) {
				return traineeService.listTrainees();	// List all active trainees
			}
		},
		controller: function($rootScope, $location, $state, generalUtility, allTrainees, user) {
			$rootScope.user = user.data.user_info;

			$rootScope.allTrainees = allTrainees.data.trainees;
			for (index in $rootScope.allTrainees) {
				var trainee = $rootScope.allTrainees[index];
				$rootScope.allTrainees[index].fullname = trainee.name + ' ' + trainee.surname;
			}
			$rootScope.allTrainees = generalUtility.prepareObjectListDates($rootScope.allTrainees, "birth_date");
			$rootScope.allTrainees = generalUtility.prepareObjectListDates($rootScope.allTrainees, "registration_date");

			// if ($location.$$path === "/") {		// If no state is specified in url redirect to overview
			// 	$state.go("base.content.overview");
			// }
		},
		redirectTo: 'base.content.overview'
	})
	.state("base.content.overview", {
		url: "/overview",
		templateUrl: '../templates/overview.html',
		controller: 'overviewCtrl'
	})
	.state("base.content.trainee", {
		url: "/trainee"
	})
	.state("base.content.trainee.add", {
		url: "/add",
		templateUrl: '../templates/add-trainee.html',
		controller: 'addTraineeCtrl'
	})
	.state("base.content.trainee.show", {
		url: "/show",
		templateUrl: '../templates/show-trainee.html',
		controller: 'showTraineeCtrl'
	})
	.state("base.content.trainee.update", {
		url: "/update/:ID",
		templateUrl: '../templates/update-trainee.html',
		controller: 'updateTraineeCtrl'
	})
	.state("base.content.measurement", {
		url: "/measurement"
	})
	.state("base.content.measurement.add", {
		url: "/add",
		templateUrl: '../templates/add-measurement.html',
		controller: 'addMeasurementsCtrl'
	})
	.state("base.content.measurement.show", {
		url: "/show/:ID",
		templateUrl: '../templates/show-measurements.html',
		controller: 'showMeasurementsCtrl',
		resolve: {
			measurements: function($stateParams, generalService) {
				var traineeId = $stateParams.ID;
				return generalService.getTraineeMeasurements(traineeId);
			}
		}
	})
	.state("base.content.user", {
		url: "/user"
	})
	.state("base.content.user.profile", {
		url: "/profile",
		templateUrl: '../templates/user-profile.html',
		controller: 'userProfileCtrl'
	})
	.state("logout", {
		url: "/logout",
		controller: function() {
			delete localStorage.healthmastersJWT;
			window.location.href = "/login";
			}
	});

	$urlRouterProvider.otherwise('/');

});
