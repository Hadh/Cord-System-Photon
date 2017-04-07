/**
 * Created by asus on 05/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('users');
var commutes = mongoose.model('commutes');
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
router.put('/update/newCustomer/:id/:customer', function(req, res, next) {

    var id = req.params.id;
    var id_customer = req.params.customer;
    users.findById(id, function (err, user) {

        if (err) {
            res.status(500).send(err);
        } else {
            //console.log("state : ",req.params.state);
            if(user.type=="shared")
            {
                commutes.findById(user.commute_id,function (req,commute) {
                    console.log(user.commute_id);
                    console.log(user._id);
                    console.log(id_customer);
                    console.log(commute);
                    commute.user_id.push(id_customer);
                    commute.type = "notShared";
                    commute.save(function (err, commute) {
                        if (err) {
                            res.status(500).send(err)
                        }
                        res.send(commute);
                    });
                })

            }
        }
    });


});
module.exports = router;
