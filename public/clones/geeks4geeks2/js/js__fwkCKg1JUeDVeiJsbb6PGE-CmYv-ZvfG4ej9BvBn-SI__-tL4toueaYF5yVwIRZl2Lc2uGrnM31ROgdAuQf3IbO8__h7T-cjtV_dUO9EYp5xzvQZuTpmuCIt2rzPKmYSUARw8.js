
(function ($) {
  Drupal.behaviors.custom404errors = {
    attach: function(context, settings) {

      // Hide all 404 error pages
      $('.view-custom-404 > .view-content > div').hide();

      // Choose random error page to show from the collection of hidden divs
      var total404pages = $('.view-custom-404 > .view-content > div').length;
      var random404page = Math.floor(Math.random()*total404pages);
      // Delete other 404 pages
      $('.view-custom-404 > .view-content > div').not(':eq('+random404page+')').remove();

    // Show custom 404 error page
      $('.view-custom-404 > .view-content > div').show();
      // Add search form clone within it
      $('.view-custom-404 > .view-content > div').find('.views-field-field-404-content-above-form').after($search404);


    }
  }
})(jQuery);

;/*})'"*/
;/*})'"*/
