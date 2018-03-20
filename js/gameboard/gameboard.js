'use strict';
jeopardyApp.controller("gameboardController", gameboardController);
gameboardController.$inject = ['$state','centralService'];
function gameboardController($state,centralService) {
    var ctrl = this;
    
    ctrl.$onInit = function() {
        ctrl.categoryNames = centralService.getCategoryNames();
        ctrl.questions = centralService.getQuestions().then(function(res){
            
        },function(err){
            
        });
    }
    
    ctrl.gotoQuestion = function() {
        $state.go('question');
    }
};