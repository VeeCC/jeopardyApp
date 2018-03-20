'use strict';
jeopardyApp.controller("gameboardController", gameboardController);
gameboardController.$inject = ['$state','centralService'];
function gameboardController($state,centralService) {
    var ctrl = this;
    
    ctrl.currentQuestion = null;
    
    ctrl.$onInit = function() {
        ctrl.content = [];    
        ctrl.teamOnPlay = 0;
        
        ctrl.teams = centralService.getTeams();
        var categoryNames = centralService.getCategoryNames();
        ctrl.questions = centralService.getQuestions().then(function(res){
            for(var i=0; i<res.length; i++) {
                var q = res[i].data;
                q.forEach(data => {
                    data.answered = false;
                    data.category = categoryNames[i];
                });
                var o = {name: categoryNames[i], questions: q};
                ctrl.content.push(o);
            }
        },function(err){
            
        });
    };
    
    ctrl.showQuestion = function(q) {
        if(!q.answered) {
            q.answered = true;
            ctrl.currentQuestion = q;    
        }        
    };
    
    ctrl.finishQuestion = function(){
        ctrl.currentQuestion = null;
        ctrl.teamOnPlay = !ctrl.teamOnPaly + 0;
    }
};