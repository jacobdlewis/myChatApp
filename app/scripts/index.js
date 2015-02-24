'use strict';

var fbUrl = 'ttps://survivalchat.firebaseio.com/';
var fb = new Firebase(fbUrl);
var postMessagesHere = new Firebase(fbUrl + '/messageData/');

$('#sendMessage').on('click', function (event) {
  var messageToPost = $('#user_message').val();
  var userName = $('#user_name').val();
  var messageObject = { username: userName,
                        message: messageToPost};
  fb.push(messageObject);
  event.preventDefault();
});

$('document').ready(function() {
  postMessagesHere.once('value', function(data) {
   debugger;
   var messageInfo  = data.val();
   addMessagesToPage(messageInfo);
  });
});


function addMessagesToPage(data) {
  $('#message_window').append('<div>' + data.message.username +
                        ': ' + data.message.message + '</div>');
}