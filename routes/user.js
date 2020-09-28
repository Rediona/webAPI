//contains all my user related routes

const express = require('express')
const mysql = require('mysql')
const fs = require('fs')
//const bcrypt = require('bcrypt')


//declare new function router
const router = express.Router()
router.get('/messages', (req, res) => {
    console.log("message.")
    res.end()
})

//introducing a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, //provide the max number of connections
    host: 'localhost',
    user: 'root',
    database: 'cells',
    
})

function getConnection(){
    return pool 
    //καθε φορα που δημιουργειται νεο connection απο καποιο χρηστη καλουμε το pool 
    //χρησιμοποιουμε το pool οπως καθε connection, οριζοντας πχ query σ αυτο
    
}

const connection = getConnection()




//get all users router
router.get("/users", (req,res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString,(err,rows,fields) =>{
        if(err){
            console.log("Failed to query users" + err)
            res.sendStatus(500)
            return
        }

    res.json(rows)
   })
   
})


/***************CELLS DB ROUTES*************************/
router.get("/all", (req,res) => {
    const connection = getConnection()
    const queryString = "select cell_name,cd,father_cell from cells union all select cell_name,cd,father_cell from progenitors"
    
    connection.query(queryString,(err,rows,fields) =>{
        if(err){
            console.log("Failed to query users" + err)
            res.sendStatus(500)
            return
        }

    res.json(rows)
   })
   
})

//get all progenitors router
router.get("/progenitors", (req,res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM progenitors"
    connection.query(queryString,(err,rows,fields) =>{
        if(err){
            console.log("Failed to query" + err)
            res.sendStatus(500)
            return
        }

    res.json(rows)
   })
})

//get all cell router
router.get("/cells", (req,res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM cells"
    connection.query(queryString,(err,rows,fields) =>{
        if(err){
            console.log("Failed to query" + err)
            res.sendStatus(500)
            return
        }

    res.json(rows)
   })
})

//get all lymphs router /clp
router.get('/:progenitor_associated',(req,res) =>{ //:id
    //console.log("Fetching lymphs: " + req.params.progenitor_associated)

    const connection = getConnection()

    const lymphs  = req.params.progenitor_associated //.id
    const queryString = "SELECT * FROM cells WHERE progenitor_associated = ?" //id=
    connection.query(queryString,[lymphs],(err,rows,fields) =>{
            if(err){
                console.log("Failed to query" + err)
                res.sendStatus(500)
                return
            }

            
        res.json(rows)
    })
})

/**********POST TO DB*******************/

/*************CREATE********************/
router.post('/user_create', (req,res) => {
    console.log("Trying to create a new user")
    
    console.log("First Name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const queryString = "INSERT INTO users (first_name, last_name) VALUES(?,?)"
    getConnection().query(queryString,[firstName,lastName],(err,results,fields) =>{
        if(err){
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        //console.log("Inserted a new user with id: ",results,insertedId)
        res.end()
    })

})

router.post('/cell_create', (req,res) => {
    console.log("Trying to create a new cell")
    
    console.log("First Name: " + req.body.create_cell_name)
    const cellName = req.body.create_cell_name
    const cd = req.body.create_cd
    const parent = req.body.create_father_cell
    const diameter = req.body.create_diameter
    const progenitor = req.body.reate_progenitor_associated


    const queryString = "INSERT INTO cells (cell_name, cd, father_cell,diameter,progenitor_associated) VALUES(?,?,?,?,?)"
    getConnection().query(queryString,[cellName , cd, parent, diameter, progenitor],(err,results,fields) =>{
        if(err){
            //console.log("Failed to insert new cell: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new cell")
        res.json({update : true})
    })

})

router.post('/cell_update',async (req,res) => {
    console.log("Trying to udate a cell")
    const connection = getConnection() 
    

    const cellId= req.body.id
    const cellName = req.body.up_cell_name
    const cd = req.body.up_cd
    const parent = req.body.up_father_cell
    const diameter = req.body.up_diameter
    const progenitor = req.body.up_progenitor_associated


    const queryString = "UPDATE cells SET cell_name = ?, cd= ?, father_cell= ?, diameter= ?, progenitor_associated= ? WHERE id= ?"
    connection.query(queryString,[cellName , cd, parent, diameter, progenitor,cellId],(err,results,fields) =>{
        if(err){
            console.log("Failed: " + err)
            res.sendStatus(500)
            return
        }
        
        res.json({update : true})
    })

})





/********DELETE*************/
router.post('/cell_delete', async (req, res) => {
    console.log("trying to delete cell");
    const connection = getConnection()

    const cellId= req.body.id
    const queryString= "DELETE FROM cells WHERE id = ?" 

    connection.query( queryString, [cellId], (err, rows,fields) => {
     if (err) {
        console.log("failed to delete cell " + err)
        res.sendStatus(500)
        return
       
     } 
     res.json({delete : true})
       
    })  
});

router.post('/user_delete', async (req, res) => {
    console.log("trying to delete user");
    const connection = getConnection()

    const userId= req.body.id
    const queryString= "DELETE FROM users WHERE id = ?" 

    connection.query( queryString, [userId], (err, rows,fields) => {
     if (err) {
        console.log("failed to delete user " + err)
        res.sendStatus(500)
        return
       
     } 
     res.json({UserDelete : true})
       
    })  
});



router.post('/admin_log',async(req,res)=>{

    const connection = getConnection()

    const password = req.body.password
    const mail = req.body.mail

    if((mail==="redi@mail" && password==="redi") || mail==="petros@mail" && password==="petros"){
        res.redirect('../public/cell_create.html')
    }else {
        res.redirect('../public/login.html')
    }
  res.end()
})


//export this router out of this file
module.exports = router

/*
const http = require("http");
const url = "http://localhost:3003/users";

http.get(url, res => {
  res.setEncoding("utf8");
  let users = "";
  res.on("data", data => {
    users += data;
  });
  res.on("end", () => {
    users = JSON.parse(users);
    console.log(users);
  });
});
*/
