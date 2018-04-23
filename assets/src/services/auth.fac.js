angular.module('contactapp').factory('authService', ['$http', '$log', function ($http, $log) {

    $http.defaults.headers.post["Content-Type"] = "application/json";
    var _service = {};
    
    _service.register = function (fromdata ,cb) {
        $http({
            method: 'POST',
            url: 'api/register/',
            data: fromdata
        }).then(function (res) {
            // $log.log(res.data);
            cb(res.data)
        },
        function (res) {
            $log.log("Error Occoured..");
            $log.log(res);            
        });
    }

    _service.login = function (fromdata, cb) {
        $http({
            method:'POST',
            url: 'api/login/',
            data: fromdata
        }).then(function (res) {
            cb(res.data) 
        },
        function (res) {
            $log.log(res.data.non_field_errors[0]);
            alert(res.data.non_field_errors[0]);
        });
    }
    return _service;
}])