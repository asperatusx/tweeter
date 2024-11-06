/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.form-container').on('submit', function(e) {
    e.preventDefault();
    const serialData = $(this).serialize();
    console.log(serialData);
    $.ajax('/tweets', { method: 'POST', data: serialData})
      .then(function(res) {
        console.log('Its a sucess!');
        console.log(res)
      })

  })
})