const express = require('express')
const app = express()
const port = 8080

let myToDos = [
    {
        title: "buy oatmilk",
        status: "new"
    },
    {
        title: "buy bread",
        status: "new"
    }
];


app.get('/', function (req, res) {
    res.send('Welcome to my ToDo API')
})

app.get('/api/todos', (req, res) => {
    res.send(myToDos);
})

app.post('/api/todos/done', (req, res) => {


    if (req.query.position >= myToDos.length) {
        res.status(404).send('Position not found')
        return
    }

    myToDos[req.query.position].status = "done";

    res.send("");
})

app.post('/api/todos', (req, res) => {

    if (req.query.title === undefined) {
        res.status(400).send('Title value is required')
        return
    }

    if (req.query.title.trim() === "") {
        res.status(400).send('Title value is required')
        return
    }

    let toDoFound = myToDos.filter((toDo) => {
        return toDo.title === req.query.title
    });

    if (toDoFound.length > 0) {
        res.status(400).send('ToDo already exists')
        return
    }

    let newToDo = {
        title: req.query.title,
        status: "new"
    }
    myToDos.push(newToDo);

    res.send(newToDo);
})

app.delete('/api/todos', (req, res) => {

    if (req.query.position === undefined) {
        res.status(400).send('Position is required')
        return
    }

    if (req.query.position >= myToDos.length) {
        res.status(404).send('Position not found')
        return
    }

    myToDos.splice(req.query.position, 1);

    res.send(myToDos);
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})