$(document).ready(function() {



});

var likesHash = {};
var likesRevHash = {};
var changed = false;

var base = 'https://popping-inferno-6981.firebaseio.com';

var destBase = base + '/dest';

var newmail = '/'+emailplz.replace(/\./g, '+');

var myDestRef = new Firebase(destBase);
var myOwnRef = new Firebase(base+newmail);

var addNewPlace = function () {
  	var name = $('#in-name').val();
  	var place = $('#in-place').val();
  	var type = $('#in-type').val();
  	var img = $('#in-img').val();

  	if (name != ''  && place != '' && type != '') {
	  	$('#in-name').val('');
	  	$('#in-place').val('');
	  	$('#in-type').val('');
	  	$('#in-img').val('');

	  	myDestRef.push({name: name, place: place, type: type, img: img, likes: 0});
	}
}

var createDest = function (name, place, type, img, likes, childkey, rec) {
	var userStuff = '';
	var ob = '.recommendation';
	var id = '';
	var hrt = '';
	if(!agent && rec) {
		userStuff = '<div class="like-hearts mdl-js-ripple-effect">';
	}
	if(!rec) {
		ob = '#my-picks';
		id = 'id="'+childkey+'" ';
		if(agent) {
			ob = '#group-likes'
			hrt = '<div class="hrt-likes">'+likes+'</div>';
		}
	}
	if(img == undefined || !checkURL(img)) {
		img = 'assets/no_img.svg';
	}

	$(ob).append('<div '+id+'class="list-item mdl-card mdl-shadow--2dp demo-card-wide"><div class="mdl-card__title"'
		+' style="background: url('+img+') center / cover"><h2 class="mdl-card__title-text">'
		+ name + '</h2></div><div class="mdl-card__supporting-text">'
		+ place + '</div><div class="mdl-card__actions mdl-card--border">'
		+'<div class="more-inf closed">' + type + '</div>'
		+'<button class="more-btn mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"'
		+' onclick="$(this).toggleClass(\'open\');'
		+'$(this).parent().children(\'.more-inf\').toggleClass(\'closed\');'
		+'if ($(this).hasClass(\'open\')) {'
		  +'$(this).children(\'.more-text\').html(\'Less Information\');'
	    +'} else {'
	      +'$(this).children(\'.more-text\').html(\'More Information\');'
	    +'}"'
		+'><img class="more-arrow" src="assets/more.svg"><div class="more-text">More Information</div></button></div><div class="mdl-card__menu">'
		+ hrt + userStuff + '</div></div>');

	if(!agent && rec) {
		$('.like-hearts:last').click(function() {
			changed = true;
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
		if(childkey in likesHash) {
			$('.like-hearts:last').addClass("liked").data('liked', true);
		}
	}
}

function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

myOwnRef.on('child_added', function(snapshot) {
    likesHash[snapshot.val()] = snapshot.key();
    likesRevHash[snapshot.key()] = snapshot.val();
    if (changed) {
    var newRef = new Firebase(destBase+'/'+snapshot.val());

	    console.log(destBase+'/'+snapshot.val());

	    newRef.once('value',
	    	function(snapshot2) {
	    		var dest = snapshot2.val();
	    		console.log(snapshot2.val());
	  			createDest(dest.name, dest.place, dest.type, dest.img, 0, snapshot2.key(), false);
	  			var newLikes = dest.likes + 1;
	  			newRef.update({ likes: newLikes });
	    	});
	}

});

myOwnRef.on('child_removed', function(snapshot) {
	console.log("thing got removed");
	console.log(likesRevHash[snapshot.key()]);
  $('#'+likesRevHash[snapshot.key()]).remove();  

  	
	  	var newRef = new Firebase(destBase+'/'+likesRevHash[snapshot.key()]);
	    newRef.once('value',
	    	function(snapshot2) {
	    		var dest = snapshot2.val();
	  			var newLikes = dest.likes - 1;
	  			newRef.update({ likes: newLikes });
	    	});
});

myDestRef.on('child_added', function(snapshot) {
  var dest = snapshot.val();
  createDest(dest.name, dest.place, dest.type, dest.img, 0, snapshot.key(), true);
  if (agent && dest.likes > 0) {
  	createDest(dest.name, dest.place, dest.type, dest.img, dest.likes, snapshot.key(), false);
  }
});

myDestRef.on('child_changed', function(childSnapshot, prevChildKey) {
  changed = true;
  var dest = childSnapshot.val();
  console.log("child has changed");
  $('#'+childSnapshot.key()).find(".hrt-likes").html(dest.likes);
});