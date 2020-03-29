const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://umihiiovjmsfyf:7a3a75f614339d054773380e39ac5f79beec45d9b34fb4e2c81e3ce07abdcf45@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d272ttsve49d9d?ssl=true';
const pool = new Pool({ connectionString: connectionString });




function logincall(request,response){

    console.log('login in being called');

    const password = request.body.password;
    const username = request.body.username;
  
    
    login_db(password,username,function(error,result){
  
      if (error || result == null || result.length != 1){
        response.status(500).json({success:false, data:error});
      } else {
  
        const person = result;
  
        ; //chance to remove [0]
        response.status(200).json(person);
  
        //response.render('pages/browse', params);
      }
  
    });
  } //END logincall
  
  
  
  function login_db(password,username,callback){
  
    console.log("logging in query");
  
    const sql = "SELECT * from userinfo WHERE password = $1::text AND username = $2::text";
  
    const params = [password,username];
  
    pool.query(sql, params, function(err,result){
  
      if (err){
        console.log("Error in query: ");
        console.log(err);
        callback(err,null);
      }
  
    console.log("Found result: " + JSON.stringify(result.rows));
  
  
    callback(null,result.rows);
  });
  } //ENDOF login






module.exports = {
    logincall:logincall
  };