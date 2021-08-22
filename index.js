//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();
var tasks = [];
var surrogateKey = 1;

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = surrogateKey++;
    req.body.status = "pending";
    tasks.push(req.body);
    res.send("OK");
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});

app.get("/tasks/:taskID", (req, res, next) => {
    const currentID = req.params.taskID;
    ind = tasks.findIndex(o => o.id == currentID);
    res.json(tasks[ind]);
});

app.put("/tasks/:taskID", jsonParser, (req, res, next) => {
    const state = req.query.state;
    
    const currentID = req.params.taskID;
    const currentTitle = req.body.title;
    const currentDescrp = req.body.detail;
    ind = tasks.findIndex(o => o.id == currentID);
    
    if(state == null){
        tasks[ind].title = currentTitle;
        tasks[ind].detail = detail;
    }
    else{
        tasks[ind].status = state;
    }
    res.json(tasks[ind]);

});

app.delete("/tasks/:taskID", jsonParser, (req, res, next) => {
    const currentID = req.params.taskID;
    ind = tasks.findIndex(o => o.id == currentID);
    tasks.splice(ind, 1);
    res.send("Succesful delete!");
});