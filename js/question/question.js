'use strict';
jeopardyApp.controller("questionController", questionController);
questionController.$inject = ['$state'];
function questionController($state) {
    var ctrl = this;
    
    ctrl.finishQuestion = function() {
        $state.go('gameboard');
    }
};