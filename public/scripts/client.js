/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $('.form-container').on('submit', function (e) {
    e.preventDefault();
    const serialData = $(this).serialize();
    console.log(serialData);
    $.ajax('/tweets', { method: 'POST', data: serialData })
      .then(function (res) {
        console.log('Its a sucess!');
        console.log(res)
      })

  })

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(res) {
        renderTweets(res)
      })
  }
  
  const createTweetElement = function ({ user, content, created_at }) {
    const convertedDate = timeago.format(new Date(created_at)) ;
    return $(`<article>
          <header class="article-header">
            <div class="header-icon-container">
              <img class="article-header-img" src=${user.avatars} alt="Face icons created by Freepik - Flaticon">
              <p class="article-header-name">${user.name}</p>
            </div>
            <p class="article-header-at">${user.handle}</p>
          </header>
          <p class="article-content">${content.text}</p>
          <footer class="article-footer">
            <p class="article-footer-day">${convertedDate}</p>
            <div class="article-footer-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`)
  }

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.main-tweets').prepend($tweet);
    }
  }

  loadTweets();
})
