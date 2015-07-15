$(document).ready(function() {



});

var likesHash = {};

var base = 'https://popping-inferno-6981.firebaseio.com';

var newmail = '/'+emailplz.replace(/\./g, '+');

var myDestRef = new Firebase(base+'');
var myOwnRef = new Firebase(base+newmail);

var addNewPlace = function () {
  	var name = $('#in-name').val();
  	var place = $('#in-place').val();
  	var type = $('#in-type').val();

  	if (name != ''  && place != '' && type != '') {

	  	// createDest(name, place, type, true);

	  	$('#in-name').val('');
	  	$('#in-place').val('');
	  	$('#in-type').val('');

	  	myDestRef.push({name: name, place: place, type: type, likes: 0});
	}
}

var createDest = function (name, place, type, childkey, rec) {
	var userStuff = '';
	var ob = '.recommendation';
	if(!agent && rec) {
		userStuff = '<div class="like-hearts">';
	}
	if(!rec) {
		ob = '#myPicks';
		console.log('got here1');
	}
	$(ob).append('<div class="list-item mdl-card mdl-shadow--2dp"><div class="list-text mdl-card__supporting-text">'
		+ name + ', '
		+ place + ' ('
		+ type + ')'
		+'</div>' + userStuff
		+'</div>');
	if(!agent && rec) {
		$('.like-hearts:last').click(function() {
		  	$(this).toggleClass("liked");
		  	$(this).data('liked', !($(this).data('liked')))
		  	console.log($(this).data('liked') + ' is ' +$(this).data('fbkey'));

		  	if($(this).data('liked')) {
		  		myOwnRef.push($(this).data('fbkey'));
		  	} else {
		  		myOwnRef.child(likesHash[$(this).data('fbkey')]).remove();
		  	}
		  })
		  .data('fbkey', childkey)
		  .data('liked', false);
	}
}

myDestRef.on('child_added', function(snapshot) {
  var dest = snapshot.val();
  createDest(dest.name, dest.place, dest.type, snapshot.key(), true);
});

myOwnRef.on('child_added', function(snapshot) {
  likesHash[snapshot.val()] = snapshot.key();
  createDest(
  	myDestRef.child(snapshot.key()+'/name').toString(),
  	myDestRef.child(snapshot.key()+'/place').toString(),
  	myDestRef.child(snapshot.key()+'/type').toString(),
  	snapshot.key(), false);
});

myOwnRef.on('child_removed', function(snapshot) {
  
  
});