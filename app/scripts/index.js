
'use strict';

var fbUrl = 'https://chatnonymous.firebaseio.com/';
var fb = new Firebase(fbUrl);
var postMessagesHere = new Firebase(fbUrl + '/messageData/');

//push messages to firebase
$('#sendMessage').on('click', function (event) {
  if (($('#user_name').val() === "") || ($('#user_message').val() === "")) {
    alert("You need a username and message to post on this site!");
  } else {
  fb.push({ userName: $('#user_name').val(),
         messageText: $('#user_message').val(),
         instant    : moment().format('h:mm:ss a')
       });
  event.preventDefault();
  $('#user_message').val('');
  checkPostLength();
  }
});

//on page load, show first 20 messages
$('document').ready(function() {
fb.once('value', function (snap) {
  $('#message_window').empty();
  var allMessages = snap.val();
  _.forEach(allMessages, function (message) {
    addMessagesToPage(message.userName, message.messageText, message.instant);
    });
  checkPostLength();
  });
});

//realtime message loading
fb.on('child_added', function (snap) {
  var message = snap.val();
  addMessagesToPage(message.userName, message.messageText, message.instant);
});

//add individual users' messages to page
function addMessagesToPage(username, messagetext, timestamp) {
  $('<div class="posted_message"></div>')
    .text(messagetext)
    .prepend(
      $('<em></em>').text(timestamp + ':   ')
      )
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

function checkPostLength() {
  var numberOfPosts = $('.posted_message').length;
  if (numberOfPosts > 20) {
    var messageList = $('.posted_message').splice(numberOfPosts - 20);
    $('#message_window').empty();
    _.forEach(messageList, function(msg) {
    $('#message_window').append(msg);
    });
  }
}