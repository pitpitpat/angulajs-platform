(function() {

	angular.module('healthmastersApp')
		.controller('userProfileCtrl', function($rootScope, $scope, generalService, generalUtility) {

			$rootScope.currentPage = 'user';
			$scope.credentials = {};
			$scope.tmpUser = angular.copy($rootScope.user);

			var initCredentials = function() {
				$scope.credentials = {
					newPassword: null,
					confirmNewPassword: null,
					currentPassword: null
				};
			}

			$scope.updateUserInfo = function() {
				generalService.updateUserInfo($scope.tmpUser.email, $scope.tmpUser).then(function(response) {
					console.log(response.data);
					$rootScope.user.name = $scope.tmpUser.name;
					$rootScope.user.surname = $scope.tmpUser.surname;
					generalUtility.showToast("Τα στοιχεία σου ενημερώθηκαν.", "success");
				});
			}

			$scope.updateUserPassword = function() {
				generalService.updateUserPassword($scope.credentials.newPassword, $scope.credentials.currentPassword).then(function(response) {
					console.log(response.data);
					initCredentials();
					generalUtility.showToast("Ο κωδικός σου ενημερώθηκε.", "success");
				});
			}

			/* ================= On start ================= */

			initCredentials();

		});

})();