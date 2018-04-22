angular.module('contactapp').factory('authService', ['$http', '$log', function ($http, $log) {

    $http.defaults.headers.post["Content-Type"] = "application/json";
    var _service = {};
    
    _service.register = function (fromdata ,cb) {
        $http({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/register/',
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
            url: 'http://127.0.0.1:8000/api/login/',
            data: fromdata
        }).then(function (res) {
            // $log.log(res.data);
            cb(res.data) 
        },
        function (res) {
            $log.log("Error Occoured..");
        });
    }
    return _service;
}])