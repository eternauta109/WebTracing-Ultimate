const express = require("express");
const router = express.Router();
const dbconfig = require("../config");
const mysql = require("mysql");
const ErrorHandler=require("../helper/ErrorHandler")

const con = mysql.createPool(dbconfig);

router.get(["/", "/login"], (req, res) => {
  
  res.send("login home page");
  console.log(req.body);
});

router.post(["/", "/login"], (req, res, next) => {
  
  const username = req.body.username;
  const password = req.body.password;
 
  
  const sqlquery =
    "SELECT login.password,login.cinema FROM tracingdb.login WHERE login.username=?;";

  
  try {
    con.query(sqlquery, [username], (err, result, fields) => {
      if (err){ 
        next(new ErrorHandler(0,err));
        return
      }      
      if (result.length === 0) {        
        next(new ErrorHandler(404,"username non presente nel db"));
        return        
      }      
      if (result[0].password === password) {
        /* console.log("query result", result[0].cinema); */
        /* res.status(301).redirect("/tracing") */
        res.status(200).json(result[0].cinema);
        return;
      }
      next(new ErrorHandler(404,"password errata"));
      return;
    });
  } catch (error) {
    next(new ErrorHandler(404,"errore nella try della query sul login: vedi server/login.js")) ;
    return
  }
});

module.exports = router;

/* const sqlquery="INSERT INTO login (username,password, cinema) VALUES ('nola','nola','nola')"
    db.query(sqlquery,(err,result)=>{
        console.log(err);
        console.log(result)
        res.send("hello fabio") 
    }) */
