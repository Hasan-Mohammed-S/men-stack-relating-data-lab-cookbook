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



const show = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const food = user.pantry.id(req.params.foodId);

        res.render('foods/show.ejs', { food });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};



const create = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log(user)
        user.pantry.push(req.body);
        await user.save();

        res.redirect(`/users/${req.params.userId}/foods`);
    } catch (err) {
        console.log(err);
        res.redirect('/users/:userId/foods/new');
    }
};



const deleteFood = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        user.pantry.pull(req.params.foodId);

        await user.save();

        res.redirect(`/users/${user._id}/foods`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const edit = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const food = user.pantry.id(req.params.foodId);

        res.render('foods/edit.ejs', { food });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};



const update = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const food = user.pantry.id(req.params.foodId);

        food.set(req.body);

        await user.save();

        res.redirect(`/users/${user._id}/foods/${food._id}`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};


const index = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.render('foods/index.ejs', { pantry: user.pantry });
    } catch (err) {
        res.redirect('/')
    }
}

module.exports = {
    new: newFood,
    index,
    create,
    delete: deleteFood,
    edit,
    show,
    update
}