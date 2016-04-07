$( document ).ready(function() {

  if (getURLParameter('embed')) {
    $('.site-header').css('display', 'none');
    $('.site-footer').css('display', 'none');
  }

  // Segment.io
  $('#app-store').click(function() {
    analytics.track("Event.Touch.Button.AppStore");
  });

  $('#google-play').click(function() {
    analytics.track("Event.Touch.Button.GooglePlay");
  });

});
