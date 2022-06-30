const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECERT = "KunalDua";

//Create user with POST "/api/auth/createUser" DOES'T require AUTH
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 5 })
], async (req, res) => {
    // req => request
    // res =>

    //if there are errors return errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Email aready exists" });
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data={
            id:user.id
        }
        const authToken = jwt.sign({ data }, 'JWD_SECERT');
        res.json(authToken)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

module.exports = router