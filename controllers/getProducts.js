



/*Next Three lines required for database access*/
const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://umihiiovjmsfyf:7a3a75f614339d054773380e39ac5f79beec45d9b34fb4e2c81e3ce07abdcf45@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d272ttsve49d9d?ssl=true';
const pool = new Pool({connectionString: connectionString});


function get_store_items(request,response){

  
    grab_from_db(function(error,result){

      if (error || result == null || result.length ==0){
        response.status(500).json({success:false, data:error});
      } else {

        const products = result;

        params = result; //chance to remove [0]

        response.status(200).json(products);

        //response.render('pages/browse', params);
      }

    });
  } //END get_store_items




  function grab_from_db(callback){

    console.log("Getting person from DB with all items");

    const sql = "SELECT * from product";

    pool.query(sql, function(err,result){

      if (err){
        console.log("Error in query: ");
        console.log(err);
        callback(err,null);
      }

   

    console.log("Found result: " + JSON.stringify(result.rows));


    callback(null,result.rows);
  });
} //ENDOF grab_from_db


module.exports = {
    getProducts: get_store_items,
    getProductsQuery: grab_from_db 
};
