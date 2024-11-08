/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.form-error-container').hide();
  $('.form-container').on('submit', function(e) {
    e.preventDefault();
    const textArea = $(this).closest(this).find('#tweet-text').val().trim();
    if (textArea === '' || textArea === null) {
      $('.form-error-msg').text('ERROR: You have not written anything to tweet yet!');
      $('.form-error-container').slideDown();
      return;
    }
    if (textArea.length > 140) {
      $('.form-error-msg').text('ERROR: You have passed your character limit of 140 characters!');
      $('.form-error-container').slideDown();
      return;
    }
    const serialData = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: serialData })
      .then(function() {
        $('.form-error-container').slideUp();
        loadTweets();
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(res) {
        renderTweets(res);
      });
  };
  
  const createTweetElement = function({ user, content, created_at }) {
    const convertedDate = timeago.format(new Date(created_at));
    const userName = $('<div>').text(user.name).html();
    const userHandle = $('<div>').text(user.handle).html();
    const contentText = $('<div>').text(content.text).html();
    return $(`<article>
          <header class="article-header">
            <div class="header-icon-container">
              <img class="article-header-img" src=${user.avatars} alt="Face icons created by Freepik - Flaticon">
              <p class="article-header-name">${userName}</p>
            </div>
            <p class="article-header-at">${userHandle}</p>
          </header>
          <p class="article-content">${contentText}</p>
          <footer class="article-footer">
            <p class="article-footer-day">${convertedDate}</p>
            <div class="article-footer-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`);
  };

  const renderTweets = function(tweets) {
    $('.main-tweets').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.main-tweets').prepend($tweet);
    }
  };

  loadTweets();
});
