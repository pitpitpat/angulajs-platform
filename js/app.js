(function() {

	angular.module("healthmastersApp", [
		"ngRoute",
		"angular-jwt",
		"angular-loading-bar",
		"smart-table"
	])
	.config(function($httpProvider, $routeProvider, cfpLoadingBarProvider, jwtOptionsProvider) {

		/* ================= Loading Spinner ================= */
		cfpLoadingBarProvider.includeSpinner = false;

		/* ================= JWT Authendication ================= */
		jwtOptionsProvider.config({
			tokenGetter: function(options) {
                token = localStorage.healthmastersJWT;
				if (!token) {
					window.location.href = "/login";
				}
				return token;
			},
			whiteListedDomains: ["api.ppserver.me", "localhost"]
		});
		$httpProvider.interceptors.push("jwtInterceptor");

		/* ================= Routing ================= */
		$routeProvider
		.when("/trainee/add", {
			templateUrl: '../templates/add-trainee.html',
			controller: 'addTraineeCtrl'
		})
		.when("/measurement/add", {
			templateUrl: '../templates/add-measurement.html',
			controller: 'addMeasurementsCtrl'
		})
		.when("/trainee/find", {
			templateUrl: '../templates/find-trainee.html',
			controller: 'findTraineeCtrl'
		})
		.when("/trainee/show-update/:ID", {
			templateUrl: '../templates/show-update-trainee.html',
			controller: 'showUpdateTraineeCtrl'
		})
		.when("/logout", {
			template: "",
			controller: function() {
				delete localStorage.healthmastersJWT;
				window.location.href = "/login";
  			}
		})
		.when("/", {
			redirectTo: '/trainee/add'
		})
		.otherwise({
			redirectTo: '/trainee/add'
		});

	})
	.run(function ($rootScope, generalUtility, generalService) {

		generalUtility.init_app();

		generalService.getAllTrainees().then(function(response) {
			$rootScope.allTrainees = response.data.all_trainees;
			for (index in $rootScope.allTrainees) {
				var trainee = $rootScope.allTrainees[index];
				$rootScope.allTrainees[index].fullname = trainee.name + ' ' + trainee.surname;
			}
			console.log($rootScope.allTrainees);
		});

	});

})();
