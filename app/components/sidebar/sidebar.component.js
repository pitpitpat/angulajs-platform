angular.module('healthmastersApp')
.component('sidebar', {
    bindings: {
        minimized: '<',
        currentState: '='
    },
    templateUrl: 'app/components/sidebar/sidebar.html',
    controller: function() {

        this.$onChanges = (changes) => {
            if (changes.minimized.currentValue) {
                $("body").addClass("sidebar-toggled");
                $(".sidebar").addClass("toggled");
            } else {
                $("body").removeClass("sidebar-toggled");
                $(".sidebar").removeClass("toggled");
            }
        };

    }
});