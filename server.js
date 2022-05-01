import { coinFlip, coinFlips, countFlips, flipACoin } from "./coin.mjs";
import minimist from "minimist";
const express = require('express')
const app = express();

const args = minimist(process.argv.slice(2));

const HTTP_PORT = args["port"] || 5000;

//start an app server
const server = app.listen(HTTP_PORT, () => {
  console.log("App listening on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/app/", (req, res) => {
  res.status(200).json("200 OK");
});

app.get("/app/", (req,res) => {
    res.statusCode = 200
    res.statusMessage = "ok"
    res.writeHead(res.statusCode, {"Content-Type": "text/plain"})
    res.end(res.statusCode + " " + res.statusMessage)
})

app.get("/app/flip/", (req, res) => {
    var flip = coinFlip()
    return res.status(200).json({"flip" : flip})
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