/*************************************
* Main controller
**************************************/

module.exports = function(app) {

    app.get('/', (req, res) => {
        res.send('This is the main page')
    })
};
