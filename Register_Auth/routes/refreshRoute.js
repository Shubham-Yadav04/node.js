const express=require('express');

const router= express.Router();

router.get('/',require('../controller/refreshTokenController').refershTokenController);

module.exports=router