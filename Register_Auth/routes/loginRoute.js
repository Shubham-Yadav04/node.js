const express=require('express');

const router= express.Router();
const loginRoute=require('../controller/auth');
router.post('/', loginRoute.authChecker);

module.exports=router;