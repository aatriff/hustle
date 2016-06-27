app.controller('dancerController', ['$scope', '$routeParams', function($scope, $routeParams) { 
  //Declare scope's data here
  $scope.dancer = findDancerById($routeParams.dancerId);
  $scope.results = loadResults($routeParams.dancerId);
  $scope.results_jnj = loadResultsJnJ($routeParams.dancerId);

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

  function loadResults(dancerId) {
    var allResults = $('#participating').data('participating');
    var allCompetions = $('#competions').data('competions'); 
    var results =[];
    for(var i in allResults) {
      if(dancerId === allResults[i].dancer_id){
        for(var j in allCompetions) {
          if(allResults[i].competion_id === allCompetions[j].id && 'pair' === allCompetions[j].type){
            results.push({competion_name: allCompetions[j].name, competion_date: allCompetions[j].date, class: allResults[i].class, points: allResults[i].points, place: allResults[i].result});
          }
        }
      }
    }
    return results;
  };

  function loadResultsJnJ(dancerId) {
    var allResults = $('#participatingjnj').data('participatingjnj');
    var allCompetions = $('#competions').data('competions'); 
    var results =[];
    for(var i in allResults) {
      if(dancerId === allResults[i].dancer_id){
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