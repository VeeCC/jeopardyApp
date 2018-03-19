'use strict';
jeopardyApp.controller("gameboardController", gameboardController);
gameboardController.$inject = ['$state'];
function gameboardController($state) {
    var ctrl = this;
    
    ctrl.gotoQuestion = function() {
        $state.go('question');
    }
};