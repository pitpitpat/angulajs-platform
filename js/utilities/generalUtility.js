angular.module('healthmastersApp')
.factory('generalUtility', function($rootScope, $mdToast, $state) {

	var generalUtility = {};

	generalUtility.initApp = function(){
		$rootScope.healthmastersAPI = 'https://api.ppserver.me';

		$rootScope.sidebarMinimized = false;
		$rootScope.toggleSidebar = () => {
			$rootScope.sidebarMinimized = !$rootScope.sidebarMinimized;
		}

		$rootScope.searchTrainees = function(query) {
			$state.go('base.content.trainee.show', {query: query});
		};

		$rootScope.goToTop = function() {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: "smooth"
			});
		}
	};

	generalUtility.prepareDate = function(date){
		if (date) {
			return date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();
		}
		return null;
	};

	generalUtility.prepareTrainee = function(trainee, id){
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

	generalUtility.getTraineeById = function(trainees, traineeId){
		var trainee = trainees.find(function(trainee) {
			return trainee.id === traineeId;
		})

		return trainee;
	};

	generalUtility.updateListItem = function(allItems, updatedItem, id){
		for (index in allItems) {
			var item = allItems[index];
			if (item.id === id) {
				item = updatedItem;
				break;
			}
		}

		return allItems;
	};

	generalUtility.prepareObjectListDates = function(list, predicate){
		var preparedList = angular.copy(list);
		for (index in preparedList) {
			var item = preparedList[index];
			item[predicate] = new Date(item[predicate]);
		}
		return preparedList;
	};

	generalUtility.extendList = function(destList, srcList){
		for (index in srcList) {
			var item = srcList[index];
			destList.push(item);
		}
	};

	generalUtility.showToast = function(message, theme){
		$mdToast.show($mdToast.simple().textContent(message).toastClass("position-fixed font-weight-bold").theme(theme));
	};

	generalUtility.showErrorToast = function(response) {
		if (response.status === -1) {
			generalUtility.showToast("Σφάλμα. Η ενέργεια απέτυχε.", "danger");
		} else if (response.data.code === "role_invalid") {
			generalUtility.showToast("Δεν έχεις επαρκή δικαιώματα.", "danger");
		} else if (response.data.code === "invalid_current_password") {
			generalUtility.showToast("Λάθος παλιός κωδικός.", "danger");
		}
	}

	generalUtility.getTraineeAge = function(trainee) {
		today =  new Date();
		return today.getFullYear() - trainee.birth_date.getFullYear();
	}

	generalUtility.getTraineesByAge = function(trainees, min, max) {
		if (!min) {
			min = -9999;
		}

		if (!max) {
			max = 9999;
		}

		var traineesByAge = trainees.filter(function(trainee) {
			return generalUtility.getTraineeAge(trainee) >= min && generalUtility.getTraineeAge(trainee) <= max;
		});

		return traineesByAge;
	}

	generalUtility.getTraineesByGender = function(trainees, gender) {
		var traineesByGender = trainees.filter(function(trainee) {
			return trainee.gender === gender;
		});

		return traineesByGender;
	}

	return generalUtility;

});
