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

			$rootScope.toggleSidebar = function() {
				$("body").toggleClass("sidebar-toggled");
				$(".sidebar").toggleClass("toggled");
			};
		};

		generalUtilityFactory.prepareDate = function(date){
			if (date) {
				return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
			}
			return null;
		};

		generalUtilityFactory.prepareTrainee = function(trainee, id){
			var preparedTrainee = {
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

			return preparedTrainee;
		};

		generalUtilityFactory.updateListItem = function(allItems, updatedItem, id){
			for (index in allItems) {
				var item = allItems[index];
				if (item.id === id) {
					item = updatedItem;
					break;
				}
			}

			return allItems;
		};

		generalUtilityFactory.prepareListDates = function(list, predicate){
			var preparedList = angular.copy(list);

			for (index in preparedList) {
				var item = preparedList[index];
				item[predicate] = new Date(item[predicate]);
			}

			return preparedList;
		};

		generalUtilityFactory.prepareMeasurementsByMonth = function(measurementsByMonth){
			var preparedMeasurements = angular.copy(measurementsByMonth);

			preparedMeasurements.january = generalUtilityFactory.prepareListDates(preparedMeasurements.january, "measurement_date");
			preparedMeasurements.february = generalUtilityFactory.prepareListDates(preparedMeasurements.february, "measurement_date");
			preparedMeasurements.march = generalUtilityFactory.prepareListDates(preparedMeasurements.march, "measurement_date");
			preparedMeasurements.april = generalUtilityFactory.prepareListDates(preparedMeasurements.april, "measurement_date");
			preparedMeasurements.may = generalUtilityFactory.prepareListDates(preparedMeasurements.may), "measurement_date";
			preparedMeasurements.june = generalUtilityFactory.prepareListDates(preparedMeasurements.june, "measurement_date");
			preparedMeasurements.july = generalUtilityFactory.prepareListDates(preparedMeasurements.july, "measurement_date");
			preparedMeasurements.august = generalUtilityFactory.prepareListDates(preparedMeasurements.august, "measurement_date");
			preparedMeasurements.september = generalUtilityFactory.prepareListDates(preparedMeasurements.september, "measurement_date");
			preparedMeasurements.october = generalUtilityFactory.prepareListDates(preparedMeasurements.october, "measurement_date");
			preparedMeasurements.november = generalUtilityFactory.prepareListDates(preparedMeasurements.november, "measurement_date");
			preparedMeasurements.december = generalUtilityFactory.prepareListDates(preparedMeasurements.december, "measurement_date");

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
