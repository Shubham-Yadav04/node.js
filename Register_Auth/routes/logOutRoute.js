const express=require('express');

const router= express.Router();

router.get('/',require('../controller/logOut').LogOut);

module.exports=router