var request = require("request");
const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();
app.use(session({secret: 'shhhhhhh', saveUninitialized: true, resave: true}));
app.use(bodyParser.urlencoded({extended: true}));
var sess;
var site = "";
var info = "";

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    sess = req.session;
    if (app.get('done') === true) {
        app.set('done', false);
        console.log(app.get('info'));

        res.end(`
            <h1>Show other sites</h1>
            <form action="/" method="POST">
                <input type="text" name="site" id="site" placeholder="url">
                <button type="submit">go</button>
                <a href="/">BACK</a>
            </form><br>
            <hr>
            <p>url: ${site}</p>
            <hr>
            <div>
            ${info}
            </div>
        `);
    }
    else
        res.sendFile(path.join(__dirname + '/index.html'));
})
router.post('/', (req, res) => {
    sess = req.session;
    sess.site = req.body.site;
    
    app.set('done', false);
    if (sess.site) {
        app.set('done', true);
        request({
            uri: `${sess.site}`,}, function(error, response, body) {
                info = body;
                site = sess.site;
            }
        );
    }
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
