angular.module('hogarApp').config(function($stateProvider) {
    $stateProvider
        .state('report_customer_map', {
            url: '/',
            templateUrl: '/views/customer.map.html',
            controller: 'ReportController',
            requiresLogin: true
        })
        .state('report_create', {
            url: '/reportar',
            templateUrl: 'views/report.create.html',
            controller: 'ReportController',
            requiresLogin: true
        })
        .state('report_success', {
            url: '/reportar/success',
            templateUrl: 'views/report.success.html',
            controller: 'ReportController',
            requiresLogin: true
        })
        .state('report_share', {
            url: '/reportar/compartir',
            templateUrl: 'views/report.share.html',
            requiresLogin: true
        })

});
