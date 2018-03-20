'use strict';
jeopardyApp.controller("questionController", questionController);
questionController.$inject = ['centeralService'];
function questionController(centeralService) {
    var ctrl = this;
    //ctrl.team
    //ctrl.question
    //ctrl.finishQuestion();
    ctrl.tempEndGame = false;
    var firstTry = true;
    
    ctrl.$onInit = function(){
        //45s timer start;
        
    };
    
    ctrl.answer = function(points){
        if(firstTry) {
            if(points){
                centeralService.addTeamScore(ctrl.team, points);
                showResult("");
            }else{
                stealOrPass();
            }    
        }else{
            var currentTeam = getAnotherTeam();
            if(points){
                centeralService.addTeamScore(currentTeam, points);
            }else{
                centeralService.deductTeamScore(currentTeam, points);
            }
        }
        
    };
    
    function stealOrPass() {
        ctrl.tempEndGame = true;
    };
    
    ctrl.decide = function(decision) {
        if(decision === "steal"){
            ctrl.tempEndGame = false;
            //start 15s timer;
        }else{
            endGame();
        }  
    };
    
    function showResult(result) {
            
    };
    
    function getAnotherTeam() {
        return !ctrl.team + 0;
    }
    
    function endGame(){
        ctrl.finishQuestion();
    };
};