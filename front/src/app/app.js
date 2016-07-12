var AUTH0_CLIENT_ID = 'yFfQqFHXm1rpQnmXfFP25bgMFpMO39ec';
var AUTH0_CALLBACK_URL = 'http://172.17.0.3:8080/';
var AUTH0_DOMAIN = 'uniendomanos.auth0.com';


angular.module('hogarApp', ['auth0', 'ui.router', 'angular-jwt', 'angular-storage', 'ngMaterial', 'uiGmapgoogle-maps']);

angular.module('hogarApp').config(
        ['$httpProvider', 'authProvider', 'jwtInterceptorProvider',
            function ($httpProvider, authProvider, jwtInterceptorProvider, store) {
                authProvider.init({
                    domain: AUTH0_DOMAIN,
                    clientID: AUTH0_CLIENT_ID,
                    loginState: 'login'
                });

                authProvider.on('loginFailure',
                        ['$rootScope', '$location', 'error',
                            function ($rootScope, $location, error) {
                                $rootScope.loading = false;
                                console.log(error);
                            }]);

                authProvider.on('loginSuccess',
                        ['$location', 'profilePromise', 'idToken', 'store', '$rootScope',
                            function ($location, profilePromise, idToken, store, $rootScope) {
                                // Successfully log in
                                // Access to user profile and token
                                profilePromise.then(function (profile) {
                                    // Empty loading message
                                    $rootScope.message = '';
                                    //Store credentials
                                    store.set('profile', profile);
                                    store.set('token', idToken);
                                    // Hide loading indicator
                                    $rootScope.loading = false;
                                    // Go home
                                    $location.path('/');
                                });
                            }]);


                jwtInterceptorProvider.tokenGetter = function (store) {
                    return store.get('token');
                };

                $httpProvider.interceptors.push('jwtInterceptor');
            }]);


angular.module('hogarApp').run(
        ['$rootScope', 'auth', 'store', 'jwtHelper', '$state',
            function ($rootScope, auth, store, jwtHelper, $state) {
                $rootScope.$on('$locationChangeStart', function () {
                    if (!auth.isAuthenticated) {
                        var token = store.get('token');
                        if (token) {
                            if (!jwtHelper.isTokenExpired(token)) {
                                auth.authenticate(store.get('profile'), token);
                            } else {
                                $state.go('login');
                            }
                        }
                    }

                })
            }]);


