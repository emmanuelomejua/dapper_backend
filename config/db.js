'use strict';

require('dotenv').config()

const mongoose = require('mongoose');
const { set, connect } = require('mongoose');
const { log, error } = require('console')

const connectDB = () => {
    set('strictQuery', true)

    connect(process.env.DB_URL, {
        w: 'majority',
        journal: true, // If you want to wait for the write to be acknowledged by the journal
        wtimeoutMS: 1000,
    })

    mongoose.connection.on('connected', () => {
        log('DB Connection sucessful!!')
    })

    mongoose.connection.on('error', (err) => {
        error(err.message)
    })

    mongoose.connection.on('disconnected', () => {
        log('DB Disconnected!!')
    })
}


module.exports = connectDB
