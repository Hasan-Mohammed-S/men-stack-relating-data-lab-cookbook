const express = require('express');

const User = require('../models/user.js');
const foodsController = require('./usersController.js');

const index = async(req, res) => {
    try {
        const users = await User.find();
        res.render('users/index.ejs', { users })
    } catch (err) {
        console.log(err);
    }
};

const show = async(req, res) => {
    try {
        console.log('test')
    } catch (err) {
        console.log(err);
    }
};


module.exports = {
    show,
    index
}