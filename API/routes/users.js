const express= require('express');
const {getAllUsers,createNewUser,UpdateUserById,deleteUserById,getUserById} = require('../controller/user');
const router= express.Router();

router.route('/')
        .get(getAllUsers)
        .post(createNewUser)
    

router.route('/:id')
        .get(getUserById)
        .put(UpdateUserById)
        .delete(deleteUserById)

module.exports=router;