const validator = require('validator');

export default class Login{
	constructor(formClass){
		this.form = document.querySelector(formClass);
	};

	init(){
		this.events();
	}
	
	events(){
		if(!this.form) return;
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			this.validate(e);
		});
	}

	validate(e){
		const el = e.target;
		const emailInput = el.querySelector('input[name="email"]');
		const passwordInput = el.querySelector('input[name="password"]');

		let emailError = el.querySelector('.emailError');
		let passwordError = el.querySelector('.passwordError');
		let error = false;
		
		if(!validator.isEmail(emailInput.value)){
			emailError.style.display = 'block';
			error = true;
		}else{
			emailError.style.display = 'none';
		}

		if(passwordInput.value.length < 4 || passwordInput.value.length > 50 ){
			passwordError.style.display = 'block';
			error = true;
		}else{
			passwordError.style.display = 'none';
		}

		if(!error) return el.submit();
	}
};


