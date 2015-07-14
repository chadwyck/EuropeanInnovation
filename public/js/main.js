$(document).ready(function() {



});

var myDestRef = new Firebase('https://popping-inferno-6981.firebaseio.com/');
var myLikeRef = new Firebase('https://popping-inferno-6981.firebaseio.com/likes');


var addNewPlace = function () {
  	var name = $('#in-name').val();
  	var place = $('#in-place').val();
  	var type = $('#in-type').val();

  	if (name != ''  && place != '' && type != '') {

	  	// createDest(name, place, type);

	  	$('#in-name').val('');
	  	$('#in-place').val('');
	  	$('#in-type').val('');

	  	myDataRef.push({name: name, place: place, type: type, likes: 0});
	}
}

var createDest = function (name, place, type) {
	var userStuff = '';
	if(!agent) {
		userStuff = '<div class="like-hearts">';
	}
	$('.list-container').append('<div class="list-item mdl-card mdl-shadow--2dp"><div class="list-text mdl-card__supporting-text">'
		+ name + ', '
		+ place + ' ('
		+ type + ')'
		+'</div>' + userStuff
		+'</div>');
	$('.like-hearts').click(function() {
	  	$(this).toggleClass("liked");
	  	myDataRef.push({email: emailplz, name: name, place: place, type: type});
	  });
}

myDataRef.on('child_added', function(snapshot) {
  var dest = snapshot.val();
  createDest(dest.name, dest.place, dest.type);
});