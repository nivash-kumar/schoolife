
exports.index = (req, res, next) => {
    console.log(req.isLoggedin);
    res.render('landing', {
        pageTitle: 'Landing Page',
        isLoggedin: req.isLoggedin,
        user:{
            name : "Singh KN",
        }
    });
};
exports.dev = (req, res, next) => {
    console.log("Any one clicked development page");
    console.log(req.isLoggedin);
    res.render('dev', {
        pageTitle: 'development',
        isLoggedin: req.isLoggedin,
    });
};