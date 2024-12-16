const express=require('express');

const router= express.Router();
const registerRouter=require('../controller/register');
router.post('/',registerRouter.handleNewUser);

module.exports=router;