const http = require("http");
const mysql = require("mysql2");
const { mainModule } = require("process");

http.createServer(function(request, response){
    let data = [];
    let result;
    request.on("data", chunk => {
        data.push(chunk);
    });
    request.on("end", () => {
        if(data.length) {
            data = Buffer.concat(data).toString();
            let g = new URLSearchParams(data);
            result = Object.fromEntries(g);
            console.log(result);

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

            const sql = `SELECT * FROM users WHERE email=? AND pass=?`;
            const filter = ["s-k@mail.ru", '123456']

            connection.query(sql, filter, function (err, res){
                // console.log(res);
                if(res[0].email === 's-k@mail.ru' && res[0].pass === '123456') {
                    console.log('success');
                } else {
                    console.log('error');
                }
            })

            // connection.query("SELECT * FROM users", function (error, result, metadata){
            //     console.log(error);
            //     console.log(result);
            //     console.log(metadata);
            // })

            // connection.query("SELECT id FROM users WHERE email=?", [result.email], function (err, res){
            //     if(res.length){console.log("exist")}
            //     else{
            //         const user = [result.name, result.lastname, result.email, result.pass];
            //         connection.query("INSERT INTO `users`(`name`, `lastname`, `email`, `pass`) VALUES (?,?,?,?)", user,
            //             function (error, result, metadata) {
            //                 console.log(error);
            //                 console.log(result);
            //             })
            //     }
            // })
        }
        response.end("Данные успешно получены");
    });
}).listen(3000);