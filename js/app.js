(function() {

	angular.module("healthmastersApp", [
		"ngRoute",
		"angular-jwt",
		"angular-loading-bar"
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
