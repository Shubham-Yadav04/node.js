const express= require('express');
const router= express.Router();
const {getAllUsers} = require('../controller/getUser');

router.get('/', (req, res, next) => {
    console.log("Router Middleware Triggered");
    next();
}, getAllUsers);

module.exports=router;