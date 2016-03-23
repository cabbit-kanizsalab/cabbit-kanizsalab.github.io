$( document ).ready(function() {

    // Segment.io

    $('#app-store').click(function() {
        analytics.track("Event.Touch.Button.AppStore");
    });

});
