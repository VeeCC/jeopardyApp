'use strict';
jeopardyApp.controller("gameboardController", gameboardController);
gameboardController.$inject = ['$state','centralService','$scope','$interval'];
function gameboardController($state,centralService,$scope,$interval) {
    var ctrl = this;
    
    ctrl.currentQuestion = null;
    ctrl.countDown = 0;
    var timer;
    
    ctrl.$onInit = function() {
        ctrl.content = [];    
        ctrl.teamOnPlay = 0;
        ctrl.currentTeam = ctrl.teamOnPlay;
        
        ctrl.teams = centralService.getTeams();
        ctrl.questions = centralService.getQuestions().then(function(res){
            for(var i=0; i<res.length; i++) {
                var q = res[i].data;
                q.forEach(data => {
                    if(!data.category){
                        data.answered = false;
                        data.category = q[0].category;    
                    }
                    
                });
                ctrl.content.push({questions: q});
            }
        },function(err){
            
        });
        ctrl.regularTime = centralService.getRegularTime();
        ctrl.stealingTime = centralService.getStealingTime();
        ctrl.countDown = ctrl.regularTime;
    };
    
    ctrl.showQuestion = function(idx,q) {
        if(idx > 0 && !q.answered){
            q.answered = true;
            ctrl.currentQuestion = q;
            startTimer(ctrl.regularTime);
        }
                
    };
    
    ctrl.finishQuestion = function(){
        ctrl.currentQuestion = null;
        ctrl.teamOnPlay = !ctrl.teamOnPlay + 0;
        ctrl.currentTeam = ctrl.teamOnPlay;
        ctrl.countDown = ctrl.regularTime;
    };
    
    function startTimer(n) {
        ctrl.countDown = n;
        timer = $interval(function(){
            if(ctrl.countDown === 1){ 
                ctrl.countDown = 0;
                $interval.cancel(timer);
                $scope.$broadcast("timeEndEvent");
            }else{
                ctrl.countDown -= 1;
            }
        },1000);
    };
    
    ctrl.stopTimer = function() {
        $interval.cancel(timer);
        timer = null;
    };
    
    ctrl.steal = function() {
        ctrl.currentTeam = !ctrl.teamOnPlay + 0;
        startTimer(ctrl.stealingTime);
    }
    
};