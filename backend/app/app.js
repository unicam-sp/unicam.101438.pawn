const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const parser = require('body-parser')
const checkAuth = require('./api/middleware/check-auth')

// ----- IMPORT ROUTES -----
const usersRoutes = require('./api/routes/users')
const deleteUsersRoutes = require('./api/routes/deleteUser')
const todosRoutes = require('./api/routes/todos')
const groupsRoutes = require('./api/routes/groups')

// ----- CONNECTION TO DB -----
mongoose.connect('mongodb://localhost/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
mongoose.connection.on('connected', () => { 
    console.log('Connected to MongoDB @ 27017'); 
}); 

// ----- PARSER -----
// every request will be parsed in a JSON
app.use(parser.urlencoded({ extended: true }))
app.use(parser.json())

// ----- LOG SYSTEM -----
app.use(morgan(':remote-addr :method :http-version :url :status :res[content-length] - :response-time ms')) // log system, should be before all the others uses

// ----- HANDLING REST API -----
app.use('/user', usersRoutes)    // https://localhost/user/
app.use(checkAuth)               // Middleware to check Auth
app.use('/delete', deleteUsersRoutes)
app.use('/todos', todosRoutes)
app.use('/groups', groupsRoutes)

// ----- HANDLING GENERAL ERROR -----
// if any route has been matched, print error
app.use((req, res, next) => {
    const error = new Error('No route found')
    error.status = 404
    next(error)
})

// 500 = general error
// will catch also database errors (e.g 304)
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app