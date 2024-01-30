const pool = require('../db');

const { createUser } = require('../logic/createUser');
const { getArt } = require('../logic/getArt');
const { getArtById } = require('../logic/getArtById'); 
const { postComment } = require('../logic/postComment');

async function createUserHandler(req, res) {
    try {
        const result = await createUser(req, res);
        if (result) {
            console.log('User created successfully');
            res.status(201).json(result);
        } else {
            return res.status(400).json({ error: 'Name, age, and location are required.' });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getArtHandler(req, res) {
    const result = await getArt();
    if (result) {
        res.status(200).send(result);
    } else {
        res.sendStatus(500);
    }
}

async function getArtByIdHandler(req, res) {
    try {
        const result = await getArtById(req);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ error: 'Sorry, art with the specified ID was not found.' });
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function postCommentHandler(req, res) {
    try {
        const result = await postComment(req);
        console.log('Comment posted successfully');
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message); 
        if (err.message === 'Content is required' || err.message === 'User with the same name has already left a comment') {
            res.status(400).json({ error: err.message });
        } else {
            res.sendStatus(500);
        }
    }
}


module.exports = { 
    createUserHandler,
    getArtHandler,
    getArtByIdHandler,
    postCommentHandler 
};
