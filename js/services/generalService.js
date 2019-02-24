(function() {

	angular.module('healthmastersApp')
	.factory('generalService', function($rootScope, $http, generalUtility) {

		var generalServiceFactory = {};

		generalServiceFactory.getAllTrainees = function() {
			var endpoint = '/trainee/all/get';
			var url = $rootScope.healthmastersAPI + endpoint;

			return $http({
				method: "GET",
				url: url
			});
		};

		generalServiceFactory.getTraineeMeasurements = function(traineeId) {
			var endpoint = '/measurement/get';
			var url = $rootScope.healthmastersAPI + endpoint;

			var data = {
				trainee_id: traineeId
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: data
			});
		};

		generalServiceFactory.login = function(email, password) {
			var endpoint = '/login';
			var url = $rootScope.healthmastersAPI + endpoint;

			var credentials = {
				email: email,
				password: password
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: credentials
			});
		};

		generalServiceFactory.insertNewTrainee = function(newTrainee) {
			var endpoint = '/trainee/insert';
			var url = $rootScope.healthmastersAPI + endpoint;

			var preparedNewTrainee = {
				name              : newTrainee.name,
				surname           : newTrainee.surname,
				fathername        : newTrainee.fathername,
				address           : newTrainee.address,
				birth_date        : generalUtility.prepareDate(newTrainee.birth_date),
				adt               : newTrainee.adt,
				occupation        : newTrainee.occupation,
				contact_phone     : newTrainee.contact_phone,
				emergency_phone   : newTrainee.emergency_phone,
				registration_date : generalUtility.prepareDate(newTrainee.registration_date),
				height            : newTrainee.height,
				weight            : newTrainee.weight,
				gender            : newTrainee.gender
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: preparedNewTrainee
			})
			.catch(function(response) {
				generalUtility.showErrorToast(response);
				throw response;
			});
		};

		generalServiceFactory.updateTrainee = function(trainee) {
			var endpoint = '/trainee/update';
			var url = $rootScope.healthmastersAPI + endpoint;

			var preparedTrainee = {
				id                : trainee.id,
				name              : trainee.name,
				surname           : trainee.surname,
				fathername        : trainee.fathername,
				address           : trainee.address,
				birth_date        : generalUtility.prepareDate(trainee.birth_date),
				adt               : trainee.adt,
				occupation        : trainee.occupation,
				contact_phone     : trainee.contact_phone,
				emergency_phone   : trainee.emergency_phone,
				registration_date : generalUtility.prepareDate(trainee.registration_date),
				height            : trainee.height,
				weight            : trainee.weight,
				gender            : trainee.gender
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: preparedTrainee
			})
			.catch(function(response) {
				generalUtility.showErrorToast(response);
				throw response;
			});
		};

		generalServiceFactory.deleteTrainee = function(traineeId) {
			var endpoint = '/trainee/delete';
			var url = $rootScope.healthmastersAPI + endpoint;

			var data = {
				trainee_id: traineeId
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: data
			})
			.catch(function(response) {
				generalUtility.showErrorToast(response);
				throw response;
			});
		};

		generalServiceFactory.insertNewMeasurement = function(newMeasurement) {
			var endpoint = '/measurement/insert';
			var url = $rootScope.healthmastersAPI + endpoint;

			var preparedNewMeasurement = {
				trainee_id       : newMeasurement.trainee_id,
				measurement_date : generalUtility.prepareDate(newMeasurement.measurement_date),
				weight           : newMeasurement.weight,
				fat              : newMeasurement.fat,
				muscle           : newMeasurement.muscle,
				bmi              : newMeasurement.bmi,
				rm               : newMeasurement.rm,
				visceral         : newMeasurement.visceral
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: preparedNewMeasurement
			})
			.catch(function(response) {
				generalUtility.showErrorToast(response);
				throw response;
			});
		};

		generalServiceFactory.deleteMeasurement = function(trainee_id, measurement_id, measurement_date) {
			var endpoint = '/measurement/delete';
			var url = $rootScope.healthmastersAPI + endpoint;

			var data = {
				measurement_id: measurement_id
			};

			console.log(data);

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: data
			})
			.catch(function(response) {
				generalUtility.showErrorToast(response);
				throw response;
			});
		};

		generalServiceFactory.getUserInfo = function() {
			var endpoint = '/user/info/get';
			var url = $rootScope.healthmastersAPI + endpoint;

			return $http({
				method: "GET",
				url: url
			})
		};

		generalServiceFactory.updateUserInfo = function(userId, newInfo) {
			var endpoint = '/user/info/update';
			var url = $rootScope.healthmastersAPI + endpoint;

			var data = {
				user_id: userId,
				new_info: newInfo
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: data
			})
			.catch(function(response) {
				generalUtility.showErrorToast(response);
				throw response;
			});
		};

		generalServiceFactory.updateUserPassword = function(newPassword, currentPassword) {
			var endpoint = '/user/password/update';
			var url = $rootScope.healthmastersAPI + endpoint;

			var data = {
				new_password: newPassword,
				current_password: currentPassword
			};

			return $http({
				method: "POST",
				url: url,
				headers: {'Content-Type': 'application/json'},
				data: data
			})
			.catch(function(response) {
				generalUtility.showErrorToast(response);
				throw response;
			});
		};

		return generalServiceFactory;

	});

})();
