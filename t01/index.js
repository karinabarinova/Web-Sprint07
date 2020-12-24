const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
app.use(session({secret: 'shhhhhhh', saveUninitialized: true, resave: true}));
app.use(bodyParser.urlencoded({extended: true}));
var sess;

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    sess = req.session;

    if (sess.name) {
        if (!sess.alias)
            sess.alias = "";
        if (!sess.age)
            sess.age = "";
        if (!sess.description)
            sess.description = "";
        if (!sess.photo)
            sess.photo = "";
        if (!sess.experience)
            sess.experience = "";
        if (!sess.level)
            sess.level = "";
        if (!sess.purpose)
            sess.purpose = "";

        res.end(`
            <h1>Session for new</></h1><br>
            <form action="/clear" method="GET">
            <p>name: ${sess.name}</p>
            <p>alias: ${sess.alias}</p>
            <p>age: ${sess.age}</p>
            <p>description: ${sess.description}</p>
            <p>photo: ${sess.photo}</p>
            <p>experience: ${sess.experience}</p>
            <p>level: ${sess.level}</p>
            <p>purpose: ${sess.purpose}</p>
            <button id="submit">Forget</button>
            <form>
        `);
    }
    else {
        res.sendFile(path.join(__dirname + '/index.html'));
    }  
})
router.post('/', (req, res) => {
    sess = req.session;

    sess.name = req.body.name;
    sess.alias= req.body.alias;
    sess.age = req.body.age;
    sess.description = req.body.description;
    sess.photo = req.body.photo;
    sess.experience = req.body.experience;
    sess.level = req.body.level;
    sess.purpose = req.body.purpose;
    res.redirect('/');
})
router.get('/clear', (req, res) => {
    req.session.destroy((err) => {
        if (err)
            return console.log(err);
        res.redirect('/');
    })
})
app.use('/', router);

app.listen(3000);
console.log("Running at port 3000");