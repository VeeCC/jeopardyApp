'use strict';
jeopardyApp.controller("questionController", questionController);
questionController.$inject = ['centralService','$scope'];
function questionController(centralService,$scope) {
    var ctrl = this;
    ctrl.tempEndGame = false;
    ctrl.resultMessage = "";
    ctrl.notime = false;
    var firstTry = true;
    var teamNames = [];
    
    $scope.$on("timeEndEvent",function() {
        ctrl.notime = true;
        ctrl.answer(0); 
    });
    
    ctrl.$onInit = function(){
        ctrl.notime = false;
        //startTimer(ctrl.regularTime);
        teamNames = centralService.getTeams().map(t => t.name);
    };
    
    ctrl.answer = function(points){
        if(!ctrl.notime){
            //$interval.cancel(timer);
            //timer = null;
            ctrl.stopTimer();
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
            ctrl.steal();
            //startTimer(ctrl.stealingTime);
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
    };
    
    ctrl.goBack = function() {
        ctrl.notime = false;
        ctrl.tempEndGame = false;
        firstTry = true;        
    }
};