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

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const createTweetElement = function ({ user, content, created_at }) {
    const convertedDate = new Date(created_at * 1000);
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

  renderTweets(data);
})
