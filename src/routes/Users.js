const express = require('express');
const Users = require('../models/Users');
const UserHandler = require('../handlers/UserHandler');
const ExportHandler = require('../handlers/ExportHandler');

const router = express.Router();

router.get('/', async (req, res) => {
    const allUsers = await Users.find({});

    let data = {
        users:[]
    };

    allUsers.forEach(user => {
        const row = [
            {text: user._id},  
            {text: user.firstName},
            {text: user.lastName},
            {text: user.email},
            {text: user.contact},
            {html: "<a class=\"govuk-link\" href=\"users/" + user._id + "/edit\">Change<span class=\"govuk-visually-hidden\"> user information</span></a>"}
        ];

        data.users.push(row);
    });
    
    return res.render('Users.html', data);
});

router.get('/create', (req, res) => {
    return res.render('CreateUser.html');
});

router.get('/:id/edit', async (req, res) => {       
    const user = await Users.findById(req.params.id);
    const data = {
        user
    }
    return res.render('EditUser.html', data);
});

router.post('/', async (req, res) => {
    try {
        const errors = UserHandler.validateUser(req.body);
        if (errors.errorsList.length > 0) {
            const data = {
                errors,
                user: req.body
            }
            return res.render('CreateUser.html', data);
        }

        const user = new Users(req.body);
        await user.save();
    } catch(e) {
        console.log(e);
    }

    const data = {
        heading: 'User created',
        title: 'User creation complete',
        html: 'User account has been created successfully.'
    }
    
    return res.render('UserConfirmation.html', data);
});

router.post('/edit', async (req, res) => {
    const user = await Users.findById(req.body.id);

    const errors = UserHandler.validateUser(req.body);
    if (errors.errorsList.length > 0) {
        const data = {
            errors,
            user: req.body
        }
        return res.render('EditUser.html', data);
    }
    
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.contact = req.body.contact;

    await user.save();

    const data = {
        heading: 'User updated',        
        title: 'User update complete',
        html: 'User account has been updated successfully.'
    }

    return res.render('UserConfirmation.html', data);
});

router.get('/:id/delete', async (req, res) => {
    const user = await Users.findById(req.params.id);
    await user.deleteOne();

    const data = {
        heading: 'User delete',        
        title: 'User deleted',
        html: 'User account ' + req.params.id + ' has been deleted successfully.'
    }

    return res.render('UserConfirmation.html', data);
});

router.get('/export', async(req, res) => {

    const users = await Users.find({});

    const formattedUsers = ExportHandler.formatData(users);

    res.header('Content-Type', 'text-csv');
    res.attachment('users.csv');
    res.send(formattedUsers);
});

module.exports = router;