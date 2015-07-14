'use strict';

var addNewPlace = function() {
  var name = $('#in-name').val();
  var place = $('#in-place').val();
  var type = $('#in-type').val();

  if (name !== '' && place !== '' && type !== '') {

    // createDest(name, place, type);

    $('#in-name').val('');
    $('#in-place').val('');
    $('#in-type').val('');
    var params = {
      name: name,
      place: place,
      type: type,
      likes: 0
    };

    $.post('/api/entries', params).done(function(entry) {
      console.log('entry added');
      createDest(entry);
    });
  }
};

var createDest = function(dest) {
  var userStuff = '';
  if (!agent) {
    userStuff = '<div class="like-hearts">';
  }
  $('.list-container').append(
    '<div class="list-item mdl-card mdl-shadow--2dp"><div class="list-text mdl-card__supporting-text">' +
    dest.name + ', ' + dest.place + ' (' + dest.type + ')' + '</div>' + userStuff + '</div>');
  $('.like-hearts').click(function() {
    $(this).toggleClass('liked');

    var params = $.extend({ email: 'test@foo'}, dest);
    $.post('/api/destinations', params).done(function() {
      console.log('destination added');
    });
  });
};

$(document).ready(function(){
  $.get('/api/entries').done(function(entries) {
    entries.forEach(createDest);
  });
});
