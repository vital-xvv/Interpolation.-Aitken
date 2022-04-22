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

    var response = aitkenCalc(a, b, n, x0)

    var error = (aitkenCalc(a, b, n, x0).res - aitkenCalc(a+1, b+1, n, x0).res)/((x0-a)/(b+1 - a))

    var nexac = []
    var ni = []
    var k = []

    for(let i = 1; i <= 10; i++ ){
        nexac.push((aitkenCalc(a, b, i, x0).res - Math.pow(1+Math.pow(Math.E, -x0), -1)));
        ni.push(((aitkenCalc(a, b, i, x0).res - aitkenCalc(a+1, b+1, i, x0).res)/((x0-a)/(b+1 - a))).toFixed(5))
    }

    for(let i = 0; i < 10; i++ ){
        if(ni[i] === 0 || ni[i] === Infinity || nexac[i] === Infinity) {
            k.push(0)
        }
        else{k.push(1-nexac[i]/ni[i])}
        
    }

    var xnew = response.xi
    var tempY = []
    for(let i = 0; i < xnew.length - 1 ; i++){
        xnew[i] = parseFloat(((x0 - xnew[i])/(xnew[i+1] - xnew[i])).toFixed(3))
    }
    xnew.sort()
    for(let i = 0; i < xnew.length - 1 ; i++){
        tempY.push(- Math.log10(Math.abs(aitkenCalc(xnew[0], xnew[xnew.length-1], n, xnew[i]).res - aitkenCalc(xnew[0], xnew[xnew.length-1], n+1, xnew[i]).res)))
    }

    res.json({xnew, tempY, error, nexac, ni , k});
})



// ---------- Middlewares ---------- //
server.use((req, res) => {
    res.statusCode = 404;
    res.send("error");
})