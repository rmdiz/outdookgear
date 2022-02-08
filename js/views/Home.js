import General from './General.js';

export default class extends General{
	constructor(){
		super();

		this.setTitle('Home::Lifesytle Outdoorgear');
	}
	getNavigation(){
		return super.getNavigation();
	}

	async addHomeProduct(homeProducts, product_display_element){
		let displayInfo =`
			<div class="product_bunner">
				<div class="actuals">
					<div class="info">
						<h3>Sale Collection <br> <span>02/02/2022</span></h3>
						<span>Outlet: Arena Mall</span>
						<h2>Available Products</h2>
					</div>
					<div class="stat">
						<span><b>Daily Transactions</b><small>352</small></span>
						<span><b>Daily Orders</b><small>352</small></span>
					</div>
				</div>
				<div class="header_footer">
					<span class="totals">Showing 1 to 12 of 33 products</span>
					<div class="filters">
						<i class="las la-braille"></i>
						<i class="las la-list"></i>
					</div>
				</div>
			</div>
		`;

		homeProducts.forEach((homeProduct) => {
			displayInfo += `
				<div class="product_box">
					<div class="product_img">
						<img src="./images/${homeProduct.colour[0].img}">
					</div>
					<div class="product_info">
						<span><b>Name:</b> ${homeProduct.name}</span>
						<span><b>Brand:</b> ${homeProduct.brand_name}</span>
						<span><b>Price:</b> <label>${homeProduct.sale_price}</label><small>/=</small></span>
					</div>
					<div class="actions">
						<a class="p_details" data-product="${homeProduct.name}" data-id="${homeProduct.size[0].id}">
							<span>View available colours and sizes</span>
							<i class="las la-chevron-right"></i>
						</a>
					</div>
				</div>
			`;
		});

		product_display_element.innerHTML = displayInfo;
	}
	async getPage(){
		return `
		<section class="page" id="home">
			<div class="home_products">
				<aside>
	        		<span class="aside_header">Product Categories</span>
	        		<ul id="home_categories">
	        			<li>
	        				<span>Accessories</span>
	        				<i class="las la-plus"></i>
	        			</li>
	        			<li>
	        				<span>Pants</span>
	        				<i class="las la-plus"></i>
	        			</li>
	        			<li>
	        				<span>Shirts</span>
	        				<i class="las la-plus"></i>
	        			</li>
	        			<li>
	        				<span>Shoes</span>
	        				<i class="las la-plus"></i>
	        			</li>
	        			<li>
	        				<span>Bags</span>
	        				<i class="las la-plus"></i>
	        			</li>
	        		</ul>
	        		<span class="aside_header">Product Sizes</span>
	        		<div class="all_sizes" id="home_sizes">
	        			<span>M</span>
	        			<span>L</span>
	        			<span>Xl</span>
	        			<span>XXL</span>
	        			<span>M</span>
	        			<span>L</span>
	        			<span>Xl</span>
	        			<span>XXL</span>
	        			<span>M</span>
	        			<span>L</span>
	        			<span>Xl</span>
	        			<span>XXL</span>
	        		</div>
	        		<span class="aside_header">Product Brands</span>
	        		<ul id="home_brands">
	        			<li>
	        				<span>511</span>
	        			</li>
	        			<li>
	        				<span>Noth faces</span>
	        			</li>
	        			<li>
	        				<span>Under Amour</span>
	        			</li>
	        			<li>
	        				<span>511</span>
	        			</li>
	        			<li>
	        				<span>Noth faces</span>
	        			</li>
	        			<li>
	        				<span>Under Amour</span>
	        			</li>
	        		</ul>
	        		<span class="aside_header">Product Colors</span>
	        		<ul class="all_colors" id="home_colors">
	        			<li><span>Green</span></lii>
	        			<li><span>Pink</span></lii>
	        			<li><span>Brown</span></lii>
	        			<li><span>Navy</span></lii>
	        			<li><span>Yellow</span></lii>
	        			<li><span>White</span></lii>
	        			<li><span>Charcoal</span></lii>
	        			<li><span>Gray</span></lii>
	        			<li><span>Wild Strawberry</span></lii>
	        		</ul>
				</aside>
				<div class="product_display">
				</div>
			</div>
		</section>
		`;
		// 			<label class="aside_title">Categories</label>
		// 			<ul class="aside_details" id="home_categories">product_bunner
		// 			</ul>
		// 			<label class="aside_title">Brands</label>
		// 			<ul class="aside_details" id="home_brands">
		// 			</ul>
		// 			<label class="aside_title">Colors</label>
		// 			<ul class="aside_details" id="home_colors">
		// 			</ul>
	}

	getPFDetails(product_info, colour = 0, size = 0){
		let colourIndexed = product_info.colour[colour];
		let sizeIndexed = product_info.size[size];
		
		let colours = [];
		let sizes = [];
		let colourSpans = ``;
		let sizeSpans = ``;
		let count = 1;
		product_info.colour.forEach((color_details) => {
			if(!colours.includes(color_details.colour_name)){
				colours.push(color_details.colour_name)
	    		colourSpans += `<span class='select_color' data-color="${color_details.colour_name}" data-id ="${color_details.colour_id}">${color_details.colour_name}</span>`;
				count++;
			}
		});
		count = 1;
		product_info.size.forEach((size_details) => {
			if(!sizes.includes(size_details.size_label)){
				sizes.push(size_details.size_label);
				if(size_details.colour_id == colourIndexed.colour_id){
		    		sizeSpans += `<span "class='select_size' data-size="${size_details.size_label}" data-id ="${size_details.size_label}" data-index="${count}">${size_details.size_label}</span>`;
					count++;
				}
			}
		});                        

		return `
			<div class="product_full_details">
				<div class="header">
					<span>Product Information</span>
					<i class="las la-times" id="closeP_details"></i>
				</div>
				<div class="product_full_img">

					<div class="p_infor">
						<h2 id="pName">${product_info.name}</h2>
						<label><b>Category: </b><span id="pCategory">${product_info.category_name}</span></label>
						<label><b>Product Code: </b><span id="pProductCode">${sizeIndexed.product_code}</span></label>
						<label><b>Brand: </b> <span id="pBrandName">${product_info.brand_name}</span></label>
					</div>

					<img id="pImage" src="./images/${colourIndexed.img}">
				</div>
				<div class="product_full_info">
					<div class="available_colors" id="home_available_colors">
						<b>Select Color</b>
						${colourSpans}
					</div>
					<div class="available_size" id="home_available_size">
						<b>Select color to get available sizes</b>
						<div id="size_list">${sizeSpans}</div>

						<b>Enter Quantity</b>
						<label class="quantity_adjuster">
							<a href="#" class="remove_quantity">
								<i class="las la-minus"></i>
							</a>
							<input type="text" name="" id="item_d_quantity" value="1" data-quantity="1">
							<a href="#" class="add_quantity">
								<i class="las la-plus"></i>
							</a>
						</label>
					</div>
					<div class="desc">
						<b>Description</b>
						<p id="pDesc">${sizeIndexed.desc}</p>
					</div>
					<div class="conc">
						<span id="product_price"><b>@</b><b id="pPrice">${product_info.sale_price}</b><small>/=</small></span>
						<button id="add_cart" data-id="${sizeIndexed.id}">Add to Cart <i class="las la-shopping-bag"></i></button>
					</div>
				</div>
			</div>
		`;
	}

	async getInventoryProducts(){
		const data = {
		    'action':'fetch_all_inventory_products'
	    }
        let PDT_INFO = {};
        let productColors = [];
        let productSizes = [];

	    this.ajaxRequest = super.run(data);
	    return await this.ajaxRequest.always(function(result){ 
			if(result.response == "success"){
				result.message.forEach((line) => {
		        	if(PDT_INFO[line.name] != "object"){
	                    productColors.push(
	                            {
	                                'colour_id': line.colour_id,
	                                'colour_name': line.colour_name,
	                                'img': line.product_image,
	                            }
	                        );
	                    productSizes.push(
	                            {
	                                'colour_id': line.colour_id,
	                                "inventory_id":  line.inventory_id,
	                                "id":  line.id,
	                                "product_code":  line.product_code,
	                                "size_label": line.size_label,
	                                "size_id": line.size_id,
	                                "quantity": line.quantity,
	                                "desc":  line.desc,
	                                "created_at":  line.created_at,
	                                "deleted_at":  line.deleted_at,
	                                "modified_at":  line.modified_at,
	                            }
	                        )
	                    PDT_INFO[line.name] = {
	                        "brand_id":  line.brand_id,
	                        "brand_name":  line.brand_name,
	                        "buy_price":  line.buy_price,
	                        "category_id":  line.category_id,
	                        "category_name":  line.category_name,
	                        "colour":  productColors,
	                        "name":  line.name,
	                        "size":  productSizes,
	                        "remarks":  line.remarks,
	                        "sale_price":  line.sale_price,
	                        "supplier":  line.supplier,
	                        "supplier_id":  line.supplier_id,
	                    }
	                }else{
	                    
	                    productColors.push(
	                        {
	                            'colour_id': line.colour_id,
	                            'colour_name': line.colour_name,
	                            'img': line.product_image,
	                        }
	                    );
	                    productSizes.push(
	                        {
	                            "product_code":  line.product_code,
	                            "size_label": line.size_label,
	                            "size_id": line.size_id,
	                            "quantity": line.quantity,
	                            "desc":  line.desc,
	                            "created_at":  line.created_at,
	                            "deleted_at":  line.deleted_at,
	                            "id":  line.id,
	                            "inventory_id":  line.inventory_id,
	                            "modified_at":  line.modified_at,
	                        }
	                    );
	                }
		        });
			}
			result = PDT_INFO;
			if(!localStorage.getItem('outdoorgear')){
            	localStorage.setItem('outdoorgear', JSON.stringify(this.site));
	        }
	        this.site = JSON.parse(localStorage.getItem('outdoorgear'));
	        let item = [];
	        Object.keys(PDT_INFO).forEach((line) => {
	        	item.push(PDT_INFO[line]);
	        })
	        this.site['all_inventory_products_formated'] = item;
	        localStorage.setItem('outdoorgear', JSON.stringify(this.site));
		});

	}

	async fetchInventoryProducts(){
		const data = {
		    'action':'fetch_all_inventory_products'
	    }

	    this.ajaxRequest = super.run(data);
	    return await this.formatData(this.ajaxRequest);
	}

	async formatData(data){
        let PDT_INFO = {};
        let productColors = {};
        let productSizes = [];
        let s = [];
        let so = {};
		data.always(function(result){ 
			if(result.response == "success"){
				result.message.forEach((line) => {
		        	if(PDT_INFO[line.name] != "object"){
	                    productSizes.push(
	                            {
	                                'colour_id': line.colour_id,
	                                "inventory_id":  line.inventory_id,
	                                "id":  line.id,
	                                "product_code":  line.product_code,
	                                "size_label": line.size_label,
	                                "size_id": line.size_id,
	                                "quantity": line.quantity,
	                                "desc":  line.desc,
	                                "created_at":  line.created_at,
	                                "deleted_at":  line.deleted_at,
	                                "modified_at":  line.modified_at,
	                            }
	                        )
	                    productColors[line.colour_name] = {
	                                'colour_id': line.colour_id,
	                                'colour_name': line.colour_name,
	                                'img': line.product_image,
	                                "sizeSpecific":  productSizes.map((productSize) => {
	                                	// GET CORRESPONDING SIZES FOR COLOURS
	                                	if(productSize.colour_id ==line.colour_id){
	                                		s.push(productSize);
	                                		return so[productSize.colour_id] = [productSize]
	                                	}
	                                })
	                            };
	                    PDT_INFO[line.name] = {
	                        "name":  line.name,
	                        "brand_id":  line.brand_id,
	                        "brand_name":  line.brand_name,
	                        "buy_price":  line.buy_price,
	                        "category_id":  line.category_id,
	                        "category_name":  line.category_name,
	                        "remarks":  line.remarks,
	                        "sale_price":  line.sale_price,
	                        "supplier":  line.supplier,
	                        "supplier_id":  line.supplier_id,
	                        "colourSpecific":  productColors,
	                        // "sizeSpecific":  productSizes,
	                    }
	                }else{
	                    
	                    productSizes.push(
	                        {
	                            "product_code":  line.product_code,
	                            "size_label": line.size_label,
	                            "size_id": line.size_id,
	                            "quantity": line.quantity,
	                            "desc":  line.desc,
	                            "created_at":  line.created_at,
	                            "deleted_at":  line.deleted_at,
	                            "id":  line.id,
	                            "inventory_id":  line.inventory_id,
	                            "modified_at":  line.modified_at,
	                        }
	                    );
	                    Object.keys(productColors).forEach((colour) => {
	                    	if(colour != line.colour_name){
			                   productColors[line.colour_name] = {
	                                'colour_id': line.colour_id,
	                                'colour_name': line.colour_name,
	                                'img': line.product_image,
	                                "sizeSpecific":  productSizes.map((productSize) => {
	                                	return productSize
	                                })
	                            };
	                    	}
	                    })
	                }
		        });
			}
			console.log(productSizes);
			productSizes.forEach((productSize) => {
				console.log(productSize.colour_id)
			})
			console.log(PDT_INFO)
			return false;
			// result = PDT_INFO;
			// if(!localStorage.getItem('outdoorgear')){
   //          	localStorage.setItem('outdoorgear', JSON.stringify(this.site));
	  //       }
	  //       this.site = JSON.parse(localStorage.getItem('outdoorgear'));
	  //       let item = [];
	  //       Object.keys(PDT_INFO).forEach((line) => {
	  //       	item.push(PDT_INFO[line]);
	  //       })
	  //       this.site['fetch_inventory_products_formated'] = item;
	  //       localStorage.setItem('outdoorgear', JSON.stringify(this.site));
		});

	}
	async getCategories(){
		const data = {
		    'action':'fetch_all_categories'
	    }
	    this.ajaxRequest = super.run(data);

		// super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getSizes(){
		const data = {
		    'action':'fetch_all_sizes'
	    }
	    this.ajaxRequest = super.run(data);

		// super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;

	}

	async getBrands(){
		const data = {
		    'action':'fetch_all_brands'
	    }
	    this.ajaxRequest = super.run(data);

		// super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getColors(){
		const data = {
		    'action':'fetch_all_available_colors'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}

	async fetchAll(action){
		const data = {
		    'action': action
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}

	async addToCart(key, quantity){
		let msg = "Product added to cart";
		if(localStorage.getItem('outdoorgear')){
            var site = JSON.parse(localStorage.getItem('outdoorgear'));
			let product_info = site.fetch_all_inventory_products[key.split('-')[0]];
			if(typeof(site.cart[key]) != "object"){
                let product_details = {
                    'id': product_info.id,
                    'product_code': product_info.product_code,
                    'name': product_info.name,
                    'brand': product_info.brand_name,
                    'size': product_info.size_label,
                    'color': product_info.colour_name,
                    'image': product_info.product_image,
                    'quantity': quantity,
                    'price': product_info.sale_price,
                }
				site.cart[key] = product_details ;
			    localStorage.setItem('outdoorgear', JSON.stringify(site));
			}else{
				msg = 'Item already exits in cart';
			}
			let cart = site.cart;
            return  {cart, msg};
        }
				
	}
}

