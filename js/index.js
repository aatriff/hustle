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
    self.stats = [];

    var allCompetions = $('#competions').data('competions');

    // ******************************
    // Internal methods
    // ******************************

    function selectedItemChanged(item) {
      if(item){
        self.stats = [];
        self.competions=[];

        self.stats.push({caption:"ID", value:item.id});
        self.stats.push({caption:"ФИО", value:item.fio});
        self.stats.push({caption:"Клуб", value:item.club});
        self.stats.push({caption:"Текущий класс", value:item.class});

        self.stats.push({E:"E", D:"D", C:"C", B:"B", A:"A"});
        self.stats.push({E:item.e_points, D:item.d_points, C:item.c_points, B:item.b_points, A:item.a_points});

        for(i in allCompetions){
          if(allCompetions[i].id === item.id){
            c = allCompetions[i];
            count = 0;
            p = "";
            for(j in allCompetions){
              if(allCompetions[j].competion === c.competion && allCompetions[j].date === c.date && allCompetions[j].class === c.class && allCompetions[j].result === c.result && allCompetions[j].id != c.id ){
                count = count + 1;
                p = allCompetions[j].id;
              }
            }
            if (count != 1)
              p = "";
            else {
              for(d in self.states){
                if(p === self.states[d].id){
                  p = self.states[d].fio;
                  break;
                }
              }

            }
            self.competions.push({name:c.competion, date:c.date, class:c.class, result:c.result, points:c.points, partner:p});
          }
        }

        if (self.competions.length > 0) {
          self.competions.unshift({name:"Конкурс", date:"Дата проведения", class:"Класс", result:"Результат", points:"Очки", partner:"Партнер"})
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
          club: dancer.club,
          class: dancer.class,
          value: dancer.fio.toLowerCase(),
          display: dancer.fio,
          e_points: dancer.e_points,
          d_points: dancer.d_points,
          c_points: dancer.c_points,
          b_points: dancer.b_points,
          a_points: dancer.a_points,
        };
      });
    }
  }