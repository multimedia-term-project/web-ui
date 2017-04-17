var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/register', function(req, res, next){
	res.render('register');
});

router.get('/login', function(req, res, next){
	res.render('login');
});

router.post('/registerUser', function(req, res, next){
	
	//function that will allow us to see if the forum was empty
	function checkBody(body){

		var empty;
		if(body){
			empty = false;
		}else	{
			empty = true;
		}
		return empty;
	}




	//these variables will hold values incase we have any validation errors 
	var displayValidation; 
	var userNameValidation; 
	var passwordValidation; 
	var emailValidation; 
	var confimPasswordValidation; 
	var confirmEmailValidation; 

	
	//variables that hold the register User information
	var display= req.body.display; 
	var userName = req.body.userName; 
	var password = req.body.password; 
	var confirmPassword = req.body.confirmPassword; 
	var email = req.body.email; 
	var confirmEmail = req.body.confirmEmail;

	//check to make sure that we have information in all the input boxes
	displayValidation = checkBody(display); 
	userNameValidation = checkBody(userName); 
	passwordValidation = checkBody(password); 
	emailValidation = checkBody(email);
	confirmPasswordValidation = checkBody(confirmPasswordValidation); 
	confirmEmailValidation = checkBody(confirmEmailValidation);

	


});

module.exports = router;
