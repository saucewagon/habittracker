const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Habit = mongoose.model('Habit');

router.get('/addoredit', (req, res) => {
    res.render("habit/addOrEdit", {
        viewTitle: "Create New Habit"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

router.post('/checkin/:id', (req, res) => {
    incRecord(req, res);
});

function insertRecord(req, res) {
    var habit = new Habit();
    habit.commitment = req.body.commitment;
    habit.checkIns = 0;
    // habit.email = req.body.email;
    // habit.mobile = req.body.mobile;
    // habit.city = req.body.city;
    habit.save((err, doc) => {
        if (!err)
            res.redirect('/');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("habit/addOrEdit", {
                    viewTitle: "Create New Habit",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Habit.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("habit/addOrEdit", {
                    viewTitle: 'Update Habit',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

function incRecord(req, res) {
    console.log('asdfasdfasdf');
    Habit.findOneAndUpdate({ _id: req.body._id }, {$inc: {checkIns: 1}}, { new: true }, (err, doc) => {
        if (!err) { 
            console.log('asdf');
            
            res.redirect('/'); }
        else {
            console.log('here');
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("habit/addOrEdit", {
                    viewTitle: 'Update Habit',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/', (req, res) => {
    Habit.find((err, docs) => {
        if (!err) {
            res.render("habit/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving habit list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'commitment':
                body['commitmentError'] = err.errors[field].message;
                break;
            // case 'email':
            //     body['emailError'] = err.errors[field].message;
            //     break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Habit.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("habit/addOrEdit", {
                viewTitle: "Update Habit",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Habit.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/');
        }
        else { console.log('Error in habit delete :' + err); }
    });
});

// router.get('/checkin/:id', (req, res) => {

//     Habit.findOne({ '_id': req.body._id }, (err, habit) => {
//         //habit.checkins = req.body.checkIns + 1;
//         habit.save();
//     });


//     // Habit.findOneAndUpdate({_id: req.body._id},
        
//     //     { 
//     //         '$inc': {checkIns: req.body.checkIns } });
//     // res.redirect('/');
// });

// router.get('/checkin/:id', (req, res) => {

//     Habit.findOneAndUpdate({_id: req.body._id}, {checkIns: 7}, {new : true}, (err, doc) => {
//         if (!err) { res.redirect('/'); }
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("habit/addOrEdit", {
//                     viewTitle: 'Update Habit',
//                     employee: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     });
// }

module.exports = router;