$(document).ready(function() {

  

});

var myDataRef = new Firebase('https://popping-inferno-6981.firebaseio.com/');

var addNewPlace = function () {
  	var name = $('#in-name').val();
  	var place = $('#in-place').val();
  	var type = $('#in-type').val();

  	if (name != ''  && place != '' && type != '') {

	  	// createDest(name, place, type);

	  	$('#in-name').val('');
	  	$('#in-place').val('');
	  	$('#in-type').val('');

	  	myDataRef.push({name: name, place: place, type: type});
	}
}

var createDest = function (name, place, type) {
	$('.list-container').append('<div class="list-item mdl-card mdl-shadow--2dp"><div class="list-text mdl-card__supporting-text">'
		+ name + ', '
		+ place + ' ('
		+ type + ')'
		+'</div></div>');
}

myDataRef.on('child_added', function(snapshot) {
  var dest = snapshot.val();
  createDest(dest.name, dest.place, dest.type);
});