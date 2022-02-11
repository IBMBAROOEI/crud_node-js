

const { Client } = require("pg");

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "marziye",
    password: "12345",
    port: 5432
  });
  client.connect();
  client.query("Select * from users",(err,res)=>{
      if(!err){
        console.log(res)
      }
      else{
          console.log("h")
      }
      client.end;
  })

  const bcrypt = require('bcrypt');


  exports.index = function (req, res) {

    client.query('SELECT * FROM newss', function (err, result) {
        console.log(result);
        if (err) {
       
            res.status(400).send(err);
        }
        res.render('index', { title: "newsss", data: result.rows });
    });

};


  exports.add = function (req, res) {
    res.render('about');
};

exports.save =function (req, res) {
  
    
    var cols = [req.body.name];

    client.query('INSERT INTO newss(name) VALUES($1) RETURNING *', cols, function (err, result) {
        if (err) {
            console.log("Error Saving : %s ", err);
        }
        res.send(req.body.name);
    });

};


exports.delete =function(req,res){
    var id=req.params.id
    client.query("DELETE FROM newss WHERE id=$1" ,[id],function(err,rows){

    if(err){
        console.log("errr")
    }
         res.redirect("/")
    });
    };


    exports.edit=function(req,res){
        var id=req.params.id;

        client.query("SELECT * FROM newss WHERE id=$1",[id],function(err,result){

        if(err){
            console.log(err);
        }
        res.render('edit',{ data: result.rows});
    });
}

exports.update = function (req, res) {

    var cols = [req.body.name, req.params.id];
    
  
client.query('UPDATE newss SET name=$1 WHERE id=$5', cols, function (err, result) {
        if (err) {
            console.log("Error Updating : %s ", err);
        }
       res.redirect("/")
    });

};


exports.login = function (req, res) {
    res.render('login');
};

exports.regester = function (req, res) {
    res.render('regester');
};




exports.dashbord = function (req, res) {
    res.render('dashbord');
};


exports.regester_user = async (req, res) => {  


    let { name, email, password, password_confirm } = req.body;

  
    hashedPassword = await bcrypt.hash(password, 10);

    client.query( `INSERT INTO users (name,email,password)
    VALUES ($1, $2, $3)
    RETURNING id,password `,
    [name, email, hashedPassword],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
     
      res.redirect('/');

})

}



// marziye=# CREATE TABLE newss (ID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, NAME VARCHAR(50) NOT NULL);



// marziye=# CREATE TABLE users (ID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, NAME VARCHAR(50) NOT NULL,EMAIL VARCHAR(100) NOT NULL ,PASSWORD VARCHAR(200) NOT NULL, UNIQUE(EMAIL));


/*/postgres-# CREATE ROLE djamware WITH LOGIN PASSWORD 'dj@mw@r3';
postgres-# ALTER ROLE djamware CREATEDB;
Quit `psql` then log in again using the new user that previously created.

// postgres-# \q
// psql postgres -U djamware*/