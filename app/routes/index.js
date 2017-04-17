var express = require('express');
var router = express.Router();
var http = require('http');

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

router.post('/register', function(req, res, next){
	//res.render('register');
	
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

	// //confirms strings are matching
	function checkSame(string1, string2){

		if(string1 == string2){
			same = true;
		}else{
			same = false;
		}
		return same;
	}

	// //confirms that argument is an email
	function validateEmail(email){
	
		var isEmail;
 		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    		isEmail = true;
  		} else{
  			isEmail = false;
  		}
  		return isEmail;
	}


	var nameError = " ";
	var passwordError = " ";
	var emailError = " ";
	var confirmEmailError = " ";


	// //these variables will hold values incase we have any validation errors 
	var userNameValidation; 
	var passwordValidation; 
	var emailValidation;  
	var confirmEmailValidation;
	var error = 0; 


	
	//variables that hold the register User information 
	var userName = req.body.userName; 
	var password = req.body.password; 
	var email = req.body.email; 
	var confirmEmail = req.body.confirmEmail;


	//check to make sure that we have information in all the input boxes
	userNameValidation = checkBody(userName); 
	passwordValidation = checkBody(password); 
	emailValidation = checkBody(email);
	
	//confirm Email is the same as verify email
	confirmEmailValidation = checkSame(email, confirmEmail);
	console.log(email + " " + confirmEmail);

	// //validate that it's an email
	emailValidation = validateEmail(email);


	if(userNameValidation == true){
		nameError = "you must enter a user name";
		error = 1; 
	}

	if(passwordValidation == true){
		passwordError = "you must enter a password";
		error = 1;
	}

	if(emailValidation == false){
		emailError = "you must enter a correct Email";
		error = 1; 
	}

	if(confirmEmailValidation == false){
		confirmEmailError = "email does not match"; 
		error = 1; 
	}
	

	if(error == 1){
		res.render('register', {nameError, passwordError, emailError, confirmEmailError});
	}

	if(error == 0){
		var user={
			"email": email, 
			"password": password, 
			"name": userName,

		};
		 
		var options = {
  			host: 'localhost',
  			path: '/user/signup',
  			//since we are listening on a custom port, we need to specify it by hand
  			port: '3000',
  			//This is what changes the request to a POST request
  			method: 'POST'
		};
	
		callback = function(response) {
  			var str = ''
  			response.on('data', function (chunk) {
    			str += chunk;
  			});

  			response.on('end', function () {
    			console.log(str);
  			});
		
		}

		var req = http.request(options, callback);
		//This is the data we are posting, it needs to be a string or a buffer
		req.write(json.stringify(user));
		req.end();
	}

});



module.exports = router;
