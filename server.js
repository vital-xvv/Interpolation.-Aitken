const express = require('express');
const path = require('path');
const aitkenCalc = require('./js/main')

const createPath = (page) => path.resolve(__dirname, "view", `${page}.html`);

var a = 0
var b = 4
var n = 10
var x0 = 3.3


// ---------- Creating Server ---------- //
const server = express();
const PORT = process.env.PORT || 3000;;
server.listen(PORT, '0.0.0.0', (error) => {
if(error) console.log(error);
else console.log(`listening port ${PORT}`)});


// ---------- Middlewares ---------- //
server.use(express.static('view'));
server.use(express.static('styles'));
server.use(express.static("js"));
server.use(express.urlencoded({extended:false}));


// ---------- Routing ---------- //
server.get('/', (req, res) => {
    res.sendFile(createPath("index"));
});

server.get('/home', (req, res) => {
    res.redirect('/');
});

server.post('/result', (req, res) => {
    console.log(req.body)
    a = parseInt(req.body.a)
    b = parseInt(req.body.b)
    n = parseInt(req.body.n)
    x0 = parseFloat(req.body.x0)
    res.redirect("/");
});

server.get('/calculation', (req, res) => {
    var yc = []
    var temp = aitkenCalc(a, b, n, x0).xi
    for(let el = 0; el < temp.length; el++) {
        yc.push(aitkenCalc(a,b,n,temp[el]).res);
    }
    var response = aitkenCalc(a, b, n, x0)
    
    res.json({response, yc});
})

server.get('/error', (req, res) => {
    res.json({x:[1,2,3]});
})



// ---------- Middlewares ---------- //
server.use((req, res) => {
    res.statusCode = 404;
    res.send("error");
})