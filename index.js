const express = require('express')
const path = require('path')

const ProductController = require('./controllers/getProducts.js');
const CartController = require('./controllers/cart.js');
const OrderController = require('./controllers/order.js');

const {Pool} = require('pg')
//use heroku enviroment port// or use 5000 not there
const PORT = process.env.PORT || 5000

const connectionString = process.env.DATABASE_URL || 'postgres://umihiiovjmsfyf:7a3a75f614339d054773380e39ac5f79beec45d9b34fb4e2c81e3ce07abdcf45@ec2-18-210-51-239.compute-1.amazonaws.com:5432/d272ttsve49d9d?ssl=true';

const pool = new Pool({connectionString: connectionString});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended:true}))//support url encoded bodies
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .use(require('./routes'))
  .use(require('./store'))
  .use('/images', express.static(__dirname + '/images'))
  .get('/results',handleRate)
  .get('/getPerson',getPerson)
  .post('/add_cart', CartController.add_cart)
  .get('/storeitems',load_browse)
  .post('/customer',OrderController.load_cart)
  .post('/remove', OrderController.remove_item)
  .get('/products', ProductController.getProducts)
  .get('/return_of_db', return_db)
  //throw in port // then console.log the port we are listening on
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


  function load_browse(req,res)
  {
    res.render('pages/browse');
  }

  function return_db(request,response)
  {

    const id = request.query.id;


    getPersonFromDb(id,function(error,result){

      if (error || result == null || result.length != 1){
        response.status(500).json({success:false, data: error});

      } else{
        const person = result[0];

        params = result[0]

        //response.status(200).json(person);

        //add code here to load page....
        response.render('pages/result_person', params);
      }


    });
  }




  function getPersonFromDb(id,callback){
    console.log("Getting person from DB with id: " + id);

    

    const sql = "SELECT * from person WHERE person_id= $1::int";

    const params = [id];

    pool.query(sql, params, function(err,result){

      if (err){
        console.log("Error in query: ");
        console.log(err);
        callback(err,null);
  
      }

      console.log("Found result: " + JSON.stringify(result.rows));


      callback(null,result.rows);


});

} // End of getPersonFromDb




  function getPerson(request,response)
  {

    //params = {weight: weight, cost: cost, type: type};
    response.render('pages/getPerson');
  }




  function handleRate(request,response)
  {
    const weight = request.query.weight;
    const type = request.query.type;

    computeAndSend(response,parseFloat(weight),type);

  }

  function computeAndSend(response,weight,type)
  {
    var cost = 0;
    var diff= 0;

    console.log(weight);

    console.log(type);

    switch(type){
      case 'letter_stamp':
        switch(true){
          case (weight <= 0):
         cost = -1;
         break;
        case (weight <= 1):
         cost = 0.55;
          break;
        case (weight <= 2):
         cost = 0.70;
          break;
        case (weight <= 3):
         cost = 0.85;
          break;
        case (weight <= 3.5):
         cost = 1.00;
         break;
        default:
         cost = -1;
         break;
        }
        break;
      case 'letter_meter':
        switch(true){
          case (weight <= 0):
           cost = -2;
           break;
          case (weight <= 1):
           cost = 0.50;
            break;
          case (weight <= 2):
           cost = 0.65;
            break;
          case (weight <= 3):
           cost = 0.80;
            break;
          case (weight <= 3.5):
           cost = .95;
          default:
           cost = -1;
           break;
          }
        break;
      case 'large_env':
        switch(true){
          case (weight <= 0):
            cost = -1;
          case (weight <= 1):
           cost = 1.00
            break;
          case (weight > 1):
            diff = parseFloat(weight) - 1
            if (diff < 1)
            {
              cost = 1.20
            }
            else
            {
              cost = parseFloat(1 + (.20 * parseInt(diff)));
              if(parseFloat(diff) > 0)
              {
                cost += .20;


              }
            }
            break;
          default:
           cost = -1;
           break;
          }
        break;
      case 'first_class':
        switch(true){
          case (weight <= 0):
           cost = -2;
           break;
          case (weight <= 4):
           cost = 3.80;
            break;
          case (weight <= 8):
           cost = 4.60;
            break;
          case (weight <= 12):
           cost = 5.30;
            break;
          case (weight <= 13):
           cost = 5.90;
            break;
          default:
           cost = -1;
           break;
        }
        break;
        default:
          console.log("error");
    }

    console.log("cost is");
    console.log(cost);


    params = {weight: weight, cost: cost, type: type};

    response.render('pages/results', params);


  }


