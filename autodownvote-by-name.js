var stupid_names = ["Andrew Brown"];

$('.feed_item .e_col .feed_item_reasons_user > .user').map(function() {
  var name = $(this).attr('href').replace(/[\-\/0-9]/g, ' ').trim();
  var downvote_link = $(this).closest('.e_col').find('.rate_down');
  $.each(stupid_names, function(index, value) {
    if (value == name) {
      downvote_link.click();
    }
  });
});
