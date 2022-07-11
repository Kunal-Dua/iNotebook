const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser.js')

const JWT_SECERT = "KunalDua";

// ROUTE 1: Create user with POST "/api/auth/createUser" No Login required
router.post('/createUser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a valid password").isLength({ min: 5 })
], async (req, res) => {
    // req => request
    // res => response

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
        const data = {
            id: user.id
        }
        const authToken = jwt.sign({ data }, JWT_SECERT);
        res.json(authToken)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

})

//Route 2 Create user with POST "/api/auth/login" No Login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter a valid password").exists()
], async (req, res) => {
    const errors = validationResult(req);
    // let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({  error: "Please login using correct credentails" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({  error: "Please login using correct credentails" });
        }

        const data = {
            id: user.id
        }
        const authToken = jwt.sign(data, JWT_SECERT);
        success = true;
        res.json( authToken)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//Route 3 get logged in user details with POST "/api/auth/getUser" Login required 

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error eeeee");
    }
})

module.exports = router