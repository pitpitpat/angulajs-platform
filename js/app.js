(function() {

	angular.module("healthmastersApp", [
		"ngRoute",
		"angular-loading-bar"
	])
	.config(function($routeProvider, cfpLoadingBarProvider) {

		/* ================= Loading Spinner ================= */
		cfpLoadingBarProvider.includeSpinner = false;

		/* ================= Routing ================= */
		$routeProvider
		.when("/registration", {
			templateUrl: '../templates/registration.html',
			controller: 'registrationCtrl'
		})
		.when("/measurements", {
			templateUrl: '../templates/measurements.html',
			controller: 'measurementsCtrl'
		})
		.when("/", {
			redirectTo: '/registration'
		})
		.otherwise({
			redirectTo: '/registration'
		});

	})
	.run(function ($rootScope, generalUtility) {

		generalUtility.init_app();

	});

})();
