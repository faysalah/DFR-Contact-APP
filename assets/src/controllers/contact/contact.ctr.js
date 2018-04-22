angular.module('contactapp').controller('contactListController',function ($scope, contactService) {
    $scope.contacts = [];
    contactService.getAllContact(function (result) {
            $scope.contacts = result;     
    });
});

angular.module('contactapp').controller('contactController', function ($scope, $stateParams, $state, contactService, sharedService) {
    $scope.contact = {};
    
    contactService.getContactById($stateParams.id, function (result) {
        $scope.contact = result;                    
    });

    $scope.submit = function() {
        contactService.updateContact($stateParams.id, $scope.contact, function (result) {
            $scope.contact = result;
        });
        $state.transitionTo('detail', {id : $stateParams.id});
    };
    $scope.onDelete= function() {
        if(!confirm('Are you sure you want to delete this contact?')) return false;
        contactService.deleteContact($stateParams.id, function (result) {
            $scope.contact = result;                        
        });
    
        $state.transitionTo("contact");
    }
    
    $scope.isAuthenticated = sharedService.isAuthenticated;
});

angular.module('contactapp').controller('addContactController', function ($scope, $stateParams, $state, contactService, sharedService) {
    $scope.contact = {
        name:'',
        mobile:'',
        email:'',
        address:'',
        added_by:  sharedService.getUserId()
    };

    $scope.submit = function() {
        contactService.addContact($scope.contact, function (result) {
            $scope.contact = result;                            
        });
        $state.transitionTo("contact");
    };
});