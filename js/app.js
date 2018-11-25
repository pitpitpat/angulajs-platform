(function() {

	$(document).ready(function() {
		$("body").tooltip({ selector: '[data-toggle=tooltip]', trigger: 'hover', boundary: 'window'});
	});

	$(document).on('scroll',function() {	// Scroll to top button appear
		var scrollDistance = $(this).scrollTop();
		if (scrollDistance > 100) {
			$('.scroll-to-top').fadeIn();
		} else {
			$('.scroll-to-top').fadeOut();
		}
	});

	angular.module("healthmastersApp", [
		"ngRoute",
		"angular-jwt",
		"angular-loading-bar",
		"smart-table",
		'ngMaterial',
		'ngMessages'
	])
	.config(function($httpProvider, $routeProvider, $mdThemingProvider, cfpLoadingBarProvider, jwtOptionsProvider) {

		/* ================= Material Design Themes ================= */
		$mdThemingProvider.theme("success");
		$mdThemingProvider.theme("danger");

		/* ================= Loading Spinner ================= */
		cfpLoadingBarProvider.includeSpinner = false;

		/* ================= JWT Authendication ================= */
		jwtOptionsProvider.config({
			tokenGetter: function(options) {
				token = localStorage.healthmastersJWT;
				if (!token) {
					window.location.href = "#!/logout";
				}
				return token;
			},
			whiteListedDomains: ["api.ppserver.me", "localhost"],
			unauthenticatedRedirectPath: '/logout'
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
		.when("/trainee/show", {
			templateUrl: '../templates/show-trainee.html',
			controller: 'showTraineeCtrl'
		})
		.when("/trainee/update/:ID", {
			templateUrl: '../templates/update-trainee.html',
			controller: 'updateTraineeCtrl'
		})
		.when("/measurements/show/:ID", {
			templateUrl: '../templates/show-measurements.html',
			controller: 'showMeasurementsCtrl'
		})
		.when("/user/profile", {
			templateUrl: '../templates/user-profile.html',
			controller: 'userProfileCtrl'
		})
		.when("/logout", {
			template: "",
			controller: function() {
				delete localStorage.healthmastersJWT;
				window.location.href = "/login";
  			}
		})
		.when("/", {
			redirectTo: '/trainee/show'
		})
		.otherwise({
			redirectTo: '/trainee/show'
		});

	})
	.run(function ($rootScope, generalUtility, generalService, authManager) {

		generalUtility.init_app();

		authManager.checkAuthOnRefresh();
		authManager.redirectWhenUnauthenticated();

		generalService.getUserInfo().then(function(response) {
			$rootScope.user = response.data.user_info;
			console.log($rootScope.user);
		});

		generalService.getAllTrainees().then(function(response) {
			$rootScope.allTrainees = response.data.all_trainees;
			for (index in $rootScope.allTrainees) {
				var trainee = $rootScope.allTrainees[index];
				$rootScope.allTrainees[index].fullname = trainee.name + ' ' + trainee.surname;
			}
			$rootScope.allTrainees = generalUtility.prepareListDates($rootScope.allTrainees, "birth_date");
			$rootScope.allTrainees = generalUtility.prepareListDates($rootScope.allTrainees, "registration_date");
			console.log($rootScope.allTrainees);
		});

	});

})();
