'use strict';
jeopardyApp.controller("ruleController", ruleController);
homeController.$inject = ['$state'];
function homeController($state,centralService) {
    var ctrl = this;    
    
    
    ctrl.finish = function() {
        $state.go('home');
    }
};