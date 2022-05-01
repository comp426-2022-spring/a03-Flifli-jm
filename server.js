const express = require('express')
const app = express();

const args = minimist(process.argv.slice(2));

const HTTP_PORT = args["port"] || 5000;

//coinFlip()
function coinFlip() {
    return ((Math.floor(Math.random() * 2)) == 0) ? ("heads") : ("tails") ;
  
  }
  
function coinFlips(flips) {
    let ans = new Array();
    while(flips >= 0) {
      ans[flips] = coinFlip();
      flips--;
    }
    return ans;
}

function countFlips(array) {
    let cntHead = 0;
    let cntTail = 0;
    let i = 0;
    for (i = 0; i < array.length; i++) {
      if(array[i] == 'heads') cntHead++;
      else cntTail++;
    }
    let cnt = {tails: cntTail, heads: cntHead}
    return cnt;
 }

function flipACoin(call) {
    let re = coinFlip();
    let result = '';
    if(call == 'heads' || call == 'tails') {
      if(call == re) result = 'win';
      else result = 'lose';
    }
    let ans = {call: call, flip: re, result: result}
    return ans;
}
//start an app server
const server = app.listen(HTTP_PORT, () => {
  console.log("App listening on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/app/", (req, res) => {
  res.status(200).json("200 OK");
});

app.get("/app/", (req,res) => {
    // Respond with status 200
    res.statusCode = 200
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode + ' ' + res.statusMessage)
})

app.get("/app/flip/", (req, res) => {
    var flip = coinFlip()
    return res.status(200).json({
        "flip" : coinFlip()
    })
})


app.get('/app/flips/:number', (req, res) => {
    const raw = coinFlips(req.params.number);
    const summary = countFlips(raw);
    res.status(200).json({
        "raw": raw,
        "summary": summary
    });
});



app.get("/app/flip/call/heads", (req, res) => {
    return res.status(200).json(flipACoin("heads"))
})

app.get("/app/flip/call/tails", (req, res) => {
    return res.status(200).json(flipACoin("tails"))
})

app.use(function(req, res){
    res.status(404).send("404 NOT FOUND")
})