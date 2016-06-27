var app =  angular.module("HustleApp", ['ngRoute','ngAnimate','ngMaterial'])
	.config(['$routeProvider', function($routeProvide){  
		$routeProvide  
			.when('/profile/:dancerId',{templateUrl:'dancer.html', controller: 'dancerController'})  
			// .when('/view/message/:name',{ templateUrl: '/template/message.html', controller:MessageController})  
			.when('/', {templateUrl: 'main.html', controller:'indexController'})
	}]);