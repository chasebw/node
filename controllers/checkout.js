const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://umihiiovjmsfyf:7a3a75f614339d054773380e39ac5f79beec45d9b34fb4e2c81e3ce07abdcf45@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d272ttsve49d9d?ssl=true';
const pool = new Pool({ connectionString: connectionString });




function get_checkout(request, response) {
  
    checkout_db(request,function (error, result) {
  
      if (error || result == null || result.length == 0){
        console.log(result);
        response.status(500).json({ success: false, data: error });
      } else {
        console.log(result);
  
        //params = result;
        const info = result;
       
        response.status(200).json(info);
       
      }
  
    });
  } //END get_checkout
  
  
  
  
  function checkout_db(request, callback) {
  
    console.log("Loading Cart");
  
  
    //change to grab it from the session instead be cause wya

    console.log('________________SESSSION________________');
    console.log(request.session);
  
    const customer_id = request.session.customer_id;
    const orders_id = request.session.orders_id;
  
  
    //add where customer and orders id
    const sql = 'SELECT c.customer_id,c.customer_name,po.customer_order_id,po.orders_id, po.product_id, ui.username, ui.cc_number,ui.address,p.product_name, p.product_description, p.price from customer c JOIN product_orders po ON c.customer_id = po.customer_id JOIN userinfo ui ON ui.customer_id = po.customer_id JOIN product p ON p.product_id = po.product_id WHERE c.customer_id = $1;';
  
    const values = [customer_id];
  
    //const sql = "SELECT * from product";
  
    pool.query(sql,values, function (err, result) {
  
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }
  
      console.log("Found result: " + JSON.stringify(result.rows));
  
  
      callback(null, result.rows);
    });
  } //ENDOF grab_from_db




  function confirm(request, response) {
  
    confirm_db(request,function (error, result) {
  
      if (error || result == null){
        console.log(result);
        response.status(500).json({ success: false, data: error });
      } else {
        console.log(result);
  
        //params = result;
        const info = result;
       
        response.status(200).json(info);
       
      }
  
    });
  } //END confirm
  
  
  
  
  function confirm_db(request, callback) {
  
    console.log("confirming order");
  
  
    //change to grab it from the session instead be cause wya

    console.log('________________SESSSION________________');
    console.log(request.session);
  
    const customer_id = request.session.customer_id;
    const orders_id = request.session.orders_id;
  
  
    //add where customer and orders id
    const sql = 'DELETE FROM product_orders WHERE customer_id = $1;';
  
    const values = [customer_id];
  
    //const sql = "SELECT * from product";
  
    pool.query(sql,values, function (err, result) {
  
      if (err) {
        console.log("Error in query: ");
        console.log(err);
        callback(err, null);
      }
  
      console.log("Found result: " + JSON.stringify(result.rows));
  
  
      callback(null, result.rows);
    });
  } //ENDOF confirm_db



  







module.exports = {
    get_checkout: get_checkout,
    checkout_db: checkout_db,
    confirm:confirm
  };