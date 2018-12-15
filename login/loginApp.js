(function() {

	angular.module("loginApp", [])
	.run(function ($rootScope, $http) {

		$rootScope.status = null;
		$rootScope.credentials = {
			email: null,
			password: null
		};
		$rootScope.healthmastersAPI = 'https://api.ppserver.me';

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
			login($rootScope.credentials.email, $rootScope.credentials.password)
			.then(function(response) {
				localStorage.healthmastersJWT = response.data.token;
				window.location.href = "/";
			})
			.catch(function(response) {
				console.log(response.data);
				if (response.data.code === "login_email_invalid") {
					$rootScope.status = "email_invalid";
				} else if (response.data.code === "login_password_invalid") {
					$rootScope.status = "password_invalid";
				}
			});
		};

		/* ================= On start ================= */

		if (localStorage.healthmastersJWT) {
			window.location.href = "/";
		}

	});

})();