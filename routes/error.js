const express=require('express');
const path= require('path');
const fs= require('fs');
const fsPromise= require('fs').promises;
const date= require('date-fns');
const {v4:uuid}= require('uuid');
const logItems=require('../EventsFile/logEvent.js');

const router=express.Router();

router.get('/*',(err,req,res,next)=>{
    console.log(err.stack);
    res.statuscode(500).send()

})
