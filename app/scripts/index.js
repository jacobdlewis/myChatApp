
'use strict';

var fbUrl = 'ttps://survivalchat.firebaseio.com/';
var fb = new Firebase(fbUrl);
var postMessagesHere = new Firebase(fbUrl + '/messageData/');

//push messages to firebase
$('#sendMessage').on('click', function (event) {
  fb.push({ userName: $('#user_name').val(),
         messageText: $('#user_message').val()});
  event.preventDefault();
  $('#user_message').val('');
});

//on page load, show messages
$('document').ready(function() {
fb.once('value', function (snap) {
  $('#message_window').empty();
  var allMessages = snap.val();
  _.forEach(allMessages, function (message) {
    addMessagesToPage(message.userName, message.messageText);
    });
  });
});

//realtime message loading
fb.on('child_added', function (snap) {
  var message = snap.val();
  addMessagesToPage(message.userName, message.messageText);
});

//add individual users' messages to page
function addMessagesToPage(username, messagetext) {
  $('<div class="posted_message"></div>')
    .text(messagetext)
    .prepend(
      $('<strong></strong>').text(username + ':   ')
      )
    .appendTo($('#message_window'));
}

$('#user_message').on('click', function(event) {
  event.preventDefault();
  clearMessage();
});

//clear typed message
function clearMessage () {
  $('#user_message').empty();
}