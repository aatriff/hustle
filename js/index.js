angular
      .module('MyApp')
      .controller('DemoCtrl', DemoCtrl);

  function DemoCtrl ($scope) {
    var self = this;

    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;
    self.selectedItemChanged = selectedItemChanged;
    self.competions = [];

    var allCompetions = $('#competions').data('competions');

    // ******************************
    // Internal methods
    // ******************************

    function selectedItemChanged(item) {
      if(item){
        self.competions=[];
        for(i in allCompetions){
          if(allCompetions[i].id === item.id){
            c = allCompetions[i];
            self.competions.push({name:c.competion, date:c.date, class:c.class, result:c.result, points:c.points});
          }
        }
      }
    }

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : [];
      if (results.length < 10) {
        return results;
      } else {
        return []
      }

    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) != -1);
      };

    }

        /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allDancers = $('#dancers').data('dancers');

      return allDancers.map( function (dancer) {
        return {
          id: dancer.id,
          fio: dancer.fio,
          class: dancer.class,
          value: dancer.fio.toLowerCase(),
          display: dancer.fio
        };
      });
    }
  }