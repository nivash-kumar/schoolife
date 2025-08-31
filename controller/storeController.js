
exports.index = (req, res, next) => {
    res.render('landing', {
        pageTitle: 'Landing Page',
    });
};
exports.dev = (req, res, next) => {
    console.log("Any one clicked development page");
    res.render('dev', {
        pageTitle: 'development',
    });
};