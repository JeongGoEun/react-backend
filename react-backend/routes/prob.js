var express = require("express");
var router = express.Router();

var mdb = require('./database/db-config.json');

const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: mdb.host,
    user: mdb.user,
    password: mdb.password,
    database: mdb.database
})

/* GET users listing. */
// req 객체를 처리한 후 res를 리턴함
router.get("/", function(req, res, next) {
    pool.getConnection().then(conn => {
        conn.query("select * from prob_info").then(rows => {
            console.log(rows);
            // for cors
            //res.header("Access-Control-Allow-Origin", "*");
            //res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.send(rows);
            conn.release();
        })
    })
})

router.post("/add", function(req, res) {
    var data = [req.body.id, req.body.pw];
    pool.getConnection().then(conn => {
        var sql = "insert into info (id, pw) values (?,?)"
        conn.query(sql, data, function(err, rows, fileds) {
            if (err) throw err

            conn.release();
        })
        res.json('success')
    })
})

module.exports = router;
