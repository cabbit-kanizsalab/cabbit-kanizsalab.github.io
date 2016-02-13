$(document).ready(function(){
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
           return null;
        }
        else{
           return results[1] || 0;
        }
    }

    if ($.urlParam('no-h1') == 'true') {
        $("h1").css('display', 'none');
    }

    var indexSequnces = '가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허';

    $("ol.hangul, ol.hangul-parenthesis").each(function() {
        $(this).children('li').each(function(index){
            $(this).attr('data-index', indexSequnces[index]);
        });
    });
});
