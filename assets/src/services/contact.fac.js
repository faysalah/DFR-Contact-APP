
angular.module('contactapp').factory('contactService', ['$http', '$log','sharedService', function ($http, $log) {

    $http.defaults.headers.post["Content-Type"] = "application/json";
    var _service = {};
    var base_url = 'http://127.0.0.1:8000/';
    _service.getAllContact = function (cb) {
        $http({
            method: 'GET',
            url: base_url + 'api/v1/contact'
        }).then(function (res) {
            // $log.log(res.data);
            cb(res.data)
        },
        function (res) {
            $log.log("Error Occoured..");
        });
    }

    _service.getContactById = function (id, cb) {
        $http({
            method: 'GET',
            url: base_url + 'api/v1/contact/'+id+'/'
        }).then(function (res) {
            // $log.log(res.data);
            cb(res.data)
            
        },
        function (res) {
            $log.log("Error Occoured..");
        });
    }

    _service.addContact = function (fromdata ,cb) {
        $http({
            method: 'POST',
            url: base_url + 'api/v1/contact',
            data: fromdata
        }).then(function (res) {
            cb(res.data)
        },
        function (res) {
            $log.log("Error Occoured..");          
        });
    }
    
    _service.updateContact = function (id, fromdata, cb) {
        $http({
            method:'PUT',
            url: base_url + 'api/v1/contact/'+id+'/',
            data: fromdata
        }).then(function (res) {
            // $log.log(res.data);
            cb(res.data) 
        },
        function (res) {
            $log.log("Error Occoured..");
        });
    }

    _service.deleteContact = function (id, cb) {
        $http({
            method:'DELETE',
            url: base_url + 'api/v1/contact/'+id+'/'
        }).then(function (res) {
            cb(res.data)
        },
        function (res) {
        $log.log("Error Occoured..");
        });
    }
    return _service;
}])
