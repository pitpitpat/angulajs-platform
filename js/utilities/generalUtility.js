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

		generalUtilityFactory.prepareMeasurementsList = function(measurementsList){
			var preparedMeasurementsList = angular.copy(measurementsList);

			for (index in preparedMeasurementsList) {
				var measurement = preparedMeasurementsList[index];
				measurement.measurement_date = new Date(measurement.measurement_date);
			}

			return preparedMeasurementsList;
		};

		generalUtilityFactory.prepareMeasurementsByMonth = function(measurementsByMonth){
			var preparedMeasurements = angular.copy(measurementsByMonth);

			preparedMeasurements.january = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.january);
			preparedMeasurements.february = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.february);
			preparedMeasurements.march = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.march);
			preparedMeasurements.april = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.april);
			preparedMeasurements.may = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.may);
			preparedMeasurements.june = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.june);
			preparedMeasurements.july = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.july);
			preparedMeasurements.august = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.august);
			preparedMeasurements.september = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.september);
			preparedMeasurements.october = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.october);
			preparedMeasurements.november = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.november);
			preparedMeasurements.december = generalUtilityFactory.prepareMeasurementsList(preparedMeasurements.december);

			return preparedMeasurements;
		};

		generalUtilityFactory.fillList = function(destList, srcList){
			for (index in srcList) {
				var item = srcList[index];
				destList.push(item);
			}
		};

		generalUtilityFactory.mergeMeasurements = function(measurementsByMonth){
			var allMeasurements = [];

			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.january);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.february);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.march);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.april);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.may);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.june);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.july);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.august);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.september);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.october);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.november);
			generalUtilityFactory.fillList(allMeasurements, measurementsByMonth.december);

			var mergedMeasurements = {
				id: measurementsByMonth.id,
				trainee_id: measurementsByMonth.trainee_id,
				allMeasurements: allMeasurements
			};

			return mergedMeasurements;
		};

		return generalUtilityFactory;

	});

})();
