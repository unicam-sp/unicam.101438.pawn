const express = require('express')
const router = express.Router()

const UsersModel = require('./../models/users')

// GET
/*
router.get('/', (req, res, next) => {
    if(req.userData) {
        UsersModel.findOne({username: req.body.username}).exec()
        .then(result => { 
            res.status(200).json(result)
        })
        .catch(err => myutils.error(res, 500, err))
    }
    else myutils.message(res, 500, 'login first')
})
*/

router.delete('/:id', (req, res, next) => {
    if(req.userData) {
        const userToRemove = {
            _id: req.params.id
        }
        UsersModel.remove(userToRemove).exec()
        .then(result => res.status(200).json(result) )
        .catch(err => myutils.error(res, 500, err))
    }
    else myutils.message(res, 500, 'login first')
})

module.exports = router;