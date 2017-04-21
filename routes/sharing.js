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
var momentCountdown = require('moment-countdown');
/* GET users listing. */

router.get('/place', function (req, res, next) {

    var nb_place_list = [];
    var schedules_list = [];
    var nb_place=0;
    schedules.find(function (err, schedules) {

        schedules_list = schedules;
        //res.json(schedules_list);
        schedules_list.forEach(function (data, index) {
            console.log("nb place :",4 - data.user_id.length);
            nb_place=4 - data.user_id.length;
            nb_place_list.push(nb_place);

        });
        console.log(nb_place_list);
        res.json(nb_place_list);

    });

});

router.get('/', function (req, res, next) {

    users.find(function (err, users) {
        res.json(users);
    });
});

router.get('/available', function (req, res, next) {
    var now = moment().format();
    var hour = moment().add(1, 'month').format();

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
router.get('/getDistance/:longitude_car/:latitude_car/:longitude_user/:latitude_user', function (req, res, next) {
    var longitude_car = req.params.longitude_car;
    var latitude_car = req.params.latitude_car;

    var longitude_user = req.params.longitude_user;
    var latitude_user = req.params.latitude_user;
    var distance = getDistanceFromLatLonInKm(latitude_car, longitude_car, latitude_user, longitude_user);
    console.log("distance", distance);

    res.json(distance);
});
router.get('/countdown/:time', function (req, res, next) {
    var time = req.params.time;
    var sec = moment.duration(15000).seconds();
    var countdown = {
        "second": sec
    };
    var count = 0;
    var fromNow = moment("1982-05-25").countdown().toString();
    console.log("time", fromNow);
    /*var refreshId = setInterval(function() {

     console.log(sec - count);
     count++;
     if (sec - count == 0) {
     clearInterval(refreshId);
     }
     }, 1000);*/
    res.json(countdown);
});
router.get('/notify/:id_user', function (req, res, next) {
    var nb_notif = 0;
    var id_user = req.params.id_user;
    users.findById(id_user, function (err, user) {
        schedules.findById(user.commute_id, function (err, schedule) {
            if (schedule.user_id.length == 0) {
                nb_notif = 0;
                res.json(nb_notif);
            }
            else {
                nb_notif = schedule.user_id.length - 1;

                res.json(nb_notif);
            }

        });
    });

});


module.exports = router;
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}