angular.module('contactapp').controller('registerController', function ($scope, $state, authService) {
    $scope.registerModel = {
        username:'',
        email:'',
        password:'',
        cpassword:''
    };
    $scope.submit = function() {
        console.log($scope.registerModel);
        if($scope.registerModel.password != $scope.registerModel.cpassword ){
            alert("Password not matched");
            return false;
        }
        authService.register($scope.registerModel, function (result) {
            alert(result);
            $state.transitionTo('login');
        });
    };
});

angular.module('contactapp').controller('loginController', function ($scope, $state, authService) {
    
    $scope.loginModel = {
        username:'',
        password:''
    };
    
    $scope.submit = function() {
        authService.login($scope.loginModel, function (result) {
            localStorage.setItem('token',result.token)
        });
        $state.transitionTo('contact');
    };
});

angular.module('contactapp').run(function (sharedService) {

    function parseToken(){
        var base64Url = localStorage.getItem('token').split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64))
    }

    sharedService.getUsername = function () {
        if(localStorage.getItem('token') == null)
           return false;
        return parseToken().username;
    };

    sharedService.getUserId = function () {
        if(localStorage.getItem('token') == null)
           return false;
        return parseToken().user_id;
    };

    sharedService.isAuthenticated = function(){
        if(localStorage.getItem('token') == null){
            return false;
        }
        else {
            return true;
        }
    };
});