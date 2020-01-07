import {mdb} from './database/db-config'
var express = require("express");
var router = express.Router();

const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: mdb.config.host,
    user: mdb.config.user,
    password: mdb.config.password,
    database: mdb.contig.database
})

/* GET users listing. */
// req 객체를 처리한 후 res를 리턴함
router.get("/", function(req, res, next) {
    pool.getConnection().then(conn => {
        conn.query("select * from info").then(rows => {
            console.log(rows);
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
