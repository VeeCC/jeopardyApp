'use strict'
var jeopardyApp = angular.module('jeopardyApp',['ui.router']);


jeopardyApp.config(routesConfig);
routesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function routesConfig($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/home');
    
    var states = [
        {name: 'home', component: 'home', url: '/home'},
        {name: 'gameboard', component: 'gameboard', url: '/gameboard'},
        {name: 'question', component: 'question', url: '/question'}
    ];
    states.forEach(s => { $stateProvider.state(s);});
};

jeopardyApp.component('home', {
    templateUrl: 'js/home/home.html',
    controller: 'homeController'
});
jeopardyApp.component('gameboard', {
    templateUrl: 'js/gameboard/gameboard.html',
    controller: 'gameboardController'
});
jeopardyApp.component('question', {
    templateUrl: 'js/question/question.html',
    controller: 'questionController'
});

jeopardyApp.run(function(centralService,$http){
    $http.get('/data/settings.json').then(function(res){
        centralService.setSettings(res.data); 
    },function(err){
        
    });
});

