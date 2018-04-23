angular.module('contactapp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/contact/');
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
                template: '<ui-view></ui-view>',
                controller:'contactListController',
            })
            .state('contact.contacts', {
                url: '/',
                templateUrl: 'static/src/controllers/contact/contacts.html',
                controller:'contactListController',
            })
            .state('contact.new', {
                url: '/new',
                templateUrl: 'static/src/controllers/contact/new.html'
            })
            .state('contact.new.save', {
                url: '/save',
                templateUrl: 'static/src/controllers/contact/save.html',
                controller: 'saveContactController'                
            })
            .state('contact.detail', {
                url: '/detail/:id',
                templateUrl:'static/src/controllers/contact/detail.html' ,
                controller: 'contactController'
            })
            .state('contact.edit', {
                url: '/edit/:id',
                templateUrl: 'static/src/controllers/contact/edit.html',
                controller: 'contactController'
            })
    });