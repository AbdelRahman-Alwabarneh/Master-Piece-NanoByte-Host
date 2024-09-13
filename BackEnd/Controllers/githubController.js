const jwt = require('jsonwebtoken');
const User = require('../Models/usersModels');

exports.githubLogin = (req, res) => {
    res.redirect('http://localhost:2000/api/githubAuth/github/callback');
};

exports.githubCallback = (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });    
    res.redirect("http://localhost:1000/?login=true");
};
