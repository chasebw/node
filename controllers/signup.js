const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://umihiiovjmsfyf:7a3a75f614339d054773380e39ac5f79beec45d9b34fb4e2c81e3ce07abdcf45@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d272ttsve49d9d?ssl=true';
const pool = new Pool({ connectionString: connectionString });

function signupcall(request, response) {

    //grab the id from the body.....
    const username = request.body.username;
    const first_name = request.body.first_name;
    const last_name = request.body.last_name;
    const password = request.body.password;
    const address = request.body.address;
    const cc_number = request.body.cc_number;

    var info = {"username": username, "first_name":first_name,
                "last_name":last_name, "password":password,
                "address":address, "cc_number":cc_number };

    console.log(info);
  
    thequery = request.body;
    console.log('_______________QUEEEERY________________');
    console.log(thequery);
  
    console.log('RIGHT BEFORE CHANGE DB1 CALL');
    change_db1(info, function (error, result) {
  
      //if (error || result == null || result.length == 0)
      if (error || result == null) {
        console.log(result);
        response.status(500).json({ success: false, data: error });
      } else {
        console.log(result);
  
        params = result; //chance to remove [0]
        console.log("inserted customer");
        //response.status(500).json({success:false, data:error});
        //response.status(200).json(params); //line 38 was commented out .....

        change_db2(info, function (error, result) {
  
            //if (error || result == null || result.length == 0)
            if (error || result == null) {
              console.log(result);
              //response.status(500).json({ success: false, data: error });
            } else {
              console.log(result);
        
              params = result; //chance to remove [0]
              console.log("inserted customer");
              //response.status(500).json({success:false, data:error});
        
              //response.status(200).json(params);

              change_db3(info, function (error, result) {
  
                //if (error || result == null || result.length == 0)
                if (error || result == null) {
                  console.log(result);
                  //response.status(500).json({ success: false, data: error });
                } else {
                  console.log(result);
            
                  params = result; //chance to remove [0]
                  console.log("added recevied");
                  //response.status(500).json({success:false, data:error});
    
                  //response.status(200).json(params);
          
                } //end of else statement
              }); //end of change_db3 callback
        
            } //end of else statement
          });//end of change_db2 callback
  
      } //end of else statement
    });// end of change_db1 callback

  } //END of Signup
  
  
  
  
  function change_db1(info, callback) {
  
    console.log("change db1 called");

    const username = info["username"];
    var first_name = info["first_name"];
    var last_name = info["last_name"];
    const password = info["password"];
    const address = info["address"];
    const cc_number = info["cc_number"];
    var name = first_name +' ' +  last_name;
  
    const sql = "INSERT INTO customer (customer_name) VALUES ($1::text);";

    console.log(sql);

    const values = [name];
  
    //const sql = "SELECT * from product";
  
    pool.query(sql, values, function (err, result) {
  
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }
  
      console.log("Found result: " + JSON.stringify(result.rows));
  
  
      callback(null, result.rows);
    });
  } //ENDOF grab_from_db


  function change_db2(info, callback) {
  
    console.log("change db2");

    const username = info["username"];
    var first_name = info["first_name"];
    var last_name = info["last_name"];
    const password = info["password"];
    const address = info["address"];
    const cc_number = info["cc_number"];
    var name = first_name +' ' +  last_name;
  
   
    //When you signup you have an empty order created ....
    
    const sql = "INSERT INTO orders (customer_id,orders_date) VALUES ((SELECT customer_id FROM customer WHERE customer_name = $1::text),NOW());";
  

    console.log(sql);

    const values = [name]
  
    //const sql = "SELECT * from product";
  
    pool.query(sql, values, function (err, result) {
  
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }
  
      console.log("Found result: " + JSON.stringify(result.rows));
  
  
      callback(null, result.rows);
    });
  } //ENDOF grab_from_db



  function change_db3(info, callback) {
  
    console.log("change db3");

    const username = info["username"];
    var first_name = info["first_name"];
    var last_name = info["last_name"];
    const password = info["password"];
    const address = info["address"];
    const cc_number = info["cc_number"];
    var name = first_name +' ' +  last_name;
  
    //var sql1 = "INSERT INTO customer (customer_name) VALUES ($1::text);";
    //When you signup you have an empty order created ....
    
    //var sql2 = "INSERT INTO orders (customer_id,orders_date) VALUES ((SELECT customer_id FROM customer WHERE customer_name = $1::text),NOW());";
  
    const sql = "INSERT INTO userinfo (username, customer_id, cc_number, address, password) VALUES ($2::text, (SELECT customer_id FROM customer WHERE customer_name = $1::text),$3::text,$4::text, $5::text);";

    console.log(sql);

    const values = [name, username,cc_number,address, password];
  
    //const sql = "SELECT * from product";
  
    pool.query(sql, values, function (err, result) {
  
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }

      console.log("Found result: " + JSON.stringify(result.rows));
  
  
      callback(null, result.rows);
    });
  } //ENDOF grab_from_db
  
  
  
  module.exports = {
    signupcall: signupcall, 
    change_db1: change_db1,
    change_db2: change_db2,
    change_db3: change_db3
  };