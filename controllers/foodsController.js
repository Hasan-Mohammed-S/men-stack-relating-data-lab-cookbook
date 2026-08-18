// controllers/foods.js

const express = require('express');

const User = require('../models/user.js');

const newFood = async(req, res) => {
    try {
        res.render('foods/new.ejs');
    } catch (err) {
        res.redirect('/');
    }
};

const index = async(req, res) => {
    try {
        res.render('foods/index.ejs')
    } catch (err) {
        res.redirect('/')
    }
}

module.exports = {
    new: newFood,
    index
}