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
		'ui.router',
		"angular-jwt",
		"angular-loading-bar",
		"smart-table",
		'ngMaterial',
		'ngMessages'
	])
	.config(function($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider, jwtOptionsProvider) {

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
					window.location.href = "/#!/logout";
				}
				return token;
			},
			whiteListedDomains: ["api.ppserver.me", "localhost"],
			unauthenticatedRedirectPath: '/logout'
		});
		$httpProvider.interceptors.push("jwtInterceptor");

		/* ================= Routing ================= */
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state("base", {
			url: "/",
			resolve: {
				user: function(generalService) {
					return generalService.getUserInfo();
				},
				allTrainees: function(generalService) {
					return generalService.getAllTrainees();
				}
			},
			controller: function($rootScope, $location, $state, generalUtility, allTrainees, user) {
				$rootScope.user = user.data.user_info;

				$rootScope.allTrainees = allTrainees.data.all_trainees;
				for (index in $rootScope.allTrainees) {
					var trainee = $rootScope.allTrainees[index];
					$rootScope.allTrainees[index].fullname = trainee.name + ' ' + trainee.surname;
				}
				$rootScope.allTrainees = generalUtility.prepareObjectListDates($rootScope.allTrainees, "birth_date");
				$rootScope.allTrainees = generalUtility.prepareObjectListDates($rootScope.allTrainees, "registration_date");

				if ($location.$$path === "/") {		// If no state is specified redirect to overview
					$state.go("base.overview");
				}
			}
		})
		.state("base.overview", {
			url: "overview",
			templateUrl: '../templates/overview.html',
			controller: 'overviewCtrl'
		})
		.state("base.trainee", {
			url: "trainee/"
		})
		.state("base.trainee.add", {
			url: "add",
			templateUrl: '../templates/add-trainee.html',
			controller: 'addTraineeCtrl'
		})
		.state("base.trainee.show", {
			url: "show",
			templateUrl: '../templates/show-trainee.html',
			controller: 'showTraineeCtrl'
		})
		.state("base.trainee.update", {
			url: "update/:ID",
			templateUrl: '../templates/update-trainee.html',
			controller: 'updateTraineeCtrl'
		})
		.state("base.measurement", {
			url: "measurement/"
		})
		.state("base.measurement.add", {
			url: "add",
			templateUrl: '../templates/add-measurement.html',
			controller: 'addMeasurementsCtrl'
		})
		.state("base.measurement.show", {
			url: "show/:ID",
			templateUrl: '../templates/show-measurements.html',
			controller: 'showMeasurementsCtrl',
			resolve: {
				measurements: function($stateParams, generalService) {
					var traineeId = $stateParams.ID;
					return generalService.getTraineeMeasurements(traineeId);
				}
			}
		})
		.state("base.user", {
			url: "user/"
		})
		.state("base.user.profile", {
			url: "profile",
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

	})
	.run(function ($rootScope, generalUtility, generalService, authManager) {

		generalUtility.init_app();

		authManager.checkAuthOnRefresh();
		authManager.redirectWhenUnauthenticated();

	});

})();
