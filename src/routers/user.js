const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/user', (req,res) => {
    res.send('This is a user page')
})

//creating a new user
router.post('/users', async (req, res) => {
    
    const user = new User(req.body)
    
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req,res) => {
    try {
        const { email, password} = req.body
        const user = await User.findByCredentials(email, password)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//reading all user
router.get('/users', async (req,res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

//read specific user
router.get('/users/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

// update user data
router.patch('/users/:id', async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']
    const isValidOperation = updates.every((updates) => allowedUpdates.includes(updates))

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid Updates!"})
    }

    try {

        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// delete user
router.delete('/users/:id', async(req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router