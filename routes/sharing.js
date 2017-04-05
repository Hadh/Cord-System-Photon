/**
 * Created by asus on 05/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('users');

/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render('sharing.twig',{users:users});
});
router.get('/:id', function(req, res, next) {
    users.findById(req.params.id, function (err, users) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(users);
        }

    });
});

router.put('/update/:id/:state', function(req, res, next) {
    users.findById(req.params.id, function (err, shared) {

        if (err) {
            res.status(500).send(err);
        } else {
            //console.log("state : ",req.params.state);
            if(req.params.state=="true")
            {
                shared.type = "shared";
                shared.save(function (err, shared) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(shared);
                });
            }
            else if(req.params.state=="false")
            {
                shared.type = "notShared";
                shared.save(function (err, shared) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(shared);
                });
            }
        }
    });
});
module.exports = router;
