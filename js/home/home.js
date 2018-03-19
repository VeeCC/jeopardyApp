'use strict';
jeopardyApp.controller("homeController", homeController);
homeController.$inject = ['$state','centralService'];
function homeController($state,centralService) {
    var ctrl = this;
    
    ctrl.title = "Jeopardy";
    ctrl.atContent = false;
    ctrl.teams = [{name: ""},{name: ""}];
    
    ctrl.setTeamName = function() {
        ctrl.atContent = true;    
    };
    
    ctrl.startGame = function() {
        var teams = ctrl.teams.map(t => {
            var o = {};
            o[t.name] = 0;
            return o;
        });
        centralService.setTeams(teams);
        $state.go('gameboard');
    }
};