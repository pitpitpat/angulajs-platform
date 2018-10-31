(function() {

	angular.module('healthmastersApp')
	.directive('stRatio', function() {
		return {
			link: function(scope, element, attr) {
				var ratio = +(attr.stRatio);
				element.css('width', ratio + '%');
			}
		};
	});

})();