(function() {

	angular.module('healthmastersApp')
	.factory('generalUtility', function($rootScope, $mdToast) {

		var generalUtilityFactory = {};

		generalUtilityFactory.init_app = function(){
			$rootScope.healthmastersAPI = 'https://api.ppserver.me';

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
				gender: trainee.gender,
				registration_date: trainee.registration_date,
				birth_date: trainee.birth_date
			};

			return preparedTrainee;
		};

		generalUtilityFactory.getTraineeById = function(trainees, traineeId){
			var trainee = trainees.find(function(trainee) {
				return trainee.id === traineeId;
			})

			return trainee;
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

		generalUtilityFactory.prepareObjectListDates = function(list, predicate){
			var preparedList = angular.copy(list);
			for (index in preparedList) {
				var item = preparedList[index];
				item[predicate] = new Date(item[predicate]);
			}
			return preparedList;
		};

		generalUtilityFactory.extendList = function(destList, srcList){
			for (index in srcList) {
				var item = srcList[index];
				destList.push(item);
			}
		};

		generalUtilityFactory.showToast = function(message, theme){
			$mdToast.show($mdToast.simple().textContent(message).toastClass("position-fixed font-weight-bold").theme(theme));
		};

		generalUtilityFactory.showErrorToast = function(response) {
			if (response.status === -1) {
				generalUtilityFactory.showToast("Σφάλμα. Η ενέργεια απέτυχε.", "danger");
			} else if (response.data.code === "role_invalid") {
				generalUtilityFactory.showToast("Δεν έχεις επαρκή δικαιώματα.", "danger");
			} else if (response.data.code === "invalid_current_password") {
				generalUtilityFactory.showToast("Λάθος παλιός κωδικός.", "danger");
			}
		}

		generalUtilityFactory.getTraineeAge = function(trainee) {
			today =  new Date();
			return today.getFullYear() - trainee.birth_date.getFullYear();
		}

		generalUtilityFactory.getTraineesByAge = function(trainees, min, max) {
			if (!min) {
				min = -9999;
			}

			if (!max) {
				max = 9999;
			}

			var traineesByAge = trainees.filter(function(trainee) {
				return generalUtilityFactory.getTraineeAge(trainee) >= min && generalUtilityFactory.getTraineeAge(trainee) <= max;
			});

			return traineesByAge;
		}

		generalUtilityFactory.getTraineesByGender = function(trainees, gender) {
			var traineesByGender = trainees.filter(function(trainee) {
				return trainee.gender === gender;
			});

			return traineesByGender;
		}

		return generalUtilityFactory;

	});

})();
