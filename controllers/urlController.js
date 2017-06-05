const URL = require('../models/urlModel');
const isURL = require('is-url');
const isReachable = require('is-reachable');

exports.list = function(req, res, next) {
    URL.find({}, {'_id':0, tiny:1, url:1} , function(err, result) {
        if (err) return next(err);
        
        return res.send(result);
    });
};

exports.add = function(req, res, next) {
    var newURL = req.params['url'] + req.params['0'];
    
    if (!isURL(newURL)) return res.send({'answer':'enter a valid url in the form: http(s)://someurl.com'});
    isReachable(newURL).then(reachable => {
        if (!reachable) return res.send({'answer':'the site at: ' + newURL + ' is not reachable'});
        
        URL.findOne({'url': newURL}, {'_id':0, url:1, tiny:1}, function(err, result) {
            if (err) return next(err);
            
            if (result) {
                return res.send(result);
            } else {
                URL.count({}, function(err, count){
                    if (err) console.error(err);
                    var tinyURL = new URL({
                        url: newURL,
                        tiny: count
                    });
                    tinyURL.save(function(err) {
                        if (err) return next(err);
                        res.send({url: tinyURL.url, tiny: tinyURL.tiny});
                    });
                });
            }
        });
    });
};

exports.getTiny = function(req, res, next) {
    var tinyURL = req.params['urlID'];
    
    URL.findOne({'tiny': tinyURL}, 'url tiny', function(err, result) {
        if (err) return next(err);
        
        if (result) {
            return res.redirect(result.url);
        } else {
            return res.send({'answer': 'no such tiny url in the database'});
        }
    });
};