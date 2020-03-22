const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://umihiiovjmsfyf:7a3a75f614339d054773380e39ac5f79beec45d9b34fb4e2c81e3ce07abdcf45@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d272ttsve49d9d?ssl=true';
const pool = new Pool({ connectionString: connectionString });


//this function will remove an item from the cart...
function remove_item(request, response) {

  thequery = request.body;
  console.log('_______________QUEEEERY________________');
  console.log(thequery);

  const remove_id = request.body.remove;

  delete_item(remove_id, function (error, result) {
    //start callback function
    if (error || result == null) {
      console.log(result);
      response.status(500).json({ success: false, data: error });
    }
    else {
      console.log(result);
      const deletion = result;
      //Don't send back a response
      //response.status(200).json(result);

    }

  }); //end of callback

} //end of remove item


function delete_item(remove_id, callback) {

  console.log('deleting item');

  const sql = 'DELETE FROM product_orders WHERE customer_order_id = $1;';

  const values = [remove_id];


  pool.query(sql, values, function (err, result) {

    if (err) {
      console.log("Error in query: ");
      console.log(err);
      callback(err, null);
    }


    console.log("Found result: " + JSON.stringify(result.rows));


    callback(null, result.rows);
  });


}





function load_cart(request, response) {

  //grab the id from the body.....
  var id = request.body.id;
  console.log(id);

  thequery = request.body;
  console.log('_______________QUEEEERY________________');
  console.log(thequery);

  grab_db(id, function (error, result) {

    //if (error || result == null || result.length == 0)
    if (error || result == null) {
      console.log(result);
      response.status(500).json({ success: false, data: error });
    } else {
      console.log(result);

      //params = result;
      const products = result;
      //chance to remove [0]
      response.status(200).json(products);
      //response.render('pages/browse', params);
    }

  });
} //END get_store_items




function grab_db(id, callback) {

  console.log("Loading Cart");




  const sql = "SELECT * FROM product_orders po JOIN product p ON po.product_id = p.product_id WHERE po.customer_id = 1;"

  //const values = [id];

  //const sql = "SELECT * from product";

  pool.query(sql, function (err, result) {

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
  load_cart: load_cart,
  grab_db: grab_db,
  remove_item: remove_item,
  delete_item: delete_item
};