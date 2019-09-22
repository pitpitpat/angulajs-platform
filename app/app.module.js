$(document).ready(function() {
	$('body').tooltip({ selector: '[data-toggle=tooltip]', trigger: 'hover', boundary: 'window'});
});

$(document).on('scroll',function() {	// Scroll to top button appear
	var scrollDistance = $(this).scrollTop();
	if (scrollDistance > 100) {
		$('.scroll-to-top').fadeIn();
	} else {
		$('.scroll-to-top').fadeOut();
	}
});

angular.module('healthmastersApp', [
	'ui.router',
	'angular-jwt',
	'angular-loading-bar',
	'smart-table',
	'ngMaterial',
	'ngMessages'
])
.config(function($httpProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider, jwtOptionsProvider) {

	/* ================= Angular Material Themes ================= */
	$mdThemingProvider.theme('success');
	$mdThemingProvider.theme('danger');

	/* ================= Loading Spinner ================= */
	cfpLoadingBarProvider.includeSpinner = false;

	/* ================= JWT Authendication ================= */
	jwtOptionsProvider.config({
		tokenGetter: function(options) {
			token = localStorage.healthmastersJWT;
			if (!token) {
				window.location.href = '/#!/logout';
			}
			return token;
		},
		whiteListedDomains: ['api.thehealthmasters.gr', 'localhost'],
		unauthenticatedRedirectPath: '/logout'
	});
	$httpProvider.interceptors.push('jwtInterceptor');

})
.run(function ($rootScope, $state, generalUtility, generalService, authManager, traineeService) {

	generalUtility.initApp();

	authManager.checkAuthOnRefresh();
	authManager.redirectWhenUnauthenticated();

});
