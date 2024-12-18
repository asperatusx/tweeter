/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.form-error-container').hide();

  //create write a tweet click event
  $('.right-header').on('click', function() {
    $('.form-container').slideToggle();
    $('#tweet-text').focus();
  })

  //POST tweet to server and display error messages
  $('.form-container').on('submit', function(e) {
    e.preventDefault();
    const textArea = $(this).closest(this).find('#tweet-text').val().trim();
    const errorIsTrue = displayError(textArea);
    if (errorIsTrue) {
      return
    }

    //If there are no errors POST tweet and clear textarea
    const serialData = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: serialData })
      .then(function() {
        const counter = $('#tweet-text').closest('.form-container').find('.counter');
        $('.form-error-container').slideUp();
        loadTweets();
        $('#tweet-text').val('');
        $(counter).val(140);
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  //function will return true if any tweet limit is met
  const displayError = function(textArea) {
    if (!textArea) {
      $('.form-error-msg').text('ERROR: You have not written anything to tweet yet!');
      $('.form-error-container').slideDown();
      return true
    }
    if (textArea.length > 140) {
      $('.form-error-msg').text('ERROR: You have passed your character limit of 140 characters!');
      $('.form-error-container').slideDown();
      return true
    }
  }
  
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

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(res) {
        renderTweets(res);
      });
  };

  
  loadTweets();

});
