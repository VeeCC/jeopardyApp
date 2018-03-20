'use strict'
jeopardyApp.service('centralService', centralService);
centralService.$inject = ['$http','$q'];
function centralService($http,$q) {
    var service = this;
    var teams = {};
    var settings = {};
    
    service.setTeams = function(_ts){
        teams = _ts;
    };
    
    service.getTeams = function() {
        return teams;
    };
    
    service.setTeamScore = function(teamName, score) {
        if(teams[teamName]){
            teams[teamName].score = score;
        }
    };
    
    service.getQuestion = function(idx) {
        return $http({
            method: 'get',
            url: '/data/category'+idx+'.json'
        });
    };
    
    service.getQuestions = function() {
        var deferred = $q.defer();
        var urlcalls = settings.games.map(ele => (service.getQuestion(ele)));
        $q.all(urlcalls).then(function(res){
           deferred.resolve(); 
        },function(error){
            deferred.reject();
        });
        return deferred.promise;
    };
    
    service.setSettings = function(_s) {
        settings = _s;
    };
    
    service.getTitle = function(){
        return settings.title;
    }
    
    service.getCategoryNames = function() {
        var names = [];
        settings.games.forEach((ele) => {
            names.push(settings['category'+ele]);
        });
        return names;
    };
};