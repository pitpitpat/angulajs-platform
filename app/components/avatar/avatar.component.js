angular.module('healthmastersApp')
.component('avatar', {
    bindings: {
        user: '=',
    },
    templateUrl: 'app/components/avatar/avatar.html'
});