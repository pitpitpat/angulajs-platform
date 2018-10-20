(function() {

	angular.module('healthmastersApp')
	.factory('generalUtility', function($rootScope) {

		var generalUtilityFactory = {};

		generalUtilityFactory.init_app = function(){
			$rootScope.healthmastersAPI = 'http://api.ppserver.me';

			$rootScope.goToTop = function() {
				window.scrollTo({
				    top: 0,
				    left: 0,
				    behavior: "smooth"
				});
			}
		};

		generalUtilityFactory.prepareDate = function(date){
			if (date) {
				return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
			}
			return null;
		};

		return generalUtilityFactory;

	});

})();
