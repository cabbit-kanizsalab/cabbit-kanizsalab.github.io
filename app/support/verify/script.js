/**
 * Created by jesangyoon on 4/19/16.
 */

(function () {

    var app = angular.module("emailVerifyApp", []);

    var EmailVerifyController = function ($scope, $http) {
        var model = this;

        model.submitting = {
            title: '확인',
            visible: false
        };

        model.alert = {
            visible: false,
            type: null,
            title: null,
            body: null
        };

        // Parameters
        model.host = getURLParameter('host');
        model.accessToken = getURLParameter('access_token');
        model.authToken = getURLParameter('auth_token');

        if (!model.host || !model.accessToken || !model.authToken) {
            model.alert.visible = true;
            model.alert.type = 'alert-danger';
            model.alert.title = '에러';
            model.alert.body = '파라메터가 잘못되어 기능이 동작하지 않습니다';
            return;
        }
        model.finish = function () {
            window.location = 'cabbit://';
            setTimeout(function () {
                window.close();
            }, 3000);
        };
        model.verify = function () {
            model.alert.visible = true;
            model.alert.type = 'alert-info';
            model.alert.body = '인증이 진행중입니다. 잠시만 기다려 주세요...';
            $http({
                method: 'PUT',
                url: model.host + '/User',
                headers: {
                    'Authorization': 'Bearer ' + model.accessToken,
                    'Content-Type': "application/json; charset=utf8"
                },
                data: {
                    authToken: model.authToken
                }
            }).then(function success() {
                model.alert.visible = true;
                model.alert.type = 'alert-success';
                model.alert.title = '인증 완료';
                model.alert.body = '감사합니다. 이제 앱을 사용하실수 있습니다! 확인을 클릭해 앱으로 돌아가 주세요';
            }, function error(response) {
                if (401 === response.status) {
                    model.alert.visible = true;
                    model.alert.type = 'alert-warning';
                    model.alert.title = '죄송합니다';
                    model.alert.body = '인증요청 유효기간이 지난것 같습니다. 앱에서 인증 이메일을 다시 요청해 주세요!';
                } else {
                    model.alert.visible = false;
                    model.alert.type = 'alert-danger';
                    model.alert.title = '죄송합니다';
                    model.alert.body = '서버 문제로 인해 인증에 실패하였습니다. 캐빗팀에 연락해 주세요 ㅜㅜ';
                    console.log('Failed', response);
                }
            })
                .then(function () {
                    model.submitting.visible = true;
                    model.submitting.title = '확인';
                });
        };
        model.verify();
    };

    app.controller("EmailVerifyController", EmailVerifyController);
}());