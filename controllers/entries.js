'use strict';
var Entry = require('../models/Entry');

exports.createEntry = function(req, res, next) {
  var entry = new Entry(req.body);
  entry.save(function(err) {
    if (err)
      return next(err);
    else
      res.json(req.body);
  });
};

exports.listEntries = function(req, res, next) {
  Entry.find({}, function(err, entries) {
    if (err)
      return next(err);
    else
      res.json(entries);
  });
};
