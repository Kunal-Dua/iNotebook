const express = require('express');
const router = express.Router();
const User = require('../models/User')

//Create user with POST "/api/auth" DOES'T require AUTH
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router