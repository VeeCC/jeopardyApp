'use strict';
jeopardyApp.controller("homeController", homeController);
homeController.$inject = ['$state'];
function homeController($state) {
    var ctrl = this;
    
    ctrl.setTeamNames = function() {
        
    };
    
    ctrl.startGame = function() {
        $state.go('gameboard');
    }
};