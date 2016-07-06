app.controller('dancerController', ['$scope', '$routeParams', function($scope, $routeParams) { 
  //Declare scope's data here
  $scope.dancer = findDancerById($routeParams.dancerId);

  $scope.results = [];

  var classes = ['E','D','C','B','A'];
  var ares = [];
  for(var i in classes) {
    res = loadResults($routeParams.dancerId, classes[i]);
    if (res.length!=0){
      ares.push({class:classes[i], results:res});
    }
  }
  $scope.results.push({type:"Выступления в классике", results:ares});

  classes = ['Bg','RS','M','S','Ch'];
  ares = [];
  for(var i in classes) {
    res = loadResultsJnJ($routeParams.dancerId, classes[i]);
    if (res.length!=0){
      ares.push({class:classes[i], results:res});
    }
  }
  $scope.results.push({type:"Выступления в JnJ", results:ares});

  function findDancerById(dancerId) {
    var allDancers = $('#dancers').data('dancers');
    for(var i in allDancers){
      if (dancerId === allDancers[i].id) {
        return {
          id: allDancers[i].id,
          fio: allDancers[i].fio,
          club: allDancers[i].club,
          class: allDancers[i].class,
          class_dnd: allDancers[i].class_dnd,
          e_points: allDancers[i].e_points,
          d_points: allDancers[i].d_points,
          c_points: allDancers[i].c_points,
          b_points: allDancers[i].b_points,
          a_points: allDancers[i].a_points,
          bg_points: allDancers[i].bg_points,
          rs_points: allDancers[i].rs_points,
          m_points: allDancers[i].m_points,
          s_points: allDancers[i].s_points,
          ch_points: allDancers[i].ch_points,
        }
      }
    }
  };

  function loadResults(dancerId, cl) {
    var allResults = $('#participating').data('participating');
    var allCompetions = $('#competions').data('competions'); 
    var results =[];
    for(var i in allResults) {
      if(dancerId === allResults[i].dancer_id && cl === allResults[i].class){
        for(var j in allCompetions) {
          if(allResults[i].competion_id === allCompetions[j].id && 'pair' === allCompetions[j].type){
            var partner = "";
            if (allResults[i].partner!=0){
              partner = findDancerById(allResults[i].partner).fio;
            }
            results.push({competion_name: allCompetions[j].name, competion_date: allCompetions[j].date, class: allResults[i].class, points: allResults[i].points, place: allResults[i].result, partner: partner});
          }
        }
      }
    }
    return results;
  };

  function loadResultsJnJ(dancerId, cl) {
    var allResults = $('#participatingjnj').data('participatingjnj');
    var allCompetions = $('#competions').data('competions'); 
    var results =[];
    for(var i in allResults) {
      if(dancerId === allResults[i].dancer_id && cl === allResults[i].class){
        for(var j in allCompetions) {
          if(allResults[i].competion_id === allCompetions[j].id && 'jnj' === allCompetions[j].type){
            results.push({competion_name: allCompetions[j].name, competion_date: allCompetions[j].date, class: allResults[i].class, points: allResults[i].points, place: allResults[i].result});
          }
        }
      }
    }
    return results;
  };

}]);