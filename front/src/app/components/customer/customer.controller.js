angular.module('hogarApp').controller('CustomerController',
        function CustomerControllerFunction($rootScope, $scope, auth, store, $state) {
            $scope.auth = auth;

            $scope.user = '';
            $scope.pass = '';

            $scope.login = function () {
                // Show loading indicator
                $scope.message = 'loading...';
                $rootScope.loading = true;
                console.log($scope.user + $scope.pass)
                auth.signin({
                    connection: 'Username-Password-Authentication',
                    username: $scope.user,
                    password: $scope.pass,
                    authParams: {
                        scope: 'openid name email'
                    }
                });
            }

            $scope.register = function () {
                $scope.message = 'loading...';
                $rootScope.loading = true;
                auth.signup({
                    connection: 'Username-Password-Authentication',
                    email: $scope.email,
                    password: $scope.pass,
                    user_metadata: {
                        age: 1
                    },
                    authParams: {
                        scope: 'openid name email'
                    }
                });
            }

            $scope.googleLogin = function () {
                $scope.message = 'loading...';
                $rootScope.loading = true;
                auth.signin({
                    connection: 'google-oauth2',
                    scope: 'openid name email'
                });
            };
        }
);