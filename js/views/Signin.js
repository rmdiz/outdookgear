import General from './General.js';

export default class extends General{
	constructor(){
		super();

		this.setTitle('Signin::Lifesytle Outdoorgear');
		this.ajaxRequest = null;
	}

	async getPage(){
			// <section class="sign-in-container hide" id="sign-in-container">
		return `
				<form action="index.html?pg=signin" method="post">
					<h2>Sign in</h2>
					<div class="input-field">
						<i class="las la-user"></i>
						<input type="text" name="username" id="signinUsername" placeholder="Enter username">
					</div>
					<div class="input-field">
						<i class="las la-lock"></i>
						<input type="password" name="password" id="signinPassword" placeholder="Enter password">
					</div>
					<!-- <div class="input-field"> -->
						<input type="submit" name="signin" value="Sign In" id="signin-btn" class="btn btn-round">
					<!-- </div> -->
				</form>
				<div class="system-info">
					<div class="logo">
						
						<img src="./images/square_lifestyle.png">
						<img src="./images/rectangle_lifestyle.png">

					</div>
					<div class="details">
						<h2>Lifestyle Outdoorgear POS</h2>
						<p>
							An integrated platform for online shopping, Point Of Sale(POS), inventory management and business reports. 
						</p>
					</div>
					<div class="icons">
						<a href="#" class="icon">
							<i class="lab la-facebook"></i>
						</a>
						<a href="#" class="icon">
							<i class="lab la-twitter"></i>
						</a>
						<a href="#" class="icon">
							<i class="lab la-instagram"></i>
						</a>
					</div>
				</div>
		`;
			// </section>
	}

	signin(username, password){
		const data = {
		    'action':'authenticate',
		    'username': username,
		    'password': password
	    }
	    this.ajaxRequest = super.run(data);
		
		super.storeSession(this.ajaxRequest);
		
		return this.ajaxRequest;
	}

}