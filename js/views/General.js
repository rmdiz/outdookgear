export default class{
	constructor(){
		this.ajaxRequest = null;
		this.site = {};
	}

	setTitle(pageTitle){
		document.title = pageTitle;
	}

	getNavigation(){
		return `
			<nav>
				<div class="logo">
					<img src="./images/square_lifestyle.png">
					<img src="./images/rectangle_lifestyle.png">
				</div>
				<span class="nav_title">Menu</span>
				<ul class="navigation">
					<li class="nav__item">
						<a href="home.html?pg=dashboard" class="nav__link" data-pg>
							<span class="icon"><i class="las la-tachometer-alt"></i></span>
							<span class="title">Dashboard</span>
						</a>
					</li>
					<li class="nav__item">
						<a href="home.html?pg=products" class="nav__link"  data-pg>
							<span class="icon"><i class="las la-braille"></i></span>
							<span class="title">Products</span>
						</a>
					</li>
					<li class="nav__item">
						<a href="home.html?pg=accounts" class="nav__link"  data-pg>
							<span class="icon"><i class="las la-users"></i></span>
							<span class="title">Accounts</span>
						</a>
					</li>
					<li class="nav__item">
						<a href="home.html?pg=supplier" class="nav__link"  data-pg>
							<span class="icon"><i class="las la-truck"></i></span>
							<span class="title">Suppliers</span>
						</a>
					</li>
					<li class="nav__item">
						<a href="home.html?pg=debtors" class="nav__link"  data-pg>
							<span class="icon"><i class="las la-comments-dollar"></i></span>
							<span class="title">Debtors</span>
						</a>
					</li>
					<li class="nav__item">
						<a href="home.html?pg=reports" class="nav__link"  data-pg>
							<span class="icon"><i class="las la-chart-line"></i></span>
							<span class="title">Reports</span>
						</a>
					</li>
				</ul>
				<span class="nav_title">Settings</span>
				<ul class="settings">
					<li class="settings_item">
						<a href="#" class="settings_link">					
							<span class="icon"><i class="las la-user"></i></span>
							<span class="title">Profile</span>
						</a>
					</li>
					<li class="settings_item">
						<a href="#" class="settings_link">					
							<span class="icon"><i class="las la-user-cog"></i></span>
							<span class="title">Settings</span>
						</a>
					</li>
					<li class="settings_item">
						<a href="#" class="settings_link signout" id="siginout">					
							<span class="icon"><i class="las la-sign-out-alt"></i></span>
							<span class="title">Sign Out</span>
						</a>
					</li>
				</ul>
			</nav>
		`;
	}

	run(data){
		this.ajaxRequest = $.ajax({
		    url: "http://localhost/outdoorgear/api/route.php",
		    type: "POST",
		    dataType  : 'json',
		    data: data
		});

		return this.ajaxRequest;
	}

	storeSession(ajaxRequest){
		if(!localStorage.getItem('outdoorgear')){
	        this.site.sessions = {};
		    this.site.cart = {};
            localStorage.setItem('outdoorgear', JSON.stringify(this.site));
        }
		ajaxRequest.always(function(result){ 
			if(result.response == "success"){
		        this.site = JSON.parse(localStorage.getItem('outdoorgear'));
		        this.site.sessions[result.message.user_id] = result.message;
		        localStorage.setItem('outdoorgear', JSON.stringify(this.site));
			}
		});
	}
	storeToLocalStorage(ajaxRequest, storageKey){
		if(!localStorage.getItem('outdoorgear')){
            localStorage.setItem('outdoorgear', JSON.stringify(this.site));
        }
		ajaxRequest.always(function(result){ 
			if(result.response == "success"){
		        this.site = JSON.parse(localStorage.getItem('outdoorgear'));
		        let obj = {};
		        result.message.forEach((line) => {
		        	obj[line.id] = line;
		        })
		        this.site[storageKey] = obj;
		        localStorage.setItem('outdoorgear', JSON.stringify(this.site));
			}
		});
	}

	formatedLocalStorage(data, storageKey){
		if(!localStorage.getItem('outdoorgear')){
            localStorage.setItem('outdoorgear', JSON.stringify(this.site));
        }
        this.site = JSON.parse(localStorage.getItem('outdoorgear'));
        let item = [];
        Object.keys(data).forEach((line) => {
        	item.push(line);
        })
        this.site[storageKey] = item;
        localStorage.setItem('outdoorgear', JSON.stringify(this.site));
	}

	generateDropdown(ajaxRequest){
		var options = "";
		ajaxRequest.always(function(data){
			if(data.response == 'success'){
				data.message.forEach((option) => {
					options += `<option>${option['name']}</option>`;
				});
				console.log(options)
			}
			return options;
		})
	}

    uploadFile(uploadBtn){
        var form_data = new FormData();
        // Read selected files
        var totalfiles = uploadBtn.files.length;
        if(totalfiles != 0){
        	form_data.append("files[]", uploadBtn.files[0]);
        }

        // UPLOADING
        this.ajaxRequest = $.ajax({
            url: 'http://localhost/outdoorgear/api/route.php', 
            type: 'post',
            data: form_data,
            dataType: 'json',
            contentType: false,
            processData: false
        });

        return this.ajaxRequest

    }
}