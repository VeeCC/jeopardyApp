'use strict';
jeopardyApp.controller("gameboardController", gameboardController);
gameboardController.$inject = ['$state','centralService'];
function gameboardController($state,centralService) {
    var ctrl = this;
    ctrl.content = [];
    ctrl.teams = {};
    
    ctrl.$onInit = function() {
        
        var categoryNames = centralService.getCategoryNames();
        ctrl.teams = centralService.getTeams();
        ctrl.questions = centralService.getQuestions().then(function(res){
            for(var i=0; i<res.length; i++) {
                var q = res[i].data;
                var o = {name: categoryNames[i], questions: q};
                ctrl.content.push(o);
            }
        },function(err){
            
        });
    }
    
    ctrl.showQuestion = function(q) {
        $state.go('question');
    }
};