(function() {

	angular.module("loginApp", [])
	.run(function ($rootScope, $http) {

		$rootScope.login = {
			email: null,
			password: null
		};

		$rootScope.healthmastersAPI = 'http://api.ppserver.me'

		var login = function(email, password) {
			var endpoint = '/login';
			var url = $rootScope.healthmastersAPI + endpoint;

			var credentials = {
				email: email,
				password: password
			};

			return $http({
				method: "POST",
				url: url,
				headers: { 'Content-Type': 'application/json' },
				data: credentials
			});
		};

		$rootScope.login = function() {
			login($rootScope.login.email, $rootScope.login.password)
			.then(function(response) {
				localStorage.healthmastersJWT = response.data.token;
				window.location.href = "/#!/";
			})
			.catch(function(response) {
				console.log(response.data);
			});
		};

	});

})();