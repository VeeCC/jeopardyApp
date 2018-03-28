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
    };
    
    ctrl.showQuestion = function(idx,q) {
        if(idx > 0 && !q.answered){
            q.answered = true;
            ctrl.currentQuestion = q;   
        }
                
    };
    
    ctrl.finishQuestion = function(){
        ctrl.currentQuestion = null;
        ctrl.teamOnPlay = !ctrl.teamOnPlay + 0;
    }
};