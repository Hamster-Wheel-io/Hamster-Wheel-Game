/*************************************
* Images controller
**************************************/
require('dotenv').load();

module.exports = function(app) {

    app.get('/images', (req, res) => {
        res.send("imagessss")
    })
};
