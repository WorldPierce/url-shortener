// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var app = angular.module('shortUrlApp', []);

app.controller('shortAppCtrl', ($scope) => {
 
   
})

$(function() {
  console.log('hello world :o');
  
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });

  // $('form').submit(function(event) {
  //   event.preventDefault();
  //   var dream = $('input').val();
  //   $.post('/new?' + $.param({dream: dream}), function() {
  //     //$('<li></li>').text(dream).appendTo('ul#dreams');
  //     //$('input').val('');
  //     //$('input').focus();
  //   });
  // });

});
