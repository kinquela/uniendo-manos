angular.module('hogarApp').factory('CustomerService', function(auth) {

    var login = function(Customer, onLoginSuccess, onLoginSuccess) {
        auth.signin({
            connection: 'Username-Password-Authentication',
            username: Customer.email,
            password: Customer.pass,
            authParams: {
                scope: 'openid name email'
            }
        });
    }

    /* ===== ./login/login.js ===== */
    var googleLogin = function (onLoginSuccess,onLoginFailed) {
      auth.signin({
        popup: true,
        connection: 'google-oauth2',
        scope: 'openid name email'
      }, onLoginSuccess, onLoginFailed);
    };


    var register = function(Customer) {
        auth.signup({
            connection: 'Username-Password-Authentication',
            username: Customer.email,
            password: Customer.password,
            authParams: {
                scope: 'openid name email'
            }
        });
    }

    return {
        login: login,
        googleLogin : googleLogin,
        register: register,
        customer: this.customer
    }

})
