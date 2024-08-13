$(document).ready(function() {
// get all like buttons
$('.top-text').on('click', function() {
    // get the product ID from the button
    var productId = $(this).data('product-id');
  
    // get the corresponding like counter element
    var likeCounter = $(this).parent().next().find('.update_likes');
  
    // update the like counter
    var currentLikes = parseInt(likeCounter.text());
    likeCounter.text(currentLikes + 1);
  });
});