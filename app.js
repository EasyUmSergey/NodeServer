const express = require('express');
const mysql = require("mysql2");
const app = express();
const port = 3000;
const multer = require('multer');
let upload = multer();
// const bodyParser = require('body-parser');



app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "fullstack19",
    password: ""
});

connection.connect(function (err) {
    if (err) {
        return console.error(err.message);
    } else
        console.log("success");
});

app.get('/', (req, res) => {
    res.send('<a href="/reg">Регистрация</a>|<a href="/login">Вход</a>');
});

app.get('/reg', (req, res)=> {
    // console.log(req.query.name);
    // console.log(req.query.lastname);
    res.sendFile(__dirname + "/reg.html");
})

app.get('/login', (req, res)=> {
    res.sendFile(__dirname + "/auth.html");
})
app.post('/reg', upload.fields([]), (req, res) => {
    console.log(req.body);
    connection.query("SELECT id FROM users WHERE email=?", [req.body.email], function (err, res){
        if(res.length){console.log("exist")}
        else{
            const user = [req.body.name, req.body.lastname, req.body.email, req.body.pass];
            connection.query("INSERT INTO `users`(`name`, `lastname`, `email`, `pass`) VALUES (?,?,?,?)", user,
                function (error, result, metadata) {
                    console.log(error);
                    console.log(result);
                })
        }
    })
    res.send("success");
})

app.post('/login', upload.fields([]), (req, res)=> {
    console.log(req.body);
    res.send("success");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})