const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://umihiiovjmsfyf:7a3a75f614339d054773380e39ac5f79beec45d9b34fb4e2c81e3ce07abdcf45@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d272ttsve49d9d?ssl=true';
const pool = new Pool({ connectionString: connectionString });



function add_cart(request, response) {

  //grab the id from the body.....
  var id = request.body.id;
  console.log(id);

  thequery = request.body;
  console.log('_______________QUEEEERY________________');
  console.log(thequery);

  change_db(id,request, function (error, result) {

    //if (error || result == null || result.length == 0)
    if (error || result == null) {
      console.log(result);
      response.status(500).json({ success: false, data: error });
    } else {
      console.log(result);

      params = result; //chance to remove [0]
      console.log("added recevied");
      //response.status(500).json({success:false, data:error});

      response.status(200).json(params);
      
      //response.render('pages/browse', params);
    }

  });
} //END get_store_items




function change_db(id,request, callback) {

  console.log("adding items to cart");

  const customer_id = request.session.customer_id;
  const orders_id = request.session.orders_id;

  const sql = "INSERT INTO product_orders(customer_id,product_id, orders_id) VALUES ($1,$2,$3)";

  const values = [customer_id,id,orders_id];

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
  add_cart: add_cart,
  change_db: change_db
};