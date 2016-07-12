angular.module('hogarApp').factory('Customer', function() {
    var Customer = {};

    Customer.user;
    Customer.password;
    Customer.password2;
    Customer.type = 'customer';
    Customer.logedIn = false;

    return Customer;
})
