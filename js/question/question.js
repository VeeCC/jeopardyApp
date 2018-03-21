'use strict';
jeopardyApp.controller("questionController", questionController);
questionController.$inject = ['centralService'];
function questionController(centralService) {
    var ctrl = this;
    //ctrl.team
    //ctrl.question
    //ctrl.finishQuestion();
    ctrl.tempEndGame = false;
    ctrl.resultMessage = "";
    var firstTry = true;
    var teamNames = [];
    
    ctrl.$onInit = function(){
        //45s timer start;
        teamNames = centralService.getTeams().map(t => t.name);
    };
    
    ctrl.answer = function(points){
        if(firstTry) {
            if(points){
                centralService.addTeamScore(ctrl.team, points);
                showResult(teamNames[ctrl.team] + " won " + points + " points!");
            }else{
                stealOrPass();
            }    
        }else{
            var currentTeam = getAnotherTeam();
            if(points){
                centralService.addTeamScore(currentTeam, points);
                showResult(teamNames[currentTeam]+ " won " + points + " points!");
            }else{
                centralService.deductTeamScore(currentTeam, ctrl.question.points);
                showResult(teamNames[currentTeam]+ " lost " + ctrl.question.points + " points!");
            }
        }
        
    };
    
    function stealOrPass() {
        ctrl.tempEndGame = true;
    };
    
    ctrl.decide = function(decision) {
        if(decision === "steal"){
            ctrl.tempEndGame = false;
            firstTry = false;
            //start 15s timer;
        }else{
            ctrl.finishQuestion();
        }  
    };
    
    function showResult(result) {
        ctrl.resultMessage = result;    
    };
    
    function getAnotherTeam() {
        return !ctrl.team + 0;
    };
        
    ctrl.goBack = function() {
        ctrl.tempEndGame = false;
    }
};