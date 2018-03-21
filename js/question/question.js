'use strict';
jeopardyApp.controller("questionController", questionController);
questionController.$inject = ['centralService','$interval'];
function questionController(centralService, $interval) {
    var ctrl = this;
    //ctrl.team
    //ctrl.question
    //ctrl.finishQuestion();
    ctrl.tempEndGame = false;
    ctrl.resultMessage = "";
    ctrl.countDown = "";
    ctrl.notime = false;
    var firstTry = true;
    var teamNames = [];
    var timer;
    
    ctrl.$onInit = function(){
        startTimer(45);
        teamNames = centralService.getTeams().map(t => t.name);
    };
    
    ctrl.answer = function(points){
        if(timer){
            $interval.cancel(timer);
            timer = null;
        }
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
            startTimer(15);
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
        
    function startTimer(n) {
        ctrl.countDown = n;
        ctrl.notime = false;
        timer = $interval(function(){
            if(ctrl.countDown === 1) {
                ctrl.notime = true;
                ctrl.countDown = 0;
                $interval.cancel(timer);
                ctrl.answer(0);
            }else{
                ctrl.countDown -= 1;
            }
        },1000);
    }
    
    ctrl.goBack = function() {
        ctrl.tempEndGame = false;
    }
};