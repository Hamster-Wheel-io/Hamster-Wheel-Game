/************************  ********************
* Hamster Wheel main server
********************************************/
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const hbs = require('express-handlebars')
const jwt = require('jsonwebtoken')
const path = require('path')
const mailgun = require('mailgun-js')
const dotenv = require('dotenv')



//Initializing the express server
const app = express();

const PORT = process.env.PORT || 3000

require('dotenv').load();


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
/****************************************************
 *  SQL Connection
 ***************************************************/
 const Sequelize = require('sequelize');
 const sequelize = new Sequelize('hamster-wheel', 'briantoliveira', null, { dialect: 'postgres', logging: false });

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
app.use(express.static('./public'));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(verifyAuthentication)

//Setup handlebars view engine and pass in parameters
app.engine('hbs', hbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs')


//Load routes
require('./routes/index.js')(app);


//MAIL GUN
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

app.post('/', (req, res) => {
    let data;
    let api_key = 'key-b2e232b515e23a91805b4ca0ae9c098a';
    let domain = 'sandbox327e859bafc442479e7384439df8c22c.mailgun.org';
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


    data = {
        from: 'Hamster Wheel Team <postmaster@sandbox327e859bafc442479e7384439df8c22c.mailgun.org>',
        to: 'briantmoliveira@gmail.com',
        subject: 'Contact us',
        text: 'From: ' + req.body.name + '(' + req.body.email + ')\n' + req.body.body
    };

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            // res.render('index', {error: err});
            console.log("got an error: ", err);
        }
        // else {
        //     res.redirect('/');
        //     console.log(body);
        //
        // }
    });
});


//Listen on port number
app.listen(PORT, function() {
    console.log('Hamster Wheel listening on port ', PORT);
});
