'use strict'
jeopardyApp.service('centralService', centralService);
centralService.$inject = ['$http','$q'];
function centralService($http,$q) {
    var service = this;
    
    var settings = {};
    var teams = [];
    var categoryNames = [];
    
    service.setSettings = function(_s) {
        settings = _s;
        if(settings.team1){
            teams.push({name:settings.team1,score:0});
        }
        if(settings.team2){
            teams.push({name:settings.team2,score:0});
        }
        if(settings.games){
            categoryNames = [];
            settings.games.forEach((ele) => {
                categoryNames.push(settings['category'+ele]);
            });
        }
    };
    
    service.getTitle = function(){
        return settings.title;
    };
    
    service.getCategoryNames = function() {
        return categoryNames;
    };
    
    service.setTeams = function(_ts){
        teams = _ts;
    };
    
    service.getTeams = function() {
        return teams;
    };
    
    service.setTeamScore = function(order, score) {
        if(order < teams.length && order >= 0) {
            teams[order].score = Math.max(score,0);
        }
    };
    
    service.getTeamScore = function(order) {
        if(order < teams.length && order >= 0) {
            return teams[order].score;
        }
        return 0;
    };
    
    service.addTeamScore = function(order, score) {
        if(order < teams.length && order >= 0) {
            teams[order].score += score;
        }
    };
    
    service.deductTeamScore = function(order, score) {
        if(order < teams.length && order >= 0) {
            teams[order].score = Math.max(0,teams[order].score - score);
        }
    };
    
    service.getQuestion = function(idx) {
        return $http({
            method: 'get',
            url: 'data/category'+idx+'.json'
        });
    };
    
    service.getQuestions = function() {
        var deferred = $q.defer();
        var urlcalls = settings.games.map(ele => (service.getQuestion(ele)));
        $q.all(urlcalls).then(function(res){
           deferred.resolve(res); 
        },function(error){
            deferred.reject(error);
        });
        return deferred.promise;
    };
    
    
};