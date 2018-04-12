/*************************************
* Images controller
**************************************/
require('dotenv').load();
const draw = require('../json/draw');


// // Define JSON File
//  var fs = require("fs");
//
// // Get content from file
//  var contents = fs.readFileSync("jsoncontent.json");
// // Define to JSON type
//  var jsonContent = JSON.parse(contents);
// // Get Value from JSON
//

module.exports = function(app) {

    app.get('/images', (req, res) => {
        res.json(draw);
    });
};
