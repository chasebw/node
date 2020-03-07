const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/results',handleRate)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


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
            diff = parseInt(weight) - 1
           cost = parseFloat((.20 * diff) -1);
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


