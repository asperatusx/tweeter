$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const counter = $(this).closest('.form-container').find('.counter');
    $(counter).val(140);
    const value = $(counter).val() - this.value.length;
    if (value < 0) {
      $(counter).val(value);
      $(counter).css('color', 'red');
    } else {
      $(counter).val(value);
      $(counter).css('color', 'black');
    }
  });
});

