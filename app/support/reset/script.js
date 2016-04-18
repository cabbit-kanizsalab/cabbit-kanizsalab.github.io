/**
 * Created by jesangyoon on 4/18/16.
 */

(function () {

    var app = angular.module("passwordResetApp", ["ngMessages"]);

    var PasswordResetFormController = function ($scope, $http) {
        var model = this;

        model.submitting = {
            title: '등록',
            enabled: true,
            isReturnToApp: false
        };

        model.alert = {
            visible: false,
            type: null,
            title: null,
            body: null
        };

        model.user = {
            password: null,
            confirmPassword: null
        };

        // Parameters
        model.host = getURLParameter('host');
        model.accessToken = getURLParameter('access_token');

        if (!model.host || !model.accessToken) {
            model.alert.type = 'alert-danger';
            model.alert.title = '에러';
            model.alert.body = '파라메터가 잘못되어 기능이 동작하지 않습니다';
            return;
        }
        model.submit = function (isValid) {
            if (model.isReturnToApp) {
                window.location = 'cabbit://';
                setTimeout(function () {
                    window.close();
                }, 3000);
            } else if (isValid) {
                model.submitting.title = "등록중..";
                model.submitting.enabled = "등록중..";
                $http({
                    method: 'PUT',
                    url: model.host + '/User',
                    headers: {
                        'Authorization': 'Bearer ' + $scope.accessToken,
                        'Content-Type': "application/json; charset=utf8"
                    },
                    data: {
                        password: $scope.newPassword
                    }
                }).then(function success(response) {
                    model.isReturnToApp = true;
                    model.alert.visible = true;
                    model.alert.type = 'alert-success';
                    model.alert.title = '변경완료';
                    model.alert.body = '비밀번호 변경을 완료했습니다: 이메일 ' + response.data.email + ' 로 앱에서 다시 로그인해 주세요.';
                }, function error(response) {
                    model.isReturnToApp = true;
                    if (401 === response.status) {
                        model.alert.visible = true;
                        model.alert.type = 'alert-warning';
                        model.alert.title = '죄송합니다';
                        model.alert.body = '비밀번호 변경 유효기간이 지난것 같습니다. 다시 비밀번호 찾기 이메일을 요청해 주세요!';
                    } else {
                        model.alert.visible = false;
                        model.alert.type = 'alert-danger';
                        model.alert.title = '죄송합니다';
                        model.alert.body = '서버 문제로 인해 인증에 실패하였습니다. 캐빗팀에 연락해 주세요 ㅜㅜ';
                        console.log('Failed', response);
                    }
                })
                    .then(function () {
                        model.submitting.isReturnToApp = true;
                        model.submitting.title = '확인';
                    });
            } else {
                model.submitting.title = "아직 입력할것이 남아있지 않나요?";
            }
        };
    };

    var compareTo = function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    };

    var isPassword = function () {
        return {
            require: "ngModel",
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.isPassword = function (modelValue) {
                    return /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/g.test(modelValue);
                };
            }
        };
    };

    app.directive("compareTo", compareTo);
    app.directive("isPassword", isPassword);
    app.controller("PasswordResetFormController", PasswordResetFormController);
}());