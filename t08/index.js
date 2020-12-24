const fetch = require('node-fetch');
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
            <p>url: ${app.get('site')}</p>
            <hr>
            <div>
            ${app.get('info')}
            </div>
        `);
    }
    else
        res.sendFile(path.join(__dirname + '/index.html'));
})
router.post('/', async (req, res) => {
    sess = req.session;
    sess.site = req.body.site;
    app.set('done', false);
    if (sess.site) {
        app.set('done', true);
        await fetch(sess.site)
            .then(resp => resp.text()).then(body => {
                app.set('info', body);
                app.set('site', sess.site);
            })
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
