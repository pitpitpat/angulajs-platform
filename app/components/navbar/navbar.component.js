angular.module('healthmastersApp')
.component('navbar', {
    bindings: {
        onTogglerClick: '&',
        onSearchChange: '&',
        user: '='
    },
    templateUrl: 'app/components/navbar/navbar.html'
});