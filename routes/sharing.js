/**
 * Created by asus on 05/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('users');
var commutes = mongoose.model('commutes');
var schedules = mongoose.model('Schedule');
var moment = require('moment');
/* GET users listing. */
router.get('/', function (req, res, next) {

    users.find(function (err, users) {
        res.json(users);
    });
});

router.get('/available', function (req, res, next) {
    var now = moment().format();
    var hour = moment().add(1, 'month').format();
    //console.log(now);
    //console.log(hour);


    schedules.find({"date": {"$gte": now, "$lte": hour}}, function (err, scheduleDate) {
        res.json(scheduleDate);
    });


});
router.get('/:id', function (req, res, next) {
    users.findById(req.params.id, function (err, users) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(users);
        }

    });
});
router.put('/addCustomer/:id_schedule/:customer', function (req, res, next) {

    var schedule_id = req.params.id_schedule;
    var id_customer = req.params.customer;
    var bool = true;
    schedules.findById(schedule_id, function (req, schedule) {
        console.log("list schedule :", schedule.user_id);
        for (var item in schedule.user_id) {
            //console.log("item :",item);
            //console.log("id_customer :",id_customer);
            if (schedule.user_id[item] == id_customer)
                bool = false;
        }
        if (bool == true) {
            schedule.user_id.push(id_customer);
            schedule.save(function (err, schedule) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(schedule);
            });
        } else
            res.send("Already exist");
    });

});
router.put('/update/:id/:state', function (req, res, next) {
    users.findById(req.params.id, function (err, shared) {
        if (err) {
            res.status(500).send(err);
        } else {
            //console.log("state : ",req.params.state);
            if (req.params.state == "true") {
                shared.type = "shared";
                shared.save(function (err, shared) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(shared);
                });
            }
            else if (req.params.state == "false") {
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
router.delete('/delete/:id/:id_user', function (req, res, next) {
    var allPromise = [];
    schedules.findById(req.params.id, function (err, schedule) {
        console.log("schedule :", schedule);
        schedule.user_id.forEach(function (data, index) {
            var myPromise = new Promise(function (resolve, reject) {


                console.log("Data :", data);
                if (data == req.params.id_user) {
                    console.log("Data :", data);
                    schedule.user_id.splice(index, 1);
                    schedules.findOneAndUpdate({'_id': req.params.id}, {$set: schedule}, {new: true}, function (err, schedule) {
                        if (err) {
                            reject(err);
                        } else {
                            console.log("Schedule Updated");
                             resolve(schedule);
                        }
                    });
                }


            });

            allPromise.push(myPromise);
        });

    });

    Promise.all(allPromise).then(function (data) {
        res.status(200).send();
    })
});
/*
 mongoose.model('Schedule').findOneAndUpdate({'_id': id},{$set :{'from':from, 'to':to ,'date':date }},{new: true},function(err,schedule){
 if(err){
 console.log(err);
 }else {
 console.log("Schedule Updated");
 res.status(200).send();
 }
 });
 */

module.exports = router;
