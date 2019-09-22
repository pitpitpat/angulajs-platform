angular.module('healthmastersApp')
.component('sidebarToggler', {
    bindings: {
        onClick: '&',
    },
    templateUrl: 'app/components/sidebar-toggler/sidebar-toggler.html'
});