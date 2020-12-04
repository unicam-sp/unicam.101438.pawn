const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const myutils = require('../myutils')

const Todos = require('./../models/todos')

// ----- PERSONAL -----
router.get('/', (req, res, next) => {
    if(req.userData) {
        Todos.find({ 
            usernameCreator: req.headers.username,
            groupId: 'personal'
        }).exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => myutils.error(err, 500, res))
    }
    else myutils.message(res, 500, 'login first')
})

router.post('/', (req, res) => {
    if(req.userData) {
        const newTodos = new Todos ({
            _id: new mongoose.Types.ObjectId(),
            description: req.body.description,
            groupId: 'personal',
            usernameCreator: req.headers.username
        })
        newTodos.validate( (err) => {
            if(err) return myutils.error(res, 500, err.message)
            newTodos.save()
            .then(result => res.status(201).json({
                message: 'todo created'
            }))
            .catch(err => myutils.error(res, 500, 'error on creating user'))
        })
    }
    else myutils.message(res, 500, 'login first')
})

router.delete('/:id', (req, res) => {
    if(req.userData) {
        Todos.deleteOne({"_id": req.params.id}).exec()
        .then(result => {
            console.log(result)
            if(result.deletedCount > 0) {
                res.status(201).json({
                    message: 'todo deleted'
                })
            }
            else {
                res.status(404).json({
                    message: 'todo not deleted'
                })
            }
        })
        .catch(err => myutils.error(res, 500, err))
    }
    else myutils.message(res, 500, 'login first')
})

module.exports = router;