//Show login form
$('.login').click(function(){
	$('.login-form').show( 200, function() {
    });
    $( ".login" ).hide( "fast" );
})

$('.login-form').submit(function(event){
	username = $('.login-type').val();
	$('.username').text('Hello, ' + username);
	$('.username').show( 1000, function() {
    });
	if ( $('.login-type').val() == "" ) {
		event.preventDefault();
		alert('You must enter a username to continue')
	} else if ( $('.login-type').val() == " " ) {
		event.preventDefault();
		alert('You must enter a username to continue')
	} else {
		$( ".login-form" ).hide( "fast" );
    	$( ".placeholder" ).hide( "fast" );
    	$('.message-gateway').show( 1000, function() {
    	});
  	}
  	event.preventDefault();
});


$('.login-type').focusin(function(){
	$(this).attr('value', "");
});

$('.login-type').focusout(function(){
	if ($(this).attr('value') == ""){
		$(this).attr('value', " type your username")
	};
});

$('.message-type').focusin(function(){
	$(this).attr('value', "");
});

$('.message-type').focusout(function(){
	if ($(this).attr('value') == ""){
		$(this).attr('value', " type a new message and press enter")
	};
});

var showMessages = _.template($('.messages').text());

$.getJSON('http://tiny-pizza-server.herokuapp.com/collections/chat-messages').done(function(data){
	data = data.splice(0,50);
	renderMessages(data);
});


function renderMessages (array) {
	array.forEach(function(info){
	  if (info.user && info.message && info.time) {
	  	var rendered = showMessages( info ); 
	  	$('.message-area').append(rendered);
	  } 
	});
};
function Post (newMessage, username) {
	// var x = new Date();
	$.post('http://tiny-pizza-server.herokuapp.com/collections/chat-messages', {
		user: username, 
		message: newMessage, 
		// time: x.toString(), 
		time: Date.now(), 
		meta: "", 
		appID: "drewbot"})
};

//Post a new message
$('.message-form').submit(function(event){
	if ( $('.message-type').val() == "" ) {
		event.preventDefault();
		alert('You must enter a message')
	} else if ( $('.message-type').val() == " " ) {
		event.preventDefault();
		alert('You must enter a message')
	} else {
    	var message = $('.message-type').val();
		freshPost = new Post(message, username);
  	}
  	event.preventDefault();
  	//Delete the input value on submit
  	$('.message-form')[0].reset();
});
