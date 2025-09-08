
exports.index = (req, res, next) => {
    req.user = req.session.user;
    res.render('landing', {
        pageTitle: 'Landing Page',
        isLoggedIn: req.isLoggedIn,
        error: [],
      user:{name: "nivash"},
    });
};
exports.dev = (req, res, next) => {
    console.log("Any one clicked development page");
    res.render('dev', {
        pageTitle: 'development',
        isLoggedIn: req.isLoggedIn,
    });
};


// res.render("../views/auth/signup", {
//       pageTitle: "Register Your self.",
//       isLoggedIn: false,
//       oldInput: { name: "", email: "", userType: "" },
//       error: [],
//       user: {},
//     });