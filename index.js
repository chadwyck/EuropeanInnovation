var index, stSound, postIndex, getSoundFile, getImageFile,
	getArtists, getAlbums, getSongs, uploadFile, doUpdate;

stSound = require('./soundStreaming');
connectionDB = require('./connectionDB');

exports.route = function (app) {
	app.get('/', index);
	app.post('/', uploadFile);
	app.get('/files/:user/:album/:filename', getSoundFile);
	app.get('/image/:user/:album/:filename', getImageFile);
	app.get('/update/:newTitle/:albumID/:trackNum', doUpdate);
	app.get('/artists', getArtists);
	app.get('/albums/:artistID', getAlbums);
	app.get('/songs/:albumID/:order/:searchby/:searchterm', getSongs);
	// app.get('/addQueue/:filename', addQueue);
	// app.post('/upload', uploadFile);
};