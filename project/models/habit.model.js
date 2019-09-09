const mongoose = require('mongoose');

var habitSchema = new mongoose.Schema({
    commitment: {
        type: String,
        required: 'This field is required.'
    },
    checkIns: {
        type: Number
    }
    // email: {
    //     type: String
    // },
    // mobile: {
    //     type: String
    // },
    // city: {
    //     type: String
    // }
});

// Custom validation for email
// habitSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');

mongoose.model('Habit', habitSchema);