angular.module('contactapp').factory('sharedService', [ function () {
    var _service = {};
    _service.isAuthenticated;
    _service.getUserId;
    _service.getUsername;
    _service.contactModel;
    return _service;
}])