app.controller('indexController', ['$scope', function($scope) { 
  //Declare scope's data here
  $scope.dancers = loadAllDancers();
  // $scope.competions = loadAllCompetions();

  function loadAllDancers() {
    var allDancers = $('#dancers').data('dancers');

    return allDancers.map( function (dancer) {
      return {
        id: dancer.id,
        club: dancer.club,
        class: dancer.class,
        class_dnd: dancer.class_dnd,
        value: dancer.fio.toLowerCase(),
        display: dancer.fio,
      };
    });
  }

  function loadAllCompetions() {
    var allCompetions = $('#competions').data('competions');

    return allCompetions.map( function (cm) {
      return {
        id: cm.id,
        value: cm.name.toLowerCase(),
        display: cm.name,
        date: cm.date,
      };
    });
  }

}]);