const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const request = require("request");
const url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, (req, res) => {
    console.log(`Running on port ${port}.`);
});

// GET
app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

// POST
app.post("/", (req, res) => {

    let crypto = req.body.crypto;
    let cur = req.body.fiat;
    let amount = req.body.amount;
    let baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

    var options = {
        url: baseURL,
        method: "GET",
        qs: {
            from: crypto,
            to: cur,
            amount: amount
        }
    };

    request(options , (error, response, body) => {
        var data = JSON.parse(body);
        var price = data.price;
        console.log(price);

        //when sending more than one thing
        var currentDate = data.time;

        res.write(`<p>The current date is ${currentDate}.</p>`);
        res.write(`<h1>${amount} ${crypto} is currently worth ${price} ${cur}.<h1>`);
        res.send();

    });

});
