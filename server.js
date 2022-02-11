const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const routeposts = require("./post");
const bcrypt = require('bcrypt');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')


app.get('/add', routeposts.add);
app.get('/', routeposts.index);
app.post('/add',routeposts.save);
app.get('/list/delete/:id', routeposts.delete);
app.get('/list/edit/:id', routeposts.edit);
app.post('/list/update/:id', routeposts.update);
app.get('/login', routeposts.login);
app.get('/register', routeposts.regester);
app.get('/dashbord', routeposts.dashbord);
app.post('/users/register', routeposts.regester_user);
 app.listen(8081)
console.log("run server")
