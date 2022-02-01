export default class{
	constructor(){
		this.ajaxRequest = null;
		this.site = {};
	}

	setTitle(pageTitle){
		document.title = pageTitle;
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