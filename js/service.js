'use strict'
jeopardyApp.service('centralService', centralService);
centralService.$inject = ['$http'];
function centralService($http) {
    var service = this;
    var teams = {};
    
    service.setTeams = function(_ts){
        teams = _ts;
    };
    
    service.getTeams = function() {
        return teams;
    }
    
    service.setTeamScore = function(teamName, score) {
        if(teams[teamName]){
            teams[teamName].score = score;
        }
    }
    
};