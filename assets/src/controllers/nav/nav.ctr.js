angular.module('contactapp').component('navBar',{
    templateUrl:'static/src/controllers/nav/nav.html',
    controller: function ($scope, sharedService) {

        $scope.logOut = function(){
        if(!confirm('Are you sure, you want to logout?')) return false;
            localStorage.clear();
        };

        $scope.getUsername = sharedService.getUsername;
        $scope.isAuthenticated =sharedService.isAuthenticated;
    }
});