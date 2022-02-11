
/* var express = require('express');

 const router = express.Router();
const path = require("path");

router.get('/', (req, res) => {

    res.render(path.join(__dirname, '/../views/index'));
});

router.get('/aboute', (req, res) => {
   
    res.render(path.join(__dirname, '/../views/about'));
});

module.exports = router;*/



const express = require("express");
const router = express.Router();

router.get('/', async (req,res) => {
});

//Create a todo.
router.post('/post', async (req,res) => {
});

//Update a todo.
router.put('/todos/:todoId', async (req,res) => {
});

//Delete a todo.
router.delete('/todos/:todoId', async (req,res) => {
});

module.exports = router;