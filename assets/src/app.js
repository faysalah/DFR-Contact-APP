angular.module('contactapp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/contact');
        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: 'static/src/controllers/authentication/register.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'static/src/controllers/authentication/login.html'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'static/src/controllers/contact/contacts.html',
                controller:'contactListController',
            })
            .state('new', {
                url: '/new',
                templateUrl: 'static/src/controllers/contact/new.html'
            })
            .state('detail', {
                url: '/detail/:id',
                templateUrl:'static/src/controllers/contact/detail.html' ,
                controller: 'contactController'
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: 'static/src/controllers/contact/edit.html',
                controller: 'contactController'
            })
    });