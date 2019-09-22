angular.module('healthmastersApp')
.component('searchBar', {
    bindings: {
        onQueryChange: '&',
    },
    templateUrl: 'app/components/search-bar/search-bar.html',
    controller: function($stateParams) {

        this.query = null;
        if ($stateParams.query) {
            this.query = $stateParams.query;
        }

    }
});