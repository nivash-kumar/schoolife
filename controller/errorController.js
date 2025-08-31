exports.pageNotFound = (req, res, next) => {
    // res.status(404).send(`<h1> 404 Your page is not found on airbnb </h1>`);
    res.render('404',{
        pageTitle: '404 page-not found',
        currentPage:'404',
        isLoggedIn: req.isLoggedIn
    });
};
