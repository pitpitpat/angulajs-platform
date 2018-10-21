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

		generalUtilityFactory.prepareNewTrainee = function(trainee, id){
			var preparedNewTrainee = {
				id: id,
				name: trainee.name,
				surname: trainee.surname,
				fullname: trainee.name + ' ' + trainee.surname,
				fathername: trainee.fathername,
				address: trainee.address,
				adt: trainee.adt,
				occupation: trainee.occupation,
				contact_phone: trainee.contact_phone,
				emergency_phone: trainee.emergency_phone,
				height: trainee.height,
				weight: trainee.weight,
				gender: trainee.gender
			};

			return preparedNewTrainee;
		};

		return generalUtilityFactory;

	});

})();
