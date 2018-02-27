/************************  ********************
* Hamster Wheel main server
********************************************/
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const hbs = require('express-handlebars')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path')

//Initializing the express server
const app = express();

const PORT = process.env.PORT || 3000

/****************************************************
 *  SQL Connection
 ***************************************************/
 const Sequelize = require('sequelize');
 const sequelize = new Sequelize('hamster-wheel', process.env.DBUSER, null, { dialect: 'postgres', logging: false });

 sequelize
   .authenticate()
   .then(() => {
     console.log('Connection has been established successfully.');
   })
   .catch(err => {
     console.error('Unable to connect to the database:', err.message);
   });
  /****************************************************
   *  Check for login token on every request
   ***************************************************/
  let verifyAuthentication = (req, res, next) => {
      if (typeof req.cookies.jwtToken === 'undefined' || req.cookies.jwtToken === null) {
        req.user = null;
      } else {
        var token = req.cookies.jwtToken;

        //Synchronous verification
        try{
          decodedToken = jwt.verify(token, process.env.SECRETKEY);
          //console.log("***Authenticate***");
          req.user = decodedToken.id;
        }catch(err){
          console.log("Authentication Error:", err.message);
        };
      };
      next();
    };

  let verifyUserLoggedIn = (req, res)=>{
      if(!req.user){
          res.redirect("/");
      };
      next();
  };

 /*******************************************
 * Middlewares
 ********************************************/
app.use(express.static(__dirname));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(verifyAuthentication)

//Setup handlebars view engine and pass in parameters
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine', 'hbs')

//Setup handlebars view
app.use(express.static('./public'));



//Load routes
require('./routes/index.js')(app);


//Listen on port number
app.listen(PORT, function() {
    console.log('Porfolio listening on port ', PORT);
});
